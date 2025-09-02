/**
 * Formats a timestamp into a human-readable string
 * @param {Date|number} timestamp - The timestamp to format (Date object or Unix timestamp)
 * @returns {string} The formatted timestamp string
 */
export function formatTimestamp(timestamp) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}