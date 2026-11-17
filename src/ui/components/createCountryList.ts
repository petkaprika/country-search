import type { CountryCard } from '../../logic/types/Country.js';
import { createCountryCard } from './createCountryCard.js';

export function createCountryList(countries: CountryCard[]): HTMLElement {
  const list = document.createElement('div');
  list.id = 'country-list';

  countries.forEach((country) => {
    const card = createCountryCard(country);
    list.append(card);
  });

  return list;
}
