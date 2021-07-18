export const replaceFilters = usedFilters => {
    let filtersForRequest = {};

    Object.keys(usedFilters).forEach(key => {
      switch (key) {
        case 'categories':
          filtersForRequest.category = usedFilters[key]
            .map(item => item.id)
            .join(',');
          break;
        case 'brands':
          filtersForRequest.brands = usedFilters[key]
            .map(item => item.name)
            .join(',');
          break;
        case 'colors':
          filtersForRequest.colors = usedFilters[key]
            .map(item => item.slug)
            .join(',');
          break;
        case 'sizes':
          filtersForRequest.sizes = usedFilters[key]
            .map(item => item.id)
            .join(',');
          break;
        case 'materials':
          filtersForRequest.attribute = filtersForRequest.hasOwnProperty(
            'attribute'
          )
            ? filtersForRequest.attribute +
              usedFilters[key].map(item => item.slug).join(',')
            : usedFilters[key].map(item => item.slug).join(',');
          break;
        case 'density':
          filtersForRequest.attribute = filtersForRequest.hasOwnProperty(
            'attribute'
          )
            ? filtersForRequest.attribute +
              usedFilters[key].map(item => item.slug).join(',')
            : usedFilters[key].map(item => item.slug).join(',');
          break;
      }
    });
    return filtersForRequest;
  };