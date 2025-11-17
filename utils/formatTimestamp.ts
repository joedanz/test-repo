/**
 * Formats a timestamp into a human-readable string (e.g., "2 hours ago", "3 days ago")
 * @param timestamp - Date object or timestamp number to format
 * @returns Formatted string representing the relative time
 * @throws Error if timestamp is invalid
 */
export function formatTimestamp(timestamp: Date | number): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp provided');
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Handle future dates
  if (diff < 0) {
    return 'in the future';
  }

  // Convert milliseconds to seconds
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}