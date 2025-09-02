/**
 * Formats a timestamp into a human readable string
 * @param {Date|number|string} timestamp - The timestamp to format
 * @returns {string} The formatted timestamp string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}