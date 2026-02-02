/**
 * Performance Panel - Portfolio Performance Analytics
 * 
 * Displays key performance metrics:
 * - Total return and P&L
 * - Time-weighted returns (daily, weekly, monthly)
 * - Win rate and profit factor
 * - Sharpe ratio estimate
 * - Maximum drawdown
 * - Best/worst performers
 */

import React, { useState, useEffect, useMemo } from 'react';
import { etoroApi } from '../../services/etoroApi';
import './PerformancePanel.css';

interface Position {
  InstrumentID: number;
  Direction: string;
  Amount: number;
  OpenRate: number;
  CurrentRate: number;
  NetProfit: number;
  PositionID: string;
}

interface PerformanceMetrics {
  totalReturn: number;
  totalReturnPct: number;
  totalEquity: number;
  totalInvested: number;
  winRate: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
  winCount: number;
  lossCount: number;
  sharpeRatio: number;
  maxDrawdown: number;
  bestPerformer: { symbol: string; return: number } | null;
  worstPerformer: { symbol: string; return: number } | null;
}

const PerformancePanel: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [instruments, setInstruments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'all' | '1d' | '1w' | '1m'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch portfolio positions
        const portfolio = await etoroApi.getPortfolio();
        if (portfolio?.Positions) {
          setPositions(portfolio.Positions);

          // Build instrument ID to symbol map
          const instrumentIds = [...new Set(portfolio.Positions.map((p: Position) => p.InstrumentID))];
          const instrumentMap: Record<number, string> = {};
          
          // Get all instruments to build the map
          const allInstruments = await etoroApi.getInstruments();
          if (allInstruments) {
            for (const inst of allInstruments) {
              if (instrumentIds.includes(inst.InstrumentID)) {
                instrumentMap[inst.InstrumentID] = inst.SymbolFull || inst.Symbol || `ID:${inst.InstrumentID}`;
              }
            }
          }
          setInstruments(instrumentMap);
        }
      } catch (err) {
        console.error('[PerformancePanel] Error:', err);
        setError('Failed to load performance data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const metrics: PerformanceMetrics = useMemo(() => {
    if (!positions.length) {
      return {
        totalReturn: 0,
        totalReturnPct: 0,
        totalEquity: 0,
        totalInvested: 0,
        winRate: 0,
        profitFactor: 0,
        avgWin: 0,
        avgLoss: 0,
        winCount: 0,
        lossCount: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        bestPerformer: null,
        worstPerformer: null,
      };
    }

    const returns = positions.map(p => ({
      symbol: instruments[p.InstrumentID] || `ID:${p.InstrumentID}`,
      profit: p.NetProfit || 0,
      invested: p.Amount || 0,
      returnPct: p.Amount > 0 ? ((p.NetProfit || 0) / p.Amount) * 100 : 0,
    }));

    const totalProfit = returns.reduce((sum, r) => sum + r.profit, 0);
    const totalInvested = returns.reduce((sum, r) => sum + r.invested, 0);
    const totalReturnPct = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    const winners = returns.filter(r => r.profit > 0);
    const losers = returns.filter(r => r.profit < 0);

    const winCount = winners.length;
    const lossCount = losers.length;
    const totalCount = winCount + lossCount;
    const winRate = totalCount > 0 ? (winCount / totalCount) * 100 : 0;

    const totalWins = winners.reduce((sum, r) => sum + r.profit, 0);
    const totalLosses = Math.abs(losers.reduce((sum, r) => sum + r.profit, 0));
    const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? Infinity : 0;

    const avgWin = winCount > 0 ? totalWins / winCount : 0;
    const avgLoss = lossCount > 0 ? totalLosses / lossCount : 0;

    // Simple Sharpe estimate (using return variance)
    const returnPcts = returns.map(r => r.returnPct);
    const avgReturn = returnPcts.reduce((a, b) => a + b, 0) / returnPcts.length;
    const variance = returnPcts.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returnPcts.length;
    const stdDev = Math.sqrt(variance);
    const sharpeRatio = stdDev > 0 ? avgReturn / stdDev : 0;

    // Max drawdown estimate from current P&L (simplified)
    const maxDrawdown = totalInvested > 0 ? (Math.min(0, totalProfit) / totalInvested) * 100 : 0;

    // Best and worst performers
    const sorted = [...returns].sort((a, b) => b.returnPct - a.returnPct);
    const bestPerformer = sorted.length > 0 ? { symbol: sorted[0].symbol, return: sorted[0].returnPct } : null;
    const worstPerformer = sorted.length > 0 ? { symbol: sorted[sorted.length - 1].symbol, return: sorted[sorted.length - 1].returnPct } : null;

    return {
      totalReturn: totalProfit,
      totalReturnPct,
      totalEquity: totalInvested + totalProfit,
      totalInvested,
      winRate,
      profitFactor,
      avgWin,
      avgLoss,
      winCount,
      lossCount,
      sharpeRatio,
      maxDrawdown,
      bestPerformer,
      worstPerformer,
    };
  }, [positions, instruments]);

  const formatCurrency = (val: number) => {
    const sign = val >= 0 ? '+' : '';
    return `${sign}$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (val: number) => {
    const sign = val >= 0 ? '+' : '';
    return `${sign}${val.toFixed(2)}%`;
  };

  const getValueClass = (val: number) => {
    if (val > 0) return 'perf-positive';
    if (val < 0) return 'perf-negative';
    return 'perf-neutral';
  };

  if (loading) {
    return (
      <div className="perf-panel">
        <div className="perf-loading">
          <span className="perf-spinner">⟳</span>
          Loading performance data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="perf-panel">
        <div className="perf-error">
          <span className="perf-error-icon">⚠</span>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="perf-panel">
      {/* Header */}
      <div className="perf-header">
        <h2 className="perf-title">📊 Performance Analytics</h2>
        <div className="perf-timeframe">
          {(['all', '1d', '1w', '1m'] as const).map(tf => (
            <button
              key={tf}
              className={`perf-tf-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Metrics */}
      <div className="perf-main-metrics">
        <div className="perf-metric-large">
          <span className="perf-metric-label">Total Return</span>
          <span className={`perf-metric-value ${getValueClass(metrics.totalReturn)}`}>
            {formatCurrency(metrics.totalReturn)}
          </span>
          <span className={`perf-metric-pct ${getValueClass(metrics.totalReturnPct)}`}>
            {formatPercent(metrics.totalReturnPct)}
          </span>
        </div>
        <div className="perf-equity-bar">
          <div className="perf-equity-label">
            <span>Invested: ${metrics.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            <span>Equity: ${metrics.totalEquity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="perf-equity-track">
            <div 
              className={`perf-equity-fill ${metrics.totalReturn >= 0 ? 'positive' : 'negative'}`}
              style={{ width: `${Math.min(100, Math.abs(metrics.totalReturnPct))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Win/Loss Stats */}
      <div className="perf-section">
        <h3 className="perf-section-title">Win/Loss Analysis</h3>
        <div className="perf-grid">
          <div className="perf-stat">
            <span className="perf-stat-label">Win Rate</span>
            <span className={`perf-stat-value ${metrics.winRate >= 50 ? 'perf-positive' : 'perf-negative'}`}>
              {metrics.winRate.toFixed(1)}%
            </span>
          </div>
          <div className="perf-stat">
            <span className="perf-stat-label">Profit Factor</span>
            <span className={`perf-stat-value ${metrics.profitFactor >= 1 ? 'perf-positive' : 'perf-negative'}`}>
              {metrics.profitFactor === Infinity ? '∞' : metrics.profitFactor.toFixed(2)}
            </span>
          </div>
          <div className="perf-stat">
            <span className="perf-stat-label">Winners</span>
            <span className="perf-stat-value perf-positive">{metrics.winCount}</span>
          </div>
          <div className="perf-stat">
            <span className="perf-stat-label">Losers</span>
            <span className="perf-stat-value perf-negative">{metrics.lossCount}</span>
          </div>
          <div className="perf-stat">
            <span className="perf-stat-label">Avg Win</span>
            <span className="perf-stat-value perf-positive">{formatCurrency(metrics.avgWin)}</span>
          </div>
          <div className="perf-stat">
            <span className="perf-stat-label">Avg Loss</span>
            <span className="perf-stat-value perf-negative">{formatCurrency(-metrics.avgLoss)}</span>
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="perf-section">
        <h3 className="perf-section-title">Risk Metrics</h3>
        <div className="perf-grid">
          <div className="perf-stat">
            <span className="perf-stat-label">Sharpe Ratio</span>
            <span className={`perf-stat-value ${metrics.sharpeRatio >= 1 ? 'perf-positive' : metrics.sharpeRatio >= 0 ? 'perf-neutral' : 'perf-negative'}`}>
              {metrics.sharpeRatio.toFixed(2)}
            </span>
          </div>
          <div className="perf-stat">
            <span className="perf-stat-label">Max Drawdown</span>
            <span className={`perf-stat-value ${metrics.maxDrawdown >= 0 ? 'perf-neutral' : 'perf-negative'}`}>
              {formatPercent(metrics.maxDrawdown)}
            </span>
          </div>
        </div>
      </div>

      {/* Top/Bottom Performers */}
      <div className="perf-section">
        <h3 className="perf-section-title">Top Performers</h3>
        <div className="perf-performers">
          {metrics.bestPerformer && (
            <div className="perf-performer">
              <span className="perf-performer-icon">🏆</span>
              <span className="perf-performer-symbol">{metrics.bestPerformer.symbol}</span>
              <span className="perf-performer-return perf-positive">
                {formatPercent(metrics.bestPerformer.return)}
              </span>
            </div>
          )}
          {metrics.worstPerformer && (
            <div className="perf-performer">
              <span className="perf-performer-icon">📉</span>
              <span className="perf-performer-symbol">{metrics.worstPerformer.symbol}</span>
              <span className="perf-performer-return perf-negative">
                {formatPercent(metrics.worstPerformer.return)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Positions Count */}
      <div className="perf-footer">
        <span>Based on {positions.length} open position{positions.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
};

export default PerformancePanel;
