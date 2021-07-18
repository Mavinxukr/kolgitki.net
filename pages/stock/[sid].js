import { replaceFilters } from '../../components/Wrappers/Stock/helpers';
import StockWrapper from '../../components/Wrappers/Stock/Stock';
import { getStock } from '../../services/stocks';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';

StockWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      action: null,
      usedFilters: {},
      otherFilters: {},
      cagegoryData: {},
      allFilters: null,
    };
  }
  const response = await getStock({}, query.sid);
  const data = (await response.status) ? response.data : null;

  let allFilters = {}

  if(data){
    //format all filters
    allFilters = replaceFilter(data.filters)
    allFilters.materials = allFilters.attributes[0].value
    allFilters.density = allFilters.attributes[1].value
    delete allFilters.attributes
  }

    //get slugs in query
    const filters = { ...query };
    delete filters.sid;

    let categoryData = [];

    if(filters.hasOwnProperty('categories')){
      const categoryName = filters.categories;
      if(allFilters.hasOwnProperty('categories')) {
        categoryData = [...allFilters.categories.filter(category =>  category.crumbs === categoryName)]
      }
      delete filters.categories;
    }


    //build filters from slugs
  const usedFilters = buildFiltersBySlug(filters, allFilters);
  
  const otherFilters = {...filters}
  delete otherFilters.categories;
  delete otherFilters.colors;
  delete otherFilters.sizes;
  delete otherFilters.brands;
  delete otherFilters.density;
  delete otherFilters.materials;

  let filtersForRequest = replaceFilters(usedFilters)

  if(categoryData){
    filtersForRequest.category = JSON.stringify(categoryData.map(item => item.id));
  } 

  const responseByFilter = await getStock(filtersForRequest, query.sid);
  let action = responseByFilter.data;

  return {
    allFilters,
    action,
    usedFilters,
    otherFilters,
    categoryData
  };
};

export default StockWrapper;
