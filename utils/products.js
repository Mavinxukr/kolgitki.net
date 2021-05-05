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

export const importFiltersInQuery = (filters, router) => {
  let query = '';
  Object.keys(filters).map(
    filter => (query += `${filter}=${filters[filter]}&`)
  );
  query = query.slice(0, -1);

  router.push(`${router.asPath.split('?')[0]}?${query}`);
};

export const replaceFilters = f => {
  const replaceFilters = {};
  Object.keys(f).map(filter => {
    if (filter === 'dencity' || filter === 'materials') {
      replaceFilters.attribute = `${f[filter]}${
        replaceFilters.hasOwnProperty('attribute')
          ? '|' + replaceFilters.attribute
          : ''
      }`;
    } else {
      replaceFilters[filter] = f[filter];
    }
  });
  return replaceFilters;
};
