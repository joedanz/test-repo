/**
 * Formats a timestamp into a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatTimestamp(date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}