/**
 * Formats a timestamp into a human-readable string.
 * @param timestamp - Date object or timestamp number to format
 * @returns Human-readable string representation of time difference (e.g. "2 hours ago")
 * @throws {Error} If timestamp is invalid
 */
export function formatTimestamp(timestamp: Date | number): string {
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Handle future dates
    if (diff < 0) {
      return 'in the future';
    }

    // Convert to seconds
    const seconds = Math.floor(diff / 1000);

    if (seconds < 30) {
      return 'just now';
    }

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  } catch (error) {
    throw new Error('Invalid timestamp provided');
  }
}