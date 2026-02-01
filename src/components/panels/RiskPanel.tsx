import { useState, useEffect, useMemo } from 'react';
import { portfolioStore, PortfolioState } from '../../stores/portfolioStore';
import type { Position } from '../../api/contracts/etoro-api.types';
import type { PanelContentProps } from '../Workspace/PanelRegistry';
import './RiskPanel.css';

interface RiskMetrics {
  totalExposure: number;
  totalLeveragedExposure: number;
  averageLeverage: number;
  maxLeverage: number;
  concentrationRisk: number;
  largestPosition: { name: string; percentage: number } | null;
  positionsWithoutStopLoss: number;
  totalStopLossExposure: number;
  riskScore: number;
  valueAtRisk: number;
}

interface PositionRisk {
  position: Position;
  riskContribution: number;
  leveragedExposure: number;
  percentOfPortfolio: number;
  hasStopLoss: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export default function RiskPanel(_props: PanelContentProps) {
  const [state, setState] = useState<PortfolioState>(portfolioStore.getState());

  useEffect(() => {
    const unsubscribe = portfolioStore.subscribe(setState);
    portfolioStore.fetchPortfolio().catch(() => {});
    return unsubscribe;
  }, []);

  const riskMetrics = useMemo((): RiskMetrics => {
    const positions = state.portfolio?.positions || [];
    const totalValue = state.portfolio?.totalValue || 0;
    
    if (positions.length === 0) {
      return {
        totalExposure: 0,
        totalLeveragedExposure: 0,
        averageLeverage: 0,
        maxLeverage: 0,
        concentrationRisk: 0,
        largestPosition: null,
        positionsWithoutStopLoss: 0,
        totalStopLossExposure: 0,
        riskScore: 0,
        valueAtRisk: 0,
      };
    }

    const totalExposure = positions.reduce((sum, p) => sum + p.amount, 0);
    const totalLeveragedExposure = positions.reduce((sum, p) => sum + (p.amount * p.leverage), 0);
    const averageLeverage = totalExposure > 0 
      ? positions.reduce((sum, p) => sum + (p.leverage * p.amount), 0) / totalExposure 
      : 0;
    const maxLeverage = Math.max(...positions.map(p => p.leverage));
    
    // Concentration risk (Herfindahl Index)
    const concentrationRisk = positions.reduce((sum, p) => {
      const weight = p.amount / totalExposure;
      return sum + (weight * weight);
    }, 0);

    // Largest position
    const sortedByAmount = [...positions].sort((a, b) => b.amount - a.amount);
    const largestPosition = sortedByAmount[0] ? {
      name: sortedByAmount[0].instrumentName || `#${sortedByAmount[0].instrumentId}`,
      percentage: (sortedByAmount[0].amount / totalExposure) * 100,
    } : null;

    // Stop loss analysis
    const positionsWithoutStopLoss = positions.filter(
      p => !p.stopLossRate || p.stopLossRate === 0
    ).length;
    
    const totalStopLossExposure = positions
      .filter(p => !p.stopLossRate || p.stopLossRate === 0)
      .reduce((sum, p) => sum + p.amount, 0);

    // Risk score (0-100)
    let riskScore = 0;
    // Leverage contribution (0-30)
    riskScore += Math.min(30, (averageLeverage / 10) * 30);
    // Concentration contribution (0-25)
    riskScore += Math.min(25, concentrationRisk * 100);
    // Stop loss coverage contribution (0-25)
    riskScore += (positionsWithoutStopLoss / positions.length) * 25;
    // Position count factor (more positions = diversification = lower risk)
    const positionCountFactor = Math.max(0, 20 - (positions.length * 2));
    riskScore += positionCountFactor;

    // Value at Risk (simplified 95% VaR estimate)
    // Assumes ~2% daily volatility * 1.65 for 95% confidence * sqrt(10) for 10-day horizon
    const dailyVolatility = 0.02;
    const confidenceMultiplier = 1.65;
    const horizon = Math.sqrt(10);
    const valueAtRisk = totalLeveragedExposure * dailyVolatility * confidenceMultiplier * horizon;

    return {
      totalExposure,
      totalLeveragedExposure,
      averageLeverage,
      maxLeverage,
      concentrationRisk,
      largestPosition,
      positionsWithoutStopLoss,
      totalStopLossExposure,
      riskScore: Math.min(100, Math.round(riskScore)),
      valueAtRisk,
    };
  }, [state.portfolio]);

  const positionRisks = useMemo((): PositionRisk[] => {
    const positions = state.portfolio?.positions || [];
    const totalExposure = positions.reduce((sum, p) => sum + p.amount, 0);
    
    return positions.map(position => {
      const leveragedExposure = position.amount * position.leverage;
      const percentOfPortfolio = totalExposure > 0 ? (position.amount / totalExposure) * 100 : 0;
      const hasStopLoss = !!(position.stopLossRate && position.stopLossRate > 0);
      
      // Calculate risk contribution
      let riskContribution = 0;
      riskContribution += position.leverage * 5; // Leverage factor
      riskContribution += percentOfPortfolio; // Concentration factor
      riskContribution += hasStopLoss ? 0 : 20; // No stop loss penalty
      
      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
      if (riskContribution > 80) riskLevel = 'critical';
      else if (riskContribution > 50) riskLevel = 'high';
      else if (riskContribution > 25) riskLevel = 'medium';
      
      return {
        position,
        riskContribution,
        leveragedExposure,
        percentOfPortfolio,
        hasStopLoss,
        riskLevel,
      };
    }).sort((a, b) => b.riskContribution - a.riskContribution);
  }, [state.portfolio]);

  const getRiskScoreClass = (score: number): string => {
    if (score >= 75) return 'risk-panel__score--critical';
    if (score >= 50) return 'risk-panel__score--high';
    if (score >= 25) return 'risk-panel__score--medium';
    return 'risk-panel__score--low';
  };

  const getRiskLevelClass = (level: string): string => {
    return `risk-panel__level--${level}`;
  };

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const { loading, error, portfolio } = state;
  const positions = portfolio?.positions || [];

  if (loading && !portfolio) {
    return (
      <div className="risk-panel">
        <div className="risk-panel__loading">▓▓▓ ANALYZING RISK ▓▓▓</div>
      </div>
    );
  }

  if (error && !portfolio) {
    return (
      <div className="risk-panel">
        <div className="risk-panel__error">✗ ERROR: {error}</div>
      </div>
    );
  }

  return (
    <div className="risk-panel">
      <div className="risk-panel__header">
        <h2 className="risk-panel__title">&gt; RISK DASHBOARD</h2>
      </div>

      {positions.length === 0 ? (
        <div className="risk-panel__empty">
          <div className="risk-panel__empty-icon">◇</div>
          <div>No positions to analyze</div>
        </div>
      ) : (
        <>
          {/* Risk Score */}
          <div className="risk-panel__score-section">
            <div className="risk-panel__score-header">PORTFOLIO RISK SCORE</div>
            <div className={`risk-panel__score ${getRiskScoreClass(riskMetrics.riskScore)}`}>
              {riskMetrics.riskScore}
            </div>
            <div className="risk-panel__score-label">
              {riskMetrics.riskScore >= 75 ? '⚠ CRITICAL' :
               riskMetrics.riskScore >= 50 ? '⚡ HIGH' :
               riskMetrics.riskScore >= 25 ? '◈ MEDIUM' : '◉ LOW'}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="risk-panel__metrics">
            <div className="risk-panel__metric">
              <span className="risk-panel__metric-label">Total Exposure</span>
              <span className="risk-panel__metric-value">{formatCurrency(riskMetrics.totalExposure)}</span>
            </div>
            <div className="risk-panel__metric">
              <span className="risk-panel__metric-label">Leveraged Exposure</span>
              <span className="risk-panel__metric-value risk-panel__metric-value--warn">
                {formatCurrency(riskMetrics.totalLeveragedExposure)}
              </span>
            </div>
            <div className="risk-panel__metric">
              <span className="risk-panel__metric-label">Avg Leverage</span>
              <span className="risk-panel__metric-value">x{riskMetrics.averageLeverage.toFixed(1)}</span>
            </div>
            <div className="risk-panel__metric">
              <span className="risk-panel__metric-label">Max Leverage</span>
              <span className={`risk-panel__metric-value ${riskMetrics.maxLeverage > 5 ? 'risk-panel__metric-value--warn' : ''}`}>
                x{riskMetrics.maxLeverage}
              </span>
            </div>
            <div className="risk-panel__metric">
              <span className="risk-panel__metric-label">VaR (10-day, 95%)</span>
              <span className="risk-panel__metric-value risk-panel__metric-value--danger">
                {formatCurrency(riskMetrics.valueAtRisk)}
              </span>
            </div>
            <div className="risk-panel__metric">
              <span className="risk-panel__metric-label">Concentration (HHI)</span>
              <span className="risk-panel__metric-value">{(riskMetrics.concentrationRisk * 100).toFixed(1)}%</span>
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="risk-panel__alerts">
            <div className="risk-panel__alerts-header">⚡ RISK ALERTS</div>
            <div className="risk-panel__alerts-list">
              {riskMetrics.positionsWithoutStopLoss > 0 && (
                <div className="risk-panel__alert risk-panel__alert--warning">
                  <span className="risk-panel__alert-icon">⚠</span>
                  <span>{riskMetrics.positionsWithoutStopLoss} position(s) without stop loss ({formatCurrency(riskMetrics.totalStopLossExposure)} exposed)</span>
                </div>
              )}
              {riskMetrics.maxLeverage > 10 && (
                <div className="risk-panel__alert risk-panel__alert--danger">
                  <span className="risk-panel__alert-icon">⚠</span>
                  <span>High leverage position detected (x{riskMetrics.maxLeverage})</span>
                </div>
              )}
              {riskMetrics.largestPosition && riskMetrics.largestPosition.percentage > 30 && (
                <div className="risk-panel__alert risk-panel__alert--warning">
                  <span className="risk-panel__alert-icon">◈</span>
                  <span>Concentrated position: {riskMetrics.largestPosition.name} ({formatPercent(riskMetrics.largestPosition.percentage)})</span>
                </div>
              )}
              {riskMetrics.concentrationRisk > 0.25 && (
                <div className="risk-panel__alert risk-panel__alert--info">
                  <span className="risk-panel__alert-icon">◇</span>
                  <span>Portfolio diversification is low</span>
                </div>
              )}
              {riskMetrics.positionsWithoutStopLoss === 0 && 
               riskMetrics.maxLeverage <= 10 && 
               riskMetrics.concentrationRisk <= 0.25 && (
                <div className="risk-panel__alert risk-panel__alert--success">
                  <span className="risk-panel__alert-icon">✓</span>
                  <span>Risk parameters within acceptable limits</span>
                </div>
              )}
            </div>
          </div>

          {/* Position Risk Breakdown */}
          <div className="risk-panel__positions">
            <div className="risk-panel__positions-header">POSITION RISK BREAKDOWN</div>
            <div className="risk-panel__positions-list">
              {positionRisks.slice(0, 10).map(({ position, riskContribution, leveragedExposure, percentOfPortfolio, hasStopLoss, riskLevel }) => (
                <div key={position.positionId} className="risk-panel__position">
                  <div className="risk-panel__position-main">
                    <span className={`risk-panel__position-level ${getRiskLevelClass(riskLevel)}`}>
                      {riskLevel === 'critical' ? '●' : riskLevel === 'high' ? '◉' : riskLevel === 'medium' ? '◈' : '○'}
                    </span>
                    <span className="risk-panel__position-name">
                      {position.instrumentName || `#${position.instrumentId}`}
                    </span>
                    <span className="risk-panel__position-side" data-side={position.isBuy ? 'buy' : 'sell'}>
                      {position.isBuy ? 'L' : 'S'}
                    </span>
                  </div>
                  <div className="risk-panel__position-details">
                    <span className="risk-panel__position-stat">
                      {formatPercent(percentOfPortfolio)} weight
                    </span>
                    <span className="risk-panel__position-stat">
                      x{position.leverage}
                    </span>
                    <span className="risk-panel__position-stat">
                      {formatCurrency(leveragedExposure)}
                    </span>
                    {!hasStopLoss && (
                      <span className="risk-panel__position-warning">NO SL</span>
                    )}
                  </div>
                  <div className="risk-panel__position-bar">
                    <div 
                      className={`risk-panel__position-bar-fill ${getRiskLevelClass(riskLevel)}`}
                      style={{ width: `${Math.min(100, riskContribution)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="risk-panel__legend">
            <span className="risk-panel__legend-item">
              <span className="risk-panel__level--low">○</span> Low
            </span>
            <span className="risk-panel__legend-item">
              <span className="risk-panel__level--medium">◈</span> Medium
            </span>
            <span className="risk-panel__legend-item">
              <span className="risk-panel__level--high">◉</span> High
            </span>
            <span className="risk-panel__legend-item">
              <span className="risk-panel__level--critical">●</span> Critical
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export { RiskPanel };
