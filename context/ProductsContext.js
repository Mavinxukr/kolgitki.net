import { createContext } from 'react';
function noop() {}

export const ProductsContext = createContext({
  productsFilters: {},
  addProductsFilter: noop,
  clearProductsFilters: noop,
  removeProductsFilter: noop,
  setProductsSorting: noop,
  setPage: noop
});
