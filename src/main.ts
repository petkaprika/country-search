import { createHeader } from './ui/components/createHeader.js';
import { createSearchInput } from './ui/components/createSearchInput.js';
import { createResultsContainer } from './ui/components/createResultsContainer.js';

const app = document.createElement('div');
app.id = 'app';

const header = createHeader();
const searchSection = createSearchInput();
const resultsSection = createResultsContainer();

app.append(header, searchSection, resultsSection);
document.body.append(app);

const form = searchSection.querySelector('form');
const input = searchSection.querySelector('input');
const resultsList = resultsSection.querySelector('#country-list');

if (!form || !input || !resultsList) {
  throw new Error('Required UI elements were not found');
}

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    return;
  }

  console.log('Search query:', query);
});
