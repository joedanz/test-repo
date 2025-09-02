/**
 * Formats a timestamp into a human-readable string
 * @param {Date} timestamp - The timestamp to format
 * @returns {string} The formatted timestamp string
 */
export function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric', 
    minute: 'numeric',
    second: 'numeric'
  }).format(timestamp);
}