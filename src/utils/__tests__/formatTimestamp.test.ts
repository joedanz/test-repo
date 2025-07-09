import { formatTimestamp } from '../formatTimestamp';

describe('formatTimestamp', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-07-09T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('handles just now', () => {
    const date = new Date('2025-07-09T11:59:45Z');
    expect(formatTimestamp(date)).toBe('just now');
  });

  it('handles minutes ago', () => {
    const date = new Date('2025-07-09T11:58:00Z');
    expect(formatTimestamp(date)).toBe('2 minutes ago');
  });

  it('handles single minute', () => {
    const date = new Date('2025-07-09T11:59:00Z');
    expect(formatTimestamp(date)).toBe('1 minute ago');
  });

  it('handles hours ago', () => {
    const date = new Date('2025-07-09T09:00:00Z');
    expect(formatTimestamp(date)).toBe('3 hours ago');
  });

  it('handles days ago', () => {
    const date = new Date('2025-07-06T12:00:00Z');
    expect(formatTimestamp(date)).toBe('3 days ago');
  });

  it('handles months ago', () => {
    const date = new Date('2025-04-09T12:00:00Z');
    expect(formatTimestamp(date)).toBe('3 months ago');
  });

  it('handles years ago', () => {
    const date = new Date('2022-07-09T12:00:00Z');
    expect(formatTimestamp(date)).toBe('3 years ago');
  });

  it('handles timestamp numbers', () => {
    const timestamp = new Date('2025-07-09T11:58:00Z').getTime();
    expect(formatTimestamp(timestamp)).toBe('2 minutes ago');
  });

  it('handles future dates', () => {
    const date = new Date('2025-07-09T13:00:00Z');
    expect(formatTimestamp(date)).toBe('in the future');
  });

  it('throws error for invalid dates', () => {
    expect(() => formatTimestamp(new Date('invalid'))).toThrow('Invalid date');
    expect(() => formatTimestamp('invalid' as any)).toThrow('Invalid date format');
  });
});