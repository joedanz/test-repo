/**
 * Formats a timestamp into a human-readable string
 * @param {Date} timestamp - The timestamp to format
 * @returns {string} The formatted date string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}