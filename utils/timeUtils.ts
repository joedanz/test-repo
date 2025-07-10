/**
 * Formats a timestamp into a human-readable relative time string
 * @param date - Date object or timestamp number to format
 * @returns Human readable string like "2 hours ago" or "just now"
 * @throws Error if date is invalid
 */
export function formatTimestamp(date: Date | number): string {
  // Convert input to Date object
  const timestamp = date instanceof Date ? date : new Date(date);
  
  // Validate date
  if (isNaN(timestamp.getTime())) {
    throw new Error('Invalid date provided');
  }

  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();

  // Handle future dates
  if (diff < 0) {
    return 'in the future';
  }

  // Convert milliseconds to seconds
  const seconds = Math.floor(diff / 1000);

  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  // Handle "just now" case
  if (seconds < 30) {
    return 'just now';
  }

  // Find the appropriate interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      return `${count} ${unit}${count === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}