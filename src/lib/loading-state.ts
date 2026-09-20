export const loadingEvent = 'portfolio:loading-change';

declare global {
  interface DocumentEventMap {
    'portfolio:loading-change': CustomEvent<{ active: boolean }>;
  }
}
