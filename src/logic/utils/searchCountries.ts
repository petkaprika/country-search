import { HttpError } from '../api/HttpError.js';

export async function searchCountries(query: string, signal: AbortSignal): Promise<unknown[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;

  const response = await fetch(url, { signal });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }
  const data = await response.json();
  return data;
}
