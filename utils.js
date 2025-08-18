/**
 * Formats a timestamp into a human-readable string
 * @param {Date|number} timestamp - Date object or Unix timestamp in milliseconds
 * @returns {string} Human-readable date string
 */
export function formatTimestamp(timestamp) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}