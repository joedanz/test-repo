import { formatTimestamp } from './timeUtils';

describe('formatTimestamp', () => {
  let now;
  
  beforeEach(() => {
    now = new Date('2025-01-01T12:00:00Z');
    jest.useFakeTimers();
    jest.setSystemTime(now);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('handles just now', () => {
    const date = new Date(now - 30 * 1000); // 30 seconds ago
    expect(formatTimestamp(date)).toBe('just now');
  });

  test('handles minutes', () => {
    const date = new Date(now - 5 * 60 * 1000); // 5 minutes ago
    expect(formatTimestamp(date)).toBe('5 minutes ago');
  });

  test('handles single minute', () => {
    const date = new Date(now - 1 * 60 * 1000); // 1 minute ago
    expect(formatTimestamp(date)).toBe('1 minute ago');
  });

  test('handles hours', () => {
    const date = new Date(now - 5 * 60 * 60 * 1000); // 5 hours ago
    expect(formatTimestamp(date)).toBe('5 hours ago');
  });

  test('handles days', () => {
    const date = new Date(now - 5 * 24 * 60 * 60 * 1000); // 5 days ago
    expect(formatTimestamp(date)).toBe('5 days ago');
  });

  test('handles months', () => {
    const date = new Date(now - 2 * 30 * 24 * 60 * 60 * 1000); // ~2 months ago
    expect(formatTimestamp(date)).toBe('2 months ago');
  });

  test('handles years', () => {
    const date = new Date(now - 2 * 365 * 24 * 60 * 60 * 1000); // ~2 years ago
    expect(formatTimestamp(date)).toBe('2 years ago');
  });

  test('handles timestamps as numbers', () => {
    const timestamp = now.getTime() - 60 * 1000; // 1 minute ago
    expect(formatTimestamp(timestamp)).toBe('1 minute ago');
  });

  test('handles future dates', () => {
    const date = new Date(now.getTime() + 60 * 1000); // 1 minute in future
    expect(formatTimestamp(date)).toBe('in the future');
  });

  test('throws error for invalid dates', () => {
    expect(() => formatTimestamp('invalid')).toThrow('Invalid timestamp provided');
  });
});