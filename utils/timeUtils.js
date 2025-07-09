/**
 * Formats a timestamp into a human-readable string describing time elapsed
 * @param {Date|number} timestamp - Date object or timestamp in milliseconds
 * @returns {string} Human-readable string (e.g. "2 hours ago", "3 days ago")
 * @throws {Error} If timestamp is invalid
 */
export function formatTimestamp(timestamp) {
  // Convert input to Date object
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  
  // Validate date
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp provided');
  }

  const now = new Date();
  const diffMs = now - date;
  
  // Handle future dates
  if (diffMs < 0) {
    return 'in the future';
  }

  // Convert to seconds
  const diffSecs = Math.floor(diffMs / 1000);
  
  // Just now: less than a minute ago
  if (diffSecs < 60) {
    return 'just now';
  }
  
  // Minutes
  const mins = Math.floor(diffSecs / 60);
  if (mins < 60) {
    return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  }
  
  // Hours
  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  
  // Days
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  
  // Months
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }
  
  // Years
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}