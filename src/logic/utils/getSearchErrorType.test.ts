import { describe, expect, test } from '@jest/globals';
import { HttpError } from '../api/HttpError.js';
import { getSearchErrorType } from './getSearchErrorType.js';

describe('getSearchErrorType', () => {
  test('should return abort for AbortError', () => {
    const error = new DOMException('The operation was aborted', 'AbortError');

    expect(getSearchErrorType(error)).toBe('abort');
  });

  test('should return timeout for TimeoutError', () => {
    const error = new DOMException('The operation timed out', 'TimeoutError');

    expect(getSearchErrorType(error)).toBe('timeout');
  });

  test('should return http for HttpError', () => {
    const error = new HttpError(500);

    expect(getSearchErrorType(error)).toBe('http');
  });

  test('should return network for other errors', () => {
    const error = new Error('Network error');

    expect(getSearchErrorType(error)).toBe('network');
  });
});
