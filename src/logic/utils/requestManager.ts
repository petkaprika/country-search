export function createRequestManager() {
  let controller: AbortController | null = null;

  return {
    createSignal(): AbortSignal {
      controller?.abort();

      controller = new AbortController();

      return controller.signal;
    },
  };
}
