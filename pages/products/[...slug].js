import CatalogWrapper from '../../components/Wrappers/Catalog/Catalog';
import { getAllFilters, getCategoryBySlug } from '../../services/home';
import { getProductsByCategories } from '../../services/product';

export default CatalogWrapper;

CatalogWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      goods: null,
      category: null,
      filters: {},
      filterListFromCategory: null
    };
  }

  const { slug } = query;
  const filters = { ...query };
  delete filters.slug;

  const filtersForResponse = {};
  Object.keys(filters).map(filter => {
    if (filter === 'dencity' || filter === 'materials') {
      filtersForResponse.attribute = `${filters[filter]}${
        filtersForResponse.hasOwnProperty('attribute')
          ? '|' + filtersForResponse.attribute
          : ''
      }`;
    } else {
      filtersForResponse[filter] = filters[filter];
    }
  });

  const responseCategory = await getCategoryBySlug(slug[slug.length - 1]);
  const category = await responseCategory.data;

  const responseCatalog = await getProductsByCategories(
    {},
    {
      ...filtersForResponse,
      categories: JSON.stringify([category.id])
    }
  );

  const goods = responseCatalog.status ? responseCatalog.data : null;

  const responseAllFilters = await getAllFilters({
    category_id: category.id
  });
  const filterListFromCategory = responseAllFilters.status
    ? responseAllFilters.data
    : null;

  return {
    goods,
    category,
    filters,
    filterListFromCategory
  };
};
