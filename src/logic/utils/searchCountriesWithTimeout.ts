import { searchCountries } from './searchCountries.js';

export async function searchCountriesWithTimeout(
  query: string,
  signal: AbortSignal,
  timeoutMs: number,
): Promise<unknown[]> {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);

  const combinedSignal = AbortSignal.any([signal, timeoutSignal]);

  return searchCountries(query, combinedSignal);
}
