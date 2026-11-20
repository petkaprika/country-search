import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { searchCountries } from './searchCountries.js';
import { createRequestManager } from './requestManager.js';

const originalFetch = globalThis.fetch;

describe('requestManager', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  test('should abort the previous request when a new request starts', async () => {
    const manager = createRequestManager();

    const mockFetch = jest.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;

          if (signal?.aborted) {
            reject(new DOMException('Request aborted', 'AbortError'));
            return;
          }

          signal?.addEventListener(
            'abort',
            () => reject(new DOMException('Request aborted', 'AbortError')),
            { once: true },
          );
        }),
    );

    globalThis.fetch = mockFetch;

    const firstRequest = searchCountries('Bel', manager.createSignal());

    manager.createSignal();

    await expect(firstRequest).rejects.toMatchObject({
      name: 'AbortError',
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
