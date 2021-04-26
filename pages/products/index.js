import CatalogWrapper from '../../components/Wrappers/Catalog/Catalog';
import { getAllFilters } from '../../services/home';
import { getProductsByCategories } from '../../services/product';

export default CatalogWrapper;

CatalogWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      goods: null,
      filters: {},
      filterListFromCategory: null
    };
  }

  const filters = { ...query };

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

  const responseCatalog = await getProductsByCategories(
    {},
    {
      ...filtersForResponse
    }
  );
  const goods = responseCatalog.status ? responseCatalog.data : null;

  const responseAllFilters = await getAllFilters({
    category_id: 0
  });
  const filterListFromCategory = responseAllFilters.status
    ? responseAllFilters.data
    : null;

  return {
    goods,
    filters,
    filterListFromCategory
  };
};
