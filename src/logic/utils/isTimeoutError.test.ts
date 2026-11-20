import { describe, expect, test } from '@jest/globals';
import { isTimeoutError } from './isTimeoutError.js';

describe('isTimeoutError', () => {
  test('should return true for TimeoutError', () => {
    const error = new DOMException('The operation timed out', 'TimeoutError');

    expect(isTimeoutError(error)).toBe(true);
  });

  test('should return false for AbortError', () => {
    const error = new DOMException('The operation was aborted', 'AbortError');

    expect(isTimeoutError(error)).toBe(false);
  });
});
