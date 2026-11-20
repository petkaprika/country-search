import { describe, expect, test, jest, beforeEach, afterEach } from '@jest/globals';
import { debounce } from './debounce.js';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should not call the function immediately', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn();

    expect(fn).not.toHaveBeenCalled();
  });

  test('should call the function after the specified delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn();
    jest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should reset the timer when called again', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn();
    jest.advanceTimersByTime(300);

    debouncedFn();
    jest.advanceTimersByTime(300);

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should use arguments from the latest call', () => {
    const fn = jest.fn<(value: string) => void>();
    const debouncedFn = debounce(fn, 500);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    jest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledWith('third');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
