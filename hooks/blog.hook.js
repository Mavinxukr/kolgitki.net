import { useState, useCallback, useEffect } from 'react';

export const useBlogProduct = () => {
  const [blogFilters, setBlogFilters] = useState({ sort_date: 'desc' });

  const loadBlogFilters = useCallback(filters => {
    setBlogFilters(filters);
  });

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('blogFilters'));
    if (ls) {
      loadBlogFilters(ls);
    }
  }, []);

  const addBlogFilter = useCallback((filterGroupName, value) => {
    setBlogFilters(prev => {
      const next = {
        ...prev,
        [filterGroupName]: value
      };
      localStorage.setItem('blogFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeBlogFilter = useCallback((filterGroupName, filterItem) => {
    setBlogFilters(prev => {
      const next = { ...prev };
      const arrFiltred = JSON.parse(next[filterGroupName]).filter(
        item => item.id !== filterItem.id
      );
      arrFiltred.length === 0
        ? delete next[filterGroupName]
        : (next[filterGroupName] = JSON.stringify(arrFiltred));
      localStorage.setItem('blogFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  const setBlogSorting = useCallback((addFilter, value) => {
    setBlogFilters(prev => {
      const next = { ...prev };

      delete next?.sort_popular;
      delete next?.sort_price;
      delete next?.sort_date;

      next[addFilter] = value;

      localStorage.setItem('blogFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearBlogFilters = useCallback(list => {
    setBlogFilters(prev => {
      const next = { ...prev };
      list.map(filterGroupName => {
        delete next[filterGroupName];
      });
      // delete next?.sort_price;
      // delete next?.sort_date;
      // delete next?.sort_popular;
      // next.sort_popular = 'desc';
      localStorage.setItem('blogFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  const setBlogPage = useCallback(number => {
    setProductsFilters(prev => {
      const next = { ...prev };
      next.page = number;
      localStorage.setItem('productsFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    blogFilters,
    addBlogFilter,
    clearBlogFilters,
    removeBlogFilter,
    setBlogSorting,
    setBlogPage
  };
};
