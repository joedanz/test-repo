/**
 * Formats a timestamp into a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatTimestamp(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}