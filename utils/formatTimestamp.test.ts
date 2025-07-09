import { formatTimestamp } from './formatTimestamp';

describe('formatTimestamp', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('handles "just now"', () => {
    const date = new Date('2025-01-01T11:59:45Z');
    expect(formatTimestamp(date)).toBe('just now');
  });

  it('handles minutes', () => {
    const date = new Date('2025-01-01T11:58:00Z');
    expect(formatTimestamp(date)).toBe('2 minutes ago');
  });

  it('handles single minute', () => {
    const date = new Date('2025-01-01T11:59:00Z');
    expect(formatTimestamp(date)).toBe('1 minute ago');
  });

  it('handles hours', () => {
    const date = new Date('2025-01-01T09:00:00Z');
    expect(formatTimestamp(date)).toBe('3 hours ago');
  });

  it('handles single hour', () => {
    const date = new Date('2025-01-01T11:00:00Z');
    expect(formatTimestamp(date)).toBe('1 hour ago');
  });

  it('handles days', () => {
    const date = new Date('2024-12-29T12:00:00Z');
    expect(formatTimestamp(date)).toBe('3 days ago');
  });

  it('handles single day', () => {
    const date = new Date('2024-12-31T12:00:00Z');
    expect(formatTimestamp(date)).toBe('1 day ago');
  });

  it('handles timestamp numbers', () => {
    const timestamp = new Date('2025-01-01T11:00:00Z').getTime();
    expect(formatTimestamp(timestamp)).toBe('1 hour ago');
  });

  it('handles future dates', () => {
    const date = new Date('2025-01-02T12:00:00Z');
    expect(formatTimestamp(date)).toBe('in the future');
  });

  it('throws error for invalid dates', () => {
    expect(() => formatTimestamp(new Date('invalid'))).toThrow('Invalid date provided');
  });
});