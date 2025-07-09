/**
 * Formats a timestamp into a human-readable string
 * @param date - Date object or timestamp number to format
 * @returns A human-readable string like "2 hours ago" or "just now"
 * @throws {Error} If the input date is invalid
 */
export function formatTimestamp(date: Date | number): string {
  try {
    const inputDate = date instanceof Date ? date : new Date(date);
    
    if (isNaN(inputDate.getTime())) {
      throw new Error('Invalid date provided');
    }

    const now = new Date();
    const diffMs = now.getTime() - inputDate.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Handle future dates
    if (diffMs < 0) {
      return 'in the future';
    }

    // Return appropriate time difference
    if (diffSecs < 30) {
      return 'just now';
    } else if (diffSecs < 60) {
      return `${diffSecs} seconds ago`;
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to format timestamp');
  }
}