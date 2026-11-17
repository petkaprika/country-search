import { createHeader } from './ui/components/createHeader.js';
import { createSearchInput } from './ui/components/createSearchInput.js';
import { createResultsContainer } from './ui/components/createResultsContainer.js';
import { createCountryList } from './ui/components/createCountryList.js';
import { createStatusMessage } from './ui/components/createStatusMessage.js';
import { searchCountries } from './logic/utils/searchCountries.js';
import { mapCountryResponse } from './logic/utils/mapCountryResponse.js';
import type { RawCountry } from './logic/types/Country.js';
import { createRequestManager } from './logic/utils/requestManager.js';
import { debounce } from './logic/utils/debounce.js';
import { getSearchErrorType } from './logic/utils/getSearchErrorType.js';

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

const requestManager = createRequestManager();

const debouncedSearch = debounce((query: string) => {
  if (!query) {
    resultsList.replaceChildren();
    return;
  }

  form.requestSubmit();
}, 500);

input.addEventListener('input', () => {
  requestManager.abort();
  debouncedSearch(input.value.trim());
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    return;
  }

  resultsList.replaceChildren(createStatusMessage('Loading...'));

  try {
    const signal = requestManager.createSignal();
    const rawCountries = await searchCountries(query, signal);

    const countries = rawCountries.map((country) => mapCountryResponse(country as RawCountry));

    if (countries.length === 0) {
      resultsList.replaceChildren(createStatusMessage('No countries found'));
      return;
    }

    resultsList.replaceChildren(createCountryList(countries));
  } catch (error) {
    const errorType = getSearchErrorType(error);

    if (errorType === 'abort') {
      return;
    }

    let message = 'Something went wrong. Please try again.';

    if (errorType === 'timeout') {
      message = 'The request timed out. Please try again.';
    } else if (errorType === 'http') {
      message = 'Server error. Please try again later.';
    } else if (errorType === 'network') {
      message = 'Network error. Check your connection.';
    }

    console.error('Search error:', error);
    resultsList.replaceChildren(createStatusMessage(message));
  }
});
