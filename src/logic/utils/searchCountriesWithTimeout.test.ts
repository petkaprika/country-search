/**
 * @jest-environment node
 */

import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { searchCountriesWithTimeout } from './searchCountriesWithTimeout.js';

const originalFetch = globalThis.fetch;

describe('searchCountriesWithTimeout', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  test('should abort request when the input signal is aborted', async () => {
    const controller = new AbortController();

    const mockFetch = jest.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;

          if (signal?.aborted) {
            reject(signal.reason);
            return;
          }

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

    jest.spyOn(AbortSignal, 'timeout').mockReturnValue(timeoutController.signal);

    const mockFetch = jest.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;

          if (signal?.aborted) {
            reject(signal.reason);
            return;
          }

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
