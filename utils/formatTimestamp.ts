/**
 * Formats a timestamp into a human-readable string (e.g. "2 hours ago")
 * @param timestamp - Date object or timestamp number to format
 * @returns Formatted string representing time elapsed
 * @throws {Error} If timestamp is invalid
 */
export function formatTimestamp(timestamp: Date | number): string {
  // Convert number to Date if needed
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  
  // Validate date
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp provided');
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  // Handle future dates
  if (diffMs < 0) {
    return 'in the future';
  }

  // Convert to seconds
  const diffSec = Math.floor(diffMs / 1000);
  
  // Less than a minute
  if (diffSec < 60) {
    return 'just now';
  }

  // Minutes
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  }

  // Hours
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }

  // Days
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }

  // Months
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  }

  // Years
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
}