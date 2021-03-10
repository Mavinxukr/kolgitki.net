import { createContext } from 'react';
function noop() {}

export const BrandsContext = createContext({
  brandFilters: {},
  addBrandFilter: noop,
  clearBrandFilters: noop,
  removeBrandFilter: noop,
  setBrandSorting: noop,
  setPage: noop
});
