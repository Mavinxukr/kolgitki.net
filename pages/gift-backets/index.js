import GiftBackets from '../../components/Wrappers/GiftBackets/GiftBackets';
import { replaceFilters } from '../../components/Wrappers/GiftBackets/helpers';

import { getFilters, getPresentSetsRequest } from '../../services/gift-backets';
import { getAllCategories } from '../../services/home';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';


GiftBackets.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      allFilters: null,
      usedFilters: {},
      categoryData: null,
      otherFilters: {},
      goods: null,
      allCategories: null,
    };
  }

  const responseAllCategories = await  getAllCategories({})
  const allCategories = responseAllCategories.data

  const responseAllFilters = await getFilters({});
  const filterList = (await responseAllFilters.status)
    ? responseAllFilters.data
    : null;

  let allFilters = replaceFilter(filterList)
  
  const filters = { ...query };
  //build filters from slugs
  const usedFilters = buildFiltersBySlug(filters, allFilters)
  
  const otherFilters = {...filters}
  delete otherFilters.tags;
  
  let filtersForRequest = replaceFilters(usedFilters)

  const responseCatalog = await getPresentSetsRequest({}, { ...otherFilters,
    ...filtersForRequest, });
  const goods = (await responseCatalog.status) ? responseCatalog.data : null;


  return {
    allFilters,
    usedFilters,
    categoryData: null,
    otherFilters,
    goods,
    allCategories
  };
};

export default GiftBackets;
