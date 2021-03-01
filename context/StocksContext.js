import { createContext } from 'react';
function noop() {}

export const StocksContext = createContext({
  filters: { stockFilters: {}, stocksFilters: {} },
  addFilter: noop,
  clearFilters: noop,
  removeFilter: noop,
  setSorting: noop
});
