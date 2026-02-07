/**
 * Mobile Navigation Component
 * Provides touch-friendly panel navigation for mobile devices
 */

import { useState, useCallback } from 'react';
import { useWorkspaceContext } from '../contexts/WorkspaceContext';

// Panel codes and labels
const PANEL_MENU_ITEMS = [
  { code: 'QT', label: 'Quote Tile', icon: '📊' },
  { code: 'WL', label: 'Watchlists', icon: '⭐' },
  { code: 'WLM', label: 'Watchlist Monitor', icon: '👁️' },
  { code: 'PF', label: 'Portfolio', icon: '💼' },
  { code: 'TRD', label: 'Trade Ticket', icon: '💹' },
  { code: 'ORD', label: 'Blotter', icon: '📋' },
  { code: 'CH', label: 'Chart', icon: '📈' },
  { code: 'AL', label: 'Alerts', icon: '🔔' },
  { code: 'PI', label: 'Trader Search', icon: '🔍' },
  { code: 'PIP', label: 'Trader Profile', icon: '👤' },
  { code: 'CUR', label: 'Curated Lists', icon: '📚' },
  { code: 'REC', label: 'Recommendations', icon: '💡' },
  { code: 'FEED', label: 'Social Feed', icon: '💬' },
  { code: 'EXP', label: 'Asset Explorer', icon: '🗺️' },
  { code: 'ACT', label: 'Activity Log', icon: '📝' },
  { code: 'API', label: 'API Tester', icon: '🔧' },
  { code: 'STATUS', label: 'Connection Status', icon: '🌐' },
  { code: 'HELP', label: 'Help', icon: '❓' },
];

interface MobileNavigationProps {
  className?: string;
}

export default function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { executeCommand } = useWorkspaceContext();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handlePanelSelect = useCallback((code: string) => {
    executeCommand?.(code);
    setIsMenuOpen(false);
  }, [executeCommand]);

  const handleBackdropClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Navigation Toggle Button */}
      <button
        className={`mobile-nav-toggle ${className}`}
        onClick={toggleMenu}
        aria-label="Open panel menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Panel Menu */}
      <div
        className={`mobile-panel-menu ${isMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-label="Panel navigation menu"
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        {isMenuOpen && (
          <div
            className="mobile-menu-backdrop"
            onClick={handleBackdropClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
            }}
          />
        )}

        {/* Menu Header */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '16px',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 600,
          }}>
            Panels
          </h2>
          <p style={{
            margin: '8px 0 0',
            fontSize: '14px',
            opacity: 0.7,
          }}>
            Select a panel to open
          </p>
        </div>

        {/* Menu Items */}
        <div role="list">
          {PANEL_MENU_ITEMS.map(({ code, label, icon }) => (
            <div
              key={code}
              role="listitem"
              className="mobile-panel-menu-item"
              onClick={() => handlePanelSelect(code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePanelSelect(code);
                }
              }}
              tabIndex={0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '24px' }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '16px' }}>{label}</div>
                <div style={{
                  fontSize: '12px',
                  opacity: 0.6,
                  fontFamily: 'monospace',
                }}>
                  {code}
                </div>
              </div>
              <span style={{ opacity: 0.4 }}>›</span>
            </div>
          ))}
        </div>

        {/* Close button at bottom */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          padding: '16px',
          background: 'inherit',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '16px',
        }}>
          <button
            onClick={toggleMenu}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            Close Menu
          </button>
        </div>
      </div>
    </>
  );
}

/**
 * Hook to detect if device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 768px)').matches
  );

  useState(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  });

  return isMobile;
}

/**
 * Hook to detect touch device
 */
export function useIsTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
