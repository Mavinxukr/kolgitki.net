import { createContext } from 'react';
function noop() {}

export const GiftContext = createContext({
  giftFilters: { gifts: {} },
  addGiftFilter: noop
  // addFilter: noop,
  // clearFilters: noop,
  // removeFilter: noop,
  // setSorting: noop
});
