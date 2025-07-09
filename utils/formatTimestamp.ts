/**
 * Formats a timestamp into a human-readable string (e.g., "2 hours ago")
 * @param date - The date to format (can be Date object or timestamp number)
 * @returns A human-readable string representing the time difference
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

    // Format based on time difference
    if (diffSecs < 30) {
      return 'just now';
    } else if (diffSecs < 60) {
      return `${diffSecs} seconds ago`;
    } else if (diffMins < 60) {
      return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error formatting timestamp');
  }
}