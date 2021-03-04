import { useState, useCallback, useEffect } from 'react';

export const useProducts = () => {
  const [productsFilters, setProductsFilters] = useState({
    sort_date: 'desc'
  });

  const loadProductsFilters = useCallback(filters => {
    setProductsFilters(filters);
  });

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('productsFilter'));
    if (ls) {
      loadProductsFilters(ls);
    }
  }, []);

<<<<<<< HEAD
=======
  useEffect(() => {
  }, [productsFilters]);

>>>>>>> 3d2e9593ae621ca2225800f670d51de76b36cd69
  const addProductsFilter = useCallback((filterGroupName, value) => {
    setProductsFilters(prev => {
      const next = {
        ...prev,
        [filterGroupName]: value
      };
      localStorage.setItem('productsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeProductsFilter = useCallback((filterGroupName, filterItem) => {
    setProductsFilters(prev => {
      const next = { ...prev };
      const arrFiltred = JSON.parse(next[filterGroupName]).filter(
        item => item.id !== filterItem.id
      );
      arrFiltred.length === 0
        ? delete next[filterGroupName]
        : (next[filterGroupName] = JSON.stringify(arrFiltred));
      localStorage.setItem('productsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const setProductsSorting = useCallback((addFilter, value) => {
    setProductsFilters(prev => {
      const next = { ...prev };
      delete next?.sort_popular;
      delete next?.sort_price;
      delete next?.sort_date;
      next[addFilter] = value;

      localStorage.setItem('productsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearProductsFilters = useCallback(list => {
    setProductsFilters(prev => {
      const next = { ...prev };
      list.map(filterGroupName => {
        if (next.hasOwnProperty(filterGroupName)) {
          delete next[filterGroupName];
        }
      });
      localStorage.setItem('productsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const setPage = useCallback(number => {
    setProductsFilters(prev => {
      const next = { ...prev };
      next.page = number;
      localStorage.setItem('productsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    productsFilters,
    addProductsFilter,
    clearProductsFilters,
    removeProductsFilter,
    setProductsSorting,
    setPage
  };
};
