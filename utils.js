/**
 * Formats a timestamp into a human-readable string
 * @param {Date|number} timestamp - Date object or timestamp in milliseconds
 * @returns {string} Formatted date string in the format "MM/DD/YYYY, HH:mm:ss"
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}