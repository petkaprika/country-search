import { describe, expect, test } from '@jest/globals';
import { isAbortError } from './isAbortError.js';

describe('isAbortError', () => {
  test('should return true for AbortError', () => {
    const error = new DOMException('The operation was aborted', 'AbortError');

    expect(isAbortError(error)).toBe(true);
  });

  test('should return false for TimeoutError', () => {
    const error = new DOMException('The operation timed out', 'TimeoutError');

    expect(isAbortError(error)).toBe(false);
  });
});
