import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  description: string;
  action: () => void;
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
}

/**
 * Global keyboard shortcuts hook
 * Usage: useKeyboardShortcuts(shortcuts, { enabled: true })
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: UseKeyboardShortcutsOptions = {}
) {
  const { enabled = true } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore if typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow specific shortcuts even in inputs (like Escape)
        if (event.key !== 'Escape') {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const altMatches = shortcut.alt ? event.altKey : !event.altKey;
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey;

        if (keyMatches && ctrlMatches && altMatches && shiftMatches) {
          event.preventDefault();
          event.stopPropagation();
          shortcut.action();
          return;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}

/**
 * Default panel shortcuts mapping
 * Ctrl+1 through Ctrl+9 for quick panel access
 */
export const PANEL_SHORTCUTS: Record<string, string> = {
  '1': 'QT',    // Quote
  '2': 'CH',    // Chart
  '3': 'WL',    // Watchlist
  '4': 'TRD',   // Trade Ticket
  '5': 'PF',    // Portfolio
  '6': 'ORD',   // Blotter (Orders)
  '7': 'AL',    // Alerts
  '8': 'EXP',   // Asset Explorer
  '9': 'HELP',  // Help
};

export const SHORTCUT_DESCRIPTIONS: Record<string, string> = {
  '/': 'Focus command bar',
  'Escape': 'Close modal/dropdown',
  'Ctrl+1': 'Open Quote panel',
  'Ctrl+2': 'Open Chart panel',
  'Ctrl+3': 'Open Watchlist panel',
  'Ctrl+4': 'Open Trade Ticket',
  'Ctrl+5': 'Open Portfolio panel',
  'Ctrl+6': 'Open Orders Blotter',
  'Ctrl+7': 'Open Alerts panel',
  'Ctrl+8': 'Open Asset Explorer',
  'Ctrl+9': 'Open Help panel',
  'Ctrl+D': 'Toggle diagnostics',
  'Ctrl+M': 'Toggle Demo/Real mode',
};

export default useKeyboardShortcuts;
