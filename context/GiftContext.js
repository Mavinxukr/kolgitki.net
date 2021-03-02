import { createContext } from 'react';
function noop() {}

export const GiftContext = createContext({
  giftFilters: { gifts: {} },
  addGiftFilter: noop,
  clearGiftFilters: noop,
  removeGiftFilter: noop,
  setGiftSorting: noop
});
