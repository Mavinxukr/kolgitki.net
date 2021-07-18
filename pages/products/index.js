import CatalogWrapper from '../../components/Wrappers/Catalog/Catalog';
import { replaceFilters } from '../../components/Wrappers/Catalog/helpers';
import { getAllCategories, getAllFilters } from '../../services/home';
import { getProductsByCategories } from '../../services/product';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';

export default CatalogWrapper;

CatalogWrapper.getInitialProps = async ({ query, req }) => {
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


  const responseAllFilters = await getAllFilters({
    category_id: 0
  });
  const filterListFromCategory = responseAllFilters.status
    ? responseAllFilters.data
    : null;

  let allFilters = replaceFilter(filterListFromCategory)
  allFilters.materials = allFilters.attributes[0].value
  allFilters.density = allFilters.attributes[1].value
  delete allFilters.attributes


  const filters = { ...query };
  const usedFilters = buildFiltersBySlug(filters, allFilters)

  const otherFilters = {...filters}
  delete otherFilters.colors;
  delete otherFilters.sizes;
  delete otherFilters.brands;
  delete otherFilters.density;
  delete otherFilters.materials;

  let filtersForRequest = replaceFilters(usedFilters)


  const responseCatalog = await getProductsByCategories(
    {},
    {
      ...filtersForRequest,
      ...otherFilters
    }
  );
  const goods = responseCatalog.status ? responseCatalog.data : null;

  return {
    allFilters,
    usedFilters,
    categoryData: null,
    otherFilters,
    goods,
    allCategories
  };
};
