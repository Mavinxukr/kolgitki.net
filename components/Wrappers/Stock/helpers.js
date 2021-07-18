export const replaceFilters = usedFilters => {
    let filtersForRequest = {};

    Object.keys(usedFilters).forEach(key => {
      switch (key) {
        case 'categories':
            filtersForRequest.categories = JSON.stringify(usedFilters[key].map(item => item.id));
          break;
          case 'brands':
            filtersForRequest.brands = JSON.stringify(usedFilters[key].map(item => item.id));
            break;
          case 'colors':
            filtersForRequest.colors = JSON.stringify(usedFilters[key].map(item => item.id));
            break;
          case 'sizes':
            filtersForRequest.sizes = JSON.stringify(usedFilters[key].map(item => item.id));
            break;
          case 'materials':
            filtersForRequest.attribute = filtersForRequest.hasOwnProperty('attribute') ? [...filtersForRequest.attribute, ...usedFilters[key].map(item => item.id)] : [...usedFilters[key].map(item => item.id)];
            break;
          case 'density':
            filtersForRequest.attribute = filtersForRequest.hasOwnProperty('attribute') ? [...filtersForRequest.attribute, ...usedFilters[key].map(item => item.id)] : [...usedFilters[key].map(item => item.id)];
            break;
    }})
    filtersForRequest.attribute = JSON.stringify(filtersForRequest.attribute)

    return filtersForRequest;
  }