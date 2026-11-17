import { createHeader } from './ui/components/createHeader.js';
import { createSearchInput } from './ui/components/createSearchInput.js';
import { createResultsContainer } from './ui/components/createResultsContainer.js';

const app = document.createElement('div');
app.id = 'app';

app.append(createHeader(), createSearchInput(), createResultsContainer());

document.body.append(app);
