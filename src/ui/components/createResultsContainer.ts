export function createResultsContainer(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'search-results';

  const heading = document.createElement('h2');
  heading.textContent = 'Search results';

  const resultsList = document.createElement('div');
  resultsList.id = 'country-list';

  section.append(heading, resultsList);

  return section;
}
