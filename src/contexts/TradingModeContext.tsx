import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export enum TradingMode {
  DEMO = 'DEMO',
  REAL = 'REAL',
}

const SESSION_STORAGE_KEY = 'etoro_trading_mode';

interface TradingModeContextValue {
  mode: TradingMode;
  setTradingMode: (mode: TradingMode) => void;
  toggleMode: () => void;
  isRealMode: () => boolean;
  isDemoMode: () => boolean;
  requiresConfirmation: () => boolean;
}

const TradingModeContext = createContext<TradingModeContextValue | null>(null);

interface TradingModeProviderProps {
  children: ReactNode;
}

export function TradingModeProvider({ children }: TradingModeProviderProps) {
  const [mode, setMode] = useState<TradingMode>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored === TradingMode.REAL || stored === TradingMode.DEMO) {
        return stored;
      }
    } catch {
      // sessionStorage may not be available
    }
    return TradingMode.DEMO;
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, mode);
    } catch {
      // sessionStorage may not be available
    }
  }, [mode]);

  const setTradingMode = useCallback((newMode: TradingMode) => {
    setMode(newMode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(current => current === TradingMode.DEMO ? TradingMode.REAL : TradingMode.DEMO);
  }, []);

  const isRealMode = useCallback(() => mode === TradingMode.REAL, [mode]);
  const isDemoMode = useCallback(() => mode === TradingMode.DEMO, [mode]);
  const requiresConfirmation = useCallback(() => mode === TradingMode.REAL, [mode]);

  const value: TradingModeContextValue = {
    mode,
    setTradingMode,
    toggleMode,
    isRealMode,
    isDemoMode,
    requiresConfirmation,
  };

  return (
    <TradingModeContext.Provider value={value}>
      {children}
    </TradingModeContext.Provider>
  );
}

export function useTradingMode(): TradingModeContextValue {
  const context = useContext(TradingModeContext);
  if (!context) {
    throw new Error('useTradingMode must be used within a TradingModeProvider');
  }
  return context;
}
