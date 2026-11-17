export function createStatusMessage(message: string): HTMLElement {
  const paragraph = document.createElement('p');
  paragraph.className = 'search-status';
  paragraph.textContent = message;

  return paragraph;
}
