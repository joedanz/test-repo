/**
 * Formats a timestamp into a human-readable string (e.g., "2 hours ago")
 * @param date - Date object or timestamp number to format
 * @returns Formatted string representing time elapsed
 * @throws {Error} If the input date is invalid
 */
export function formatTimestamp(date: Date | number): string {
  try {
    const inputDate = date instanceof Date ? date : new Date(date);
    if (isNaN(inputDate.getTime())) {
      throw new Error('Invalid date');
    }

    const now = new Date();
    const diffMs = now.getTime() - inputDate.getTime();

    // Handle future dates
    if (diffMs < 0) {
      return 'in the future';
    }

    // Convert to seconds
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 30) return 'just now';
    if (diffSec < 60) return `${diffSec} seconds ago`;

    // Convert to minutes
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;

    // Convert to hours
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

    // Convert to days
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

    // Convert to months
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;

    // Convert to years
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid date') {
      throw error;
    }
    throw new Error('Invalid date format');
  }
}