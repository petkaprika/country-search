export function createHeader(): HTMLElement {
  const header = document.createElement('header');

  const h1 = document.createElement('h1');
  h1.textContent = 'Country Search';

  header.append(h1);

  return header;
}
