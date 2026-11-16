import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { searchCountriesWithTimeout } from './searchCountriesWithTimeout.js';

const originalFetch = globalThis.fetch;
const originalTimeout = AbortSignal.timeout;

describe('searchCountriesWithTimeout', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();

    Object.defineProperty(AbortSignal, 'timeout', {
      configurable: true,
      value: originalTimeout,
    });
  });

  test('should abort request when the input signal is aborted', async () => {
    const controller = new AbortController();

    const mockFetch = jest.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;

          signal?.addEventListener('abort', () => reject(signal.reason), { once: true });
        }),
    );

    globalThis.fetch = mockFetch;

    const request = searchCountriesWithTimeout('Belarus', controller.signal, 5000);

    controller.abort(new DOMException('Request aborted', 'AbortError'));

    await expect(request).rejects.toMatchObject({
      name: 'AbortError',
    });
  });

  test('should abort request when the timeout signal is aborted', async () => {
    const inputController = new AbortController();
    const timeoutController = new AbortController();

    Object.defineProperty(AbortSignal, 'timeout', {
      configurable: true,
      value: jest.fn(() => timeoutController.signal),
    });

    const mockFetch = jest.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;

          signal?.addEventListener('abort', () => reject(signal.reason), { once: true });
        }),
    );

    globalThis.fetch = mockFetch;

    const request = searchCountriesWithTimeout('Belarus', inputController.signal, 5000);

    timeoutController.abort(new DOMException('The operation timed out', 'TimeoutError'));

    await expect(request).rejects.toMatchObject({
      name: 'TimeoutError',
    });
  });
});
