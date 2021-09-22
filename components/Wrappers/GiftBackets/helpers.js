export const replaceFilters = usedFilters => {
    let filtersForRequest = {};

    Object.keys(usedFilters).forEach(key => {
      switch (key) {
        case 'categories':
          filtersForRequest.category = usedFilters[key] ? JSON.stringify(usedFilters[key]
            .map(item => item.id)) : "";
          break;
        case 'tags':
            filtersForRequest.tags = JSON.stringify(usedFilters[key].map(item => item.id));
            break; 
      }
    });
    return filtersForRequest;
  };