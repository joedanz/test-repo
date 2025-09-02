/**
 * Timestamp formatting utilities
 * @module utils
 */

/**
 * Formats a timestamp into a human-readable format
 * @param {Date|string|number} timestamp - The timestamp to format
 * @param {Object} options - Formatting options
 * @param {boolean} options.includeSeconds - Whether to include seconds
 * @returns {string} Formatted timestamp string
 */
export function formatTimestamp(timestamp, options = {}) {
  const date = new Date(timestamp);
  const { includeSeconds = true } = options;
  
  const formatted = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: false
  });
  
  return formatted;
}

/**
 * Gets a relative time string (e.g., "2 minutes ago")
 * @param {Date|string|number} timestamp - The timestamp to compare
 * @returns {string} Relative time string
 */
export function getRelativeTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  
  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  
  return formatTimestamp(timestamp, { includeSeconds: false });
}
