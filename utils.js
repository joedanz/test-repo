/**
 * Formats a timestamp into human-readable format
 * @param {Date|number} timestamp - Date object or timestamp in milliseconds
 * @returns {string} Formatted date string in the format 'MMM DD, YYYY HH:mm:ss'
 */
export function formatTimestamp(timestamp) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}