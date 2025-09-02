/**
 * Formats a timestamp into a human-readable string
 * @param {Date|number|string} timestamp - The timestamp to format
 * @returns {string} The formatted date string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}