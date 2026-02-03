import { useState, useEffect, useCallback, useMemo } from 'react';
import { quotesStore, StoredQuote } from '../../stores/quotesStore';
import type { PanelContentProps } from '../Workspace/PanelRegistry';
import './MarketOverviewPanel.css';

// Key market symbols to track
const MARKET_INDICES = [
  { symbol: 'SPY', name: 'S&P 500', region: 'US' },
  { symbol: 'QQQ', name: 'Nasdaq 100', region: 'US' },
  { symbol: 'DIA', name: 'Dow Jones', region: 'US' },
  { symbol: 'IWM', name: 'Russell 2000', region: 'US' },
  { symbol: 'VIX', name: 'Volatility', region: 'US' },
];

const CRYPTO_MAJORS = [
  { symbol: 'BTCUSD', name: 'Bitcoin', region: 'Crypto' },
  { symbol: 'ETHUSD', name: 'Ethereum', region: 'Crypto' },
  { symbol: 'SOLUSD', name: 'Solana', region: 'Crypto' },
];

const COMMODITIES = [
  { symbol: 'GOLD', name: 'Gold', region: 'Commodity' },
  { symbol: 'OIL', name: 'Crude Oil', region: 'Commodity' },
];

const FX_MAJORS = [
  { symbol: 'EURUSD', name: 'EUR/USD', region: 'FX' },
  { symbol: 'GBPUSD', name: 'GBP/USD', region: 'FX' },
  { symbol: 'USDJPY', name: 'USD/JPY', region: 'FX' },
];

interface MarketItem {
  symbol: string;
  name: string;
  region: string;
  price?: number;
  change?: number;
  changePercent?: number;
  isUp?: boolean;
  lastUpdate?: Date;
}

type MarketCategory = 'all' | 'indices' | 'crypto' | 'commodities' | 'fx';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: '#0a0a0a',
    color: '#00ff00',
    fontFamily: '"Courier New", monospace',
    fontSize: '11px',
    overflow: 'hidden',
  },
  header: {
    padding: '8px 12px',
    borderBottom: '1px solid #1a1a1a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
  title: {
    fontSize: '12px',
    fontWeight: 'bold' as const,
    color: '#00ff00',
  },
  marketStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '10px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #1a1a1a',
    backgroundColor: '#080808',
  },
  tab: {
    padding: '6px 12px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    color: '#666',
    fontSize: '10px',
    fontFamily: '"Courier New", monospace',
  },
  activeTab: {
    color: '#00ff00',
    borderBottom: '1px solid #00ff00',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '8px',
  },
  section: {
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '10px',
    color: '#666',
    marginBottom: '6px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '6px',
  },
  card: {
    backgroundColor: '#111',
    padding: '8px 10px',
    borderRadius: '2px',
    border: '1px solid #1a1a1a',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  cardHover: {
    borderColor: '#00ff00',
  },
  cardSymbol: {
    fontSize: '11px',
    fontWeight: 'bold' as const,
    marginBottom: '2px',
  },
  cardName: {
    fontSize: '9px',
    color: '#666',
    marginBottom: '4px',
  },
  cardPrice: {
    fontSize: '12px',
    fontWeight: 'bold' as const,
  },
  cardChange: {
    fontSize: '10px',
    marginTop: '2px',
  },
  positive: {
    color: '#00ff00',
  },
  negative: {
    color: '#ff4444',
  },
  neutral: {
    color: '#666',
  },
  footer: {
    padding: '6px 12px',
    borderTop: '1px solid #1a1a1a',
    backgroundColor: '#080808',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '9px',
    color: '#666',
  },
  summaryBox: {
    backgroundColor: '#0d0d0d',
    padding: '10px 12px',
    marginBottom: '10px',
    borderRadius: '2px',
    border: '1px solid #1a1a1a',
  },
  summaryTitle: {
    fontSize: '10px',
    color: '#666',
    marginBottom: '8px',
  },
  summaryStats: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '8px',
  },
  summaryStat: {
    textAlign: 'center' as const,
  },
  summaryValue: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
  },
  summaryLabel: {
    fontSize: '9px',
    color: '#666',
    marginTop: '2px',
  },
  marketHours: {
    backgroundColor: '#0d0d0d',
    padding: '8px 12px',
    marginBottom: '10px',
    borderRadius: '2px',
    border: '1px solid #1a1a1a',
  },
  hoursRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    fontSize: '10px',
  },
  loading: {
    color: '#666',
    fontStyle: 'italic' as const,
  },
};

function getMarketStatus(): { isOpen: boolean; message: string; color: string } {
  const now = new Date();
  const utcHour = now.getUTCHours();
  const utcDay = now.getUTCDay();
  
  // Weekend
  if (utcDay === 0 || utcDay === 6) {
    return { isOpen: false, message: 'Weekend - Markets Closed', color: '#ff4444' };
  }
  
  // US Market hours (14:30 - 21:00 UTC)
  if (utcHour >= 14 && utcHour < 21) {
    return { isOpen: true, message: 'US Markets Open', color: '#00ff00' };
  }
  
  // Pre-market (9:00 - 14:30 UTC)
  if (utcHour >= 9 && utcHour < 14) {
    return { isOpen: true, message: 'Pre-Market Trading', color: '#ffaa00' };
  }
  
  // After-hours (21:00 - 1:00 UTC)
  if (utcHour >= 21 || utcHour < 1) {
    return { isOpen: true, message: 'After-Hours Trading', color: '#ffaa00' };
  }
  
  return { isOpen: false, message: 'Markets Closed', color: '#666' };
}

function formatPrice(price: number | undefined): string {
  if (price === undefined || price === 0) return '--';
  if (price >= 10000) return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  if (price >= 1000) return price.toFixed(2);
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(4);
}

function formatChange(change: number | undefined, percent: number | undefined): string {
  if (change === undefined || percent === undefined) return '--';
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;
}

export default function MarketOverviewPanel(_props: PanelContentProps) {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [category, setCategory] = useState<MarketCategory>('all');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const allSymbols = useMemo(() => [
    ...MARKET_INDICES,
    ...CRYPTO_MAJORS,
    ...COMMODITIES,
    ...FX_MAJORS,
  ], []);

  // Subscribe to all market symbols
  useEffect(() => {
    const symbolsToSubscribe = allSymbols.map(s => s.symbol);
    
    // Subscribe to quotes store
    const unsubscribe = quotesStore.subscribe((quotes) => {
      const updatedItems: MarketItem[] = allSymbols.map(item => {
        const quote = quotes[item.symbol];
        if (quote) {
          const change = quote.lastPrice - (quote.openPrice || quote.lastPrice);
          const changePercent = quote.openPrice ? ((change / quote.openPrice) * 100) : 0;
          return {
            ...item,
            price: quote.lastPrice,
            change,
            changePercent,
            isUp: change >= 0,
            lastUpdate: new Date(),
          };
        }
        return item;
      });
      setItems(updatedItems);
      setLastRefresh(new Date());
    });

    // Trigger initial fetch
    symbolsToSubscribe.forEach(symbol => {
      quotesStore.requestQuote(symbol);
    });

    // Refresh periodically
    const interval = setInterval(() => {
      symbolsToSubscribe.forEach(symbol => {
        quotesStore.requestQuote(symbol);
      });
    }, 10000); // Refresh every 10 seconds

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [allSymbols]);

  const filteredItems = useMemo(() => {
    switch (category) {
      case 'indices':
        return items.filter(i => MARKET_INDICES.some(m => m.symbol === i.symbol));
      case 'crypto':
        return items.filter(i => CRYPTO_MAJORS.some(m => m.symbol === i.symbol));
      case 'commodities':
        return items.filter(i => COMMODITIES.some(m => m.symbol === i.symbol));
      case 'fx':
        return items.filter(i => FX_MAJORS.some(m => m.symbol === i.symbol));
      default:
        return items;
    }
  }, [items, category]);

  const marketSummary = useMemo(() => {
    const indicesItems = items.filter(i => MARKET_INDICES.some(m => m.symbol === i.symbol));
    const upCount = indicesItems.filter(i => i.isUp).length;
    const downCount = indicesItems.filter(i => !i.isUp && i.price !== undefined).length;
    
    // Find biggest mover
    let biggestMover: MarketItem | undefined;
    let maxChange = 0;
    items.forEach(item => {
      if (item.changePercent !== undefined) {
        const absChange = Math.abs(item.changePercent);
        if (absChange > maxChange) {
          maxChange = absChange;
          biggestMover = item;
        }
      }
    });

    // Calculate average change across indices
    const avgChange = indicesItems.reduce((sum, i) => sum + (i.changePercent || 0), 0) / (indicesItems.length || 1);

    return { upCount, downCount, biggestMover, avgChange };
  }, [items]);

  const marketStatus = getMarketStatus();

  const renderCard = (item: MarketItem) => {
    const isHovered = hoveredCard === item.symbol;
    const changeStyle = item.isUp ? styles.positive : item.price !== undefined ? styles.negative : styles.neutral;
    
    return (
      <div
        key={item.symbol}
        style={{
          ...styles.card,
          ...(isHovered ? styles.cardHover : {}),
        }}
        onMouseEnter={() => setHoveredCard(item.symbol)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={{ ...styles.cardSymbol, ...changeStyle }}>{item.symbol}</div>
        <div style={styles.cardName}>{item.name}</div>
        <div style={{ ...styles.cardPrice, ...changeStyle }}>
          {item.price !== undefined ? formatPrice(item.price) : <span style={styles.loading}>Loading...</span>}
        </div>
        <div style={{ ...styles.cardChange, ...changeStyle }}>
          {item.price !== undefined ? formatChange(item.change, item.changePercent) : '--'}
        </div>
      </div>
    );
  };

  const renderByCategory = () => {
    if (category !== 'all') {
      return (
        <div style={styles.grid}>
          {filteredItems.map(renderCard)}
        </div>
      );
    }

    return (
      <>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>📈 US Indices</div>
          <div style={styles.grid}>
            {items.filter(i => MARKET_INDICES.some(m => m.symbol === i.symbol)).map(renderCard)}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>₿ Crypto</div>
          <div style={styles.grid}>
            {items.filter(i => CRYPTO_MAJORS.some(m => m.symbol === i.symbol)).map(renderCard)}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🛢️ Commodities</div>
          <div style={styles.grid}>
            {items.filter(i => COMMODITIES.some(m => m.symbol === i.symbol)).map(renderCard)}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>💱 Forex</div>
          <div style={styles.grid}>
            {items.filter(i => FX_MAJORS.some(m => m.symbol === i.symbol)).map(renderCard)}
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.title}>MARKET OVERVIEW</span>
        <div style={styles.marketStatus}>
          <div style={{ ...styles.statusDot, backgroundColor: marketStatus.color }} />
          <span style={{ color: marketStatus.color }}>{marketStatus.message}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={styles.tabs}>
        {(['all', 'indices', 'crypto', 'commodities', 'fx'] as MarketCategory[]).map(cat => (
          <button
            key={cat}
            style={{
              ...styles.tab,
              ...(category === cat ? styles.activeTab : {}),
            }}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'ALL' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Market Summary */}
        <div style={styles.summaryBox}>
          <div style={styles.summaryTitle}>MARKET SENTIMENT</div>
          <div style={styles.summaryStats}>
            <div style={styles.summaryStat}>
              <div style={{ ...styles.summaryValue, ...styles.positive }}>{marketSummary.upCount}</div>
              <div style={styles.summaryLabel}>UP</div>
            </div>
            <div style={styles.summaryStat}>
              <div style={{ ...styles.summaryValue, ...styles.negative }}>{marketSummary.downCount}</div>
              <div style={styles.summaryLabel}>DOWN</div>
            </div>
            <div style={styles.summaryStat}>
              <div style={{
                ...styles.summaryValue,
                ...(marketSummary.avgChange >= 0 ? styles.positive : styles.negative),
              }}>
                {marketSummary.avgChange >= 0 ? '+' : ''}{marketSummary.avgChange.toFixed(2)}%
              </div>
              <div style={styles.summaryLabel}>AVG CHANGE</div>
            </div>
          </div>
        </div>

        {/* Biggest Mover */}
        {marketSummary.biggestMover && (
          <div style={styles.summaryBox}>
            <div style={styles.summaryTitle}>🔥 BIGGEST MOVER</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{marketSummary.biggestMover.symbol}</span>
              <span style={{
                fontSize: '14px',
                ...(marketSummary.biggestMover.isUp ? styles.positive : styles.negative),
              }}>
                {marketSummary.biggestMover.changePercent !== undefined 
                  ? `${marketSummary.biggestMover.changePercent >= 0 ? '+' : ''}${marketSummary.biggestMover.changePercent.toFixed(2)}%`
                  : '--'}
              </span>
            </div>
          </div>
        )}

        {/* Markets Grid */}
        {renderByCategory()}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>Last refresh: {lastRefresh.toLocaleTimeString()}</span>
        <span>{items.filter(i => i.price !== undefined).length}/{items.length} symbols loaded</span>
      </div>
    </div>
  );
}
