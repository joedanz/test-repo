/**
 * Formats a timestamp into a human-readable string
 * @param {Date} timestamp - The timestamp to format
 * @returns {string} The formatted timestamp string
 */
export function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(timestamp);
}