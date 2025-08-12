/**
 * Formats a timestamp into a human-readable string
 * @param {Date|number|string} timestamp - The timestamp to format (Date object, milliseconds, or ISO string)
 * @param {Object} [options] - Formatting options
 * @param {string} [options.locale='en-US'] - The locale to use for formatting
 * @param {Object} [options.dateTimeOptions] - Options for Intl.DateTimeFormat
 * @returns {string} The formatted timestamp string
 * @throws {Error} If the timestamp is invalid
 * 
 * @example
 * formatTimestamp(new Date())
 * // Returns: "12/8/2025, 3:45:30 PM"
 * 
 * @example
 * formatTimestamp(Date.now(), {
 *   locale: 'en-GB',
 *   dateTimeOptions: { 
 *     year: 'numeric', 
 *     month: 'long', 
 *     day: 'numeric',
 *     hour: '2-digit',
 *     minute: '2-digit'
 *   }
 * })
 * // Returns: "8 August 2025, 15:45"
 */
function formatTimestamp(timestamp, options = {}) {
  const { locale = 'en-US', dateTimeOptions = {} } = options;
  
  let date;
  
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    throw new Error('Invalid timestamp format. Expected Date object, number, or string.');
  }
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp value.');
  }
  
  const defaultOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...dateTimeOptions
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
}

module.exports = { formatTimestamp };