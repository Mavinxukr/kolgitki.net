import { useState, useCallback, useEffect } from 'react';

export const useGift = () => {
  const [giftFilters, setGiftFilters] = useState({ sort_popular: 'desc' });

  const loadGiftFilters = useCallback(filters => {
    setGiftFilters(filters);
  });

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('giftFilter'));
    if (ls) {
      loadGiftFilters(ls);
    }
  }, []);

  const addGiftFilter = useCallback((filterGroupName, value) => {
    setGiftFilters(prev => {
      const next = {
        ...prev,
        [filterGroupName]: value
      };
      localStorage.setItem('giftFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeGiftFilter = useCallback((filterGroupName, filterItem) => {
    setGiftFilters(prev => {
      const next = { ...prev };
      const arrFiltred = JSON.parse(next[filterGroupName]).filter(
        item => item.id !== filterItem.id
      );
      arrFiltred.length === 0
        ? delete next[filterGroupName]
        : (next[filterGroupName] = JSON.stringify(arrFiltred));
      localStorage.setItem('giftFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const setGiftSorting = useCallback((addFilter, value) => {
    setGiftFilters(prev => {
      const next = { ...prev };

      delete next?.sort_popular;
      delete next?.sort_price;
      delete next?.sort_date;

      next[addFilter] = value;

      localStorage.setItem('giftFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearGiftFilters = useCallback(list => {
    setGiftFilters(prev => {
      const next = { ...prev };
      list.map(filterGroupName => {
        delete next[filterGroupName];
      });
      // delete next?.sort_price;
      // delete next?.sort_date;
      // delete next?.sort_popular;
      // next.sort_popular = 'desc';
      localStorage.setItem('giftFilter', JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    giftFilters,
    addGiftFilter,
    clearGiftFilters,
    removeGiftFilter,
    setGiftSorting
  };
};
