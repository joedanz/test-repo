/**
 * Formats a timestamp into a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatTimestamp(date) {
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}