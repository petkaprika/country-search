import type { CountryCard } from '../../logic/types/Country.js';

export function createCountryCard(country: CountryCard): HTMLElement {
  const article = document.createElement('article');
  article.className = 'country-card';

  const flag = document.createElement('p');
  flag.className = 'country-card__flag';
  flag.textContent = country.flag;

  const name = document.createElement('h3');
  name.className = 'country-card__name';
  name.textContent = country.name;

  const capital = document.createElement('p');
  capital.textContent = `Capital: ${country.capital}`;

  const region = document.createElement('p');
  region.textContent = `Region: ${country.region}`;

  const population = document.createElement('p');
  population.textContent = `Population: ${country.population.toLocaleString()}`;

  const languages = document.createElement('p');
  languages.textContent = `Languages: ${country.languages.join(', ')}`;

  article.append(flag, name, capital, region, population, languages);

  return article;
}
