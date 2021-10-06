export const removeOneFilter = (state, filter_name, value) => {
  state(prev => {
    const next = { ...prev };
    const list = next[filter_name].split('|');
    next[filter_name] = list.filter_name(item => item !== value).join('|');
    if (next[filter_name] === '') {
      delete next[filter_name];
    }
    return next;
  });
};

export const removeUnnecessaryFilters = (allFilters, filterList) => {
  const filters = {};
  filterList.forEach(item => {
    if (allFilters.hasOwnProperty(item)) {
      filters[item] = allFilters[item];
    }
  });
  return filters;
};

export const importFiltersInQuery = (filters, otherFilters, router) => {
  console.log(filters);
  let query = '';
  Object.keys(filters).forEach(
    f =>
      (query += filters[f]
        ? `${f}=${filters[f].map(item => item.slug || item.crumbs)}&`
        : '')
  );

  if (otherFilters) {
    Object.keys(otherFilters).map(
      of => (query += `${of}=${otherFilters[of]}&`)
    );
  }
  query = query.slice(0, -1);

  router.push(`${router.asPath.split('?')[0]}?${query}`);
};


export const buildFiltersBySlug = (filters, allFilters) => {
  let usedFilters = {};

  Object.keys(filters).forEach(key => {
    if(allFilters.hasOwnProperty(key)){
      filters[key].split(',').map(s => {
        usedFilters[key] = usedFilters.hasOwnProperty(key) 
        ? [...usedFilters[key], ...allFilters[key].filter(filterName => filterName.slug === s || filterName.name === s )] 
        : [...allFilters[key].filter(filterName => filterName.slug === s || filterName.name === s )]
      })
    }
  })

  return usedFilters;
}

export const replaceFilter = (filterList) => {
  let replaceFilter = {}
  filterList.forEach(object => {
    replaceFilter = {...replaceFilter, ...object}
  })

  return replaceFilter;
}