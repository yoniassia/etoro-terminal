/**
 * eToro Terminal Version Configuration
 * Auto-generated build info and changelog tracking
 */

export const APP_VERSION = '1.2.0';
export const BUILD_DATE = '2026-02-01';
export const BUILD_NUMBER = 2;

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.2.0',
    date: '2026-02-01',
    changes: [
      'Added Risk Dashboard panel (RISK)',
      'Portfolio risk scoring (0-100)',
      'Value at Risk (VaR) calculation',
      'Leverage exposure tracking',
      'Concentration risk analysis (HHI)',
      'Stop loss coverage alerts',
      'Position-level risk breakdown',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-31',
    changes: [
      'Added version configuration system',
      'Implemented global keyboard shortcuts (Ctrl+1 through Ctrl+9)',
      'Added version display in header',
      'Improved documentation',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-01-30',
    changes: [
      'Initial release',
      'Bloomberg-style terminal interface',
      '18 panel types (Quote, Chart, Watchlist, Trade, etc.)',
      'Real-time WebSocket streaming',
      'Demo and Real trading modes',
      'Command bar navigation',
      'Panel linking system',
    ],
  },
];

export const getVersionInfo = () => ({
  version: APP_VERSION,
  buildDate: BUILD_DATE,
  buildNumber: BUILD_NUMBER,
  fullVersion: `v${APP_VERSION} (${BUILD_DATE})`,
});

export const getLatestChanges = () => CHANGELOG[0]?.changes || [];

export default {
  APP_VERSION,
  BUILD_DATE,
  BUILD_NUMBER,
  CHANGELOG,
  getVersionInfo,
  getLatestChanges,
};
