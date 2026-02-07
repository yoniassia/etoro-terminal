/**
 * Unified formatting utilities for the eToro Terminal
 * Eliminates duplicate formatting logic across components
 */

/**
 * Format a price value with optional decimal places
 * @param price - The price to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted price string
 */
export function formatPrice(price: number | undefined | null, decimals: number = 2): string {
  if (price === undefined || price === null || isNaN(price)) {
    return '-';
  }
  return price.toFixed(decimals);
}

/**
 * Format a currency value with $ symbol
 * @param value - The value to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(value: number | undefined | null, decimals: number = 2): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '$0.00';
  }

  const formatted = Math.abs(value).toFixed(decimals);
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${value < 0 ? '-' : ''}$${parts.join('.')}`;
}

/**
 * Format a P&L value with sign and color indication
 * @param value - The P&L value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted P&L string with + or - prefix
 */
export function formatPnL(value: number | undefined | null, decimals: number = 2): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '$0.00';
  }

  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatCurrency(value, decimals)}`;
}

/**
 * Format a percentage change value
 * @param value - The percentage value (as decimal, e.g., 0.05 = 5%)
 * @param decimals - Number of decimal places (default: 2)
 * @param asDecimal - If true, treat value as already a percentage (default: false)
 * @returns Formatted percentage string (e.g., "+5.25%")
 */
export function formatChange(
  value: number | undefined | null,
  decimals: number = 2,
  asDecimal: boolean = false
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0.00%';
  }

  const percentage = asDecimal ? value : value * 100;
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(decimals)}%`;
}

/**
 * Format a percentage value (without sign)
 * @param value - The percentage value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (e.g., "5.25%")
 */
export function formatPercent(value: number | undefined | null, decimals: number = 2): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0.00%';
  }

  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a timestamp to human-readable date/time
 * @param timestamp - ISO string, Date object, or timestamp in milliseconds
 * @param includeTime - Whether to include time (default: true)
 * @returns Formatted date/time string
 */
export function formatTime(
  timestamp: string | Date | number | undefined | null,
  includeTime: boolean = true
): string {
  if (!timestamp) {
    return '-';
  }

  try {
    const date = typeof timestamp === 'string' || typeof timestamp === 'number'
      ? new Date(timestamp)
      : timestamp;

    if (isNaN(date.getTime())) {
      return '-';
    }

    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    if (!includeTime) {
      return dateStr;
    }

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return `${dateStr} ${timeStr}`;
  } catch {
    return '-';
  }
}

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param timestamp - ISO string, Date object, or timestamp in milliseconds
 * @returns Relative time string
 */
export function formatTimeAgo(timestamp: string | Date | number | undefined | null): string {
  if (!timestamp) {
    return '-';
  }

  try {
    const date = typeof timestamp === 'string' || typeof timestamp === 'number'
      ? new Date(timestamp)
      : timestamp;

    if (isNaN(date.getTime())) {
      return '-';
    }

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  } catch {
    return '-';
  }
}

/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string (e.g., "1,234,567")
 */
export function formatNumber(value: number | undefined | null, decimals: number = 0): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }

  const formatted = value.toFixed(decimals);
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

/**
 * Format leverage (e.g., "5x", "10x")
 * @param value - The leverage value
 * @returns Formatted leverage string
 */
export function formatLeverage(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '1x';
  }

  return `${Math.floor(value)}x`;
}

/**
 * Format units/shares
 * @param value - The units value
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted units string
 */
export function formatUnits(value: number | undefined | null, decimals: number = 4): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }

  // Remove trailing zeros
  const formatted = value.toFixed(decimals);
  return formatted.replace(/\.?0+$/, '');
}

/**
 * Get color class based on value (positive = green, negative = red)
 * @param value - The value to check
 * @returns CSS class name for color
 */
export function getChangeColor(value: number | undefined | null): 'positive' | 'negative' | 'neutral' {
  if (value === undefined || value === null || isNaN(value) || value === 0) {
    return 'neutral';
  }
  return value > 0 ? 'positive' : 'negative';
}

/**
 * Format file size in bytes to human-readable format
 * @param bytes - Size in bytes
 * @returns Formatted size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number | undefined | null): string {
  if (bytes === undefined || bytes === null || isNaN(bytes) || bytes === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`;
}
