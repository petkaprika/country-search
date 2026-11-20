export function createSearchInput(): HTMLElement {
  const section = document.createElement('section');

  const form = document.createElement('form');

  const label = document.createElement('label');
  label.textContent = 'Search for a country';
  label.htmlFor = 'country-search';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'country-search';
  input.placeholder = 'Enter country name...';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Search';

  form.append(label, input, button);
  section.append(form);

  return section;
}
