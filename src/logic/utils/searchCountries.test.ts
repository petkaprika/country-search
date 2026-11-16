import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { searchCountries } from './searchCountries.js';

const originalFetch = globalThis.fetch;

describe('searchCountries', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  test('should return country data when the request is successful', async () => {
    const controller = new AbortController();

    const mockCountries = [
      {
        name: {
          common: 'Belarus',
          official: 'Republic of Belarus',
        },
        capital: ['Minsk'],
        region: 'Europe',
        population: 9200000,
        languages: {
          bel: 'Belarusian',
          rus: 'Russian',
        },
        flags: {
          png: 'https://example.com/belarus.png',
          svg: 'https://example.com/belarus.svg',
        },
      },
    ];

    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn<() => Promise<unknown>>().mockResolvedValue(mockCountries),
    } as unknown as Response;

    const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(mockResponse);

    globalThis.fetch = mockFetch;

    const result = await searchCountries('Belarus', controller.signal);

    expect(mockFetch).toHaveBeenCalledWith('https://countries.dev/name/Belarus', {
      signal: controller.signal,
    });
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCountries);
  });

  test('should return an empty array when the server responds with 404', async () => {
    const controller = new AbortController();

    const mockResponse = {
      ok: false,
      status: 404,
      json: jest.fn(),
    } as unknown as Response;

    const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(mockResponse);

    globalThis.fetch = mockFetch;

    const result = await searchCountries('Atlantis', controller.signal);

    expect(result).toEqual([]);
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  test('should throw an HttpError when the server responds with a 500 status', async () => {
    const controller = new AbortController();

    const mockResponse = {
      ok: false,
      status: 500,
    } as unknown as Response;

    const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(mockResponse);

    globalThis.fetch = mockFetch;

    await expect(searchCountries('Belarus', controller.signal)).rejects.toMatchObject({
      name: 'HttpError',
      status: 500,
    });
  });

  test('should throw an HttpError with the correct status for other unsuccessful responses', async () => {
    const controller = new AbortController();

    const mockResponse = {
      ok: false,
      status: 403,
    } as unknown as Response;

    const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(mockResponse);

    globalThis.fetch = mockFetch;

    await expect(searchCountries('Belarus', controller.signal)).rejects.toMatchObject({
      name: 'HttpError',
      status: 403,
    });
  });
});
