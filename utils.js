/**
 * Formats a timestamp into a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatTimestamp(date) {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric', 
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}