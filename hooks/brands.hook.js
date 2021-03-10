import { useState, useCallback, useEffect } from 'react';

export const useBrands = () => {
  const [brandsFilters, setBrandsFilters] = useState({
    sort_date: 'desc'
  });

  const loadBrandsFilters = useCallback(filters => {
    setBrandsFilters(filters);
  });

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('brandsFilter'));
    if (ls) {
      loadBrandsFilters(ls);
    }
  }, []);

  const addBrandsFilter = useCallback((filterGroupName, value) => {
    setBrandsFilters(prev => {
      const next = {
        ...prev,
        [filterGroupName]: value
      };
      localStorage.setItem('brandsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeBrandsFilter = useCallback((filterGroupName, filterItem) => {
    setBrandsFilters(prev => {
      const next = { ...prev };
      const arrFiltred = JSON.parse(next[filterGroupName]).filter(
        item => item.id !== filterItem.id
      );
      arrFiltred.length === 0
        ? delete next[filterGroupName]
        : (next[filterGroupName] = JSON.stringify(arrFiltred));
      localStorage.setItem('brandsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const setBrandsSorting = useCallback((addFilter, value) => {
    setBrandsFilters(prev => {
      const next = { ...prev };
      delete next?.sort_popular;
      delete next?.sort_price;
      delete next?.sort_date;
      next[addFilter] = value;

      localStorage.setItem('brandsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearBrandsFilters = useCallback(list => {
    setBrandsFilters(prev => {
      const next = { ...prev };
      list.map(filterGroupName => {
        if (next.hasOwnProperty(filterGroupName)) {
          delete next[filterGroupName];
        }
      });
      localStorage.setItem('brandsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const setBrandsPage = useCallback(number => {
    setBrandsFilters(prev => {
      const next = { ...prev };
      next.page = number;
      localStorage.setItem('brandsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    brandsFilters,
    addBrandsFilter,
    clearBrandsFilters,
    removeBrandsFilter,
    setBrandsSorting,
    setBrandsPage
  };
};
