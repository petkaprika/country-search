import { HttpError } from '../api/HttpError.js';
import { isAbortError } from './isAbortError.js';
import { isTimeoutError } from './isTimeoutError.js';

export function getSearchErrorType(error: unknown): 'abort' | 'timeout' | 'http' | 'network' {
  if (isAbortError(error)) {
    return 'abort';
  }

  if (isTimeoutError(error)) {
    return 'timeout';
  }

  if (error instanceof HttpError) {
    return 'http';
  }

  return 'network';
}
