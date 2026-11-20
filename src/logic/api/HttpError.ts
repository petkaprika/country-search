export class HttpError extends Error {
  constructor(public status: number) {
    super(`HTTP error: ${status}`);
    this.name = 'HttpError';
  }
}