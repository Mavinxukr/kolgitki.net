import { useState, useCallback, useEffect } from 'react';

export const useStocks = () => {
  const [filters, setFilters] = useState({
    stockFilters: { sort_popular: 'desc' },
    stocksFilters: { category_id: null }
  });

  const loadFilters = useCallback(filters => {
    setFilters(filters);
  });

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('saleFilters'));
    if (ls) {
      loadFilters(ls);
    }
  }, []);

  const addFilter = useCallback((pageFilterName, filterGroupName, value) => {
    setFilters(prev => {
      const next = {
        ...prev,
        [pageFilterName]: { ...prev[pageFilterName], [filterGroupName]: value }
      };
      localStorage.setItem('saleFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFilter = useCallback(
    (pageFilterName, filterGroupName, filterItem) => {
      setFilters(prev => {
        const next = { ...prev };
        const arrFiltred = JSON.parse(
          next[pageFilterName][filterGroupName]
        ).filter(item => item !== filterItem);
        arrFiltred.length === 0
          ? delete next[pageFilterName][filterGroupName]
          : (next[pageFilterName][filterGroupName] = JSON.stringify(
              arrFiltred
            ));
        localStorage.setItem('saleFilters', JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const setSorting = useCallback((pageFilterName, addFilter, value) => {
    setFilters(prev => {
      const next = { ...prev };

      delete next[pageFilterName]?.sort_popular;
      delete next[pageFilterName]?.sort_price;
      delete next[pageFilterName]?.sort_date;

      next[pageFilterName][addFilter] = value;

      localStorage.setItem('saleFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearFilters = useCallback((pageFilterName, list) => {
    setFilters(prev => {
      const next = { ...prev };
      Object.keys(list).map(filterGroupName => {
        delete next[pageFilterName][filterGroupName];
      });
      delete next[pageFilterName]?.sort_price;
      delete next[pageFilterName]?.sort_date;
      delete next[pageFilterName]?.sort_popular;
      next[pageFilterName].sort_popular = 'desc';
      localStorage.setItem('saleFilters', JSON.stringify(next));
      return next;
    });
  }, []);

  return { filters, addFilter, removeFilter, setSorting, clearFilters };
};
