import CatalogWrapper from '../../components/Wrappers/Catalog/Catalog';
import { replaceFilters } from '../../components/Wrappers/Catalog/helpers';
import { getAllCategories, getAllFilters, getCategoryBySlug } from '../../services/home';
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

  const filters = { ...query };
  const requestCategories = await getCategoryBySlug(filters.slug[filters.slug.length - 1]);
  const categories = await requestCategories.data;
  delete filters.slug;

  const responseAllFilters = await getAllFilters({
    category_id: categories.id
  });
  const filterListFromCategory = responseAllFilters.status
    ? responseAllFilters.data
    : null;

  let allFilters = replaceFilter(filterListFromCategory)
  allFilters.materials = allFilters.attributes[0].value
  allFilters.density = allFilters.attributes[1].value
  delete allFilters.attributes

  const usedFilters = buildFiltersBySlug(filters, allFilters)

  const otherFilters = {...filters}
  delete otherFilters.colors;
  delete otherFilters.sizes;
  delete otherFilters.brands;
  delete otherFilters.density;
  delete otherFilters.materials;

  let filtersForRequest = replaceFilters({...usedFilters})
  filtersForRequest.categories = JSON.stringify([categories.id])


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
    categoryData: categories,
    otherFilters,
    goods,
    allCategories
  };
};
