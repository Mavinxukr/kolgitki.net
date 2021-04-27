import BrandWrapper from '../../components/Wrappers/Brand/Brand';
import { getBrandById } from '../../services/brand';
import { getAllFilters } from '../../services/home';
import { getProductsByCategories } from '../../services/product';

BrandWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      filters: {},
      brandData: null,
      filterList: null,
      goods
    };
  }
  const { bid } = query;
  const filters = { ...query };
  delete filters.slug;

  const responseBrand = await getBrandById({}, bid);
  const brandData = (await responseBrand.status) ? responseBrand.data : null;

  filters.brands = brandData.name;

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

  const responseAllFilters = await getAllFilters({});
  const filterList = (await responseAllFilters.status)
    ? responseAllFilters.data
    : null;

  const responseCatalog = await getProductsByCategories(
    {},
    {
      ...filtersForResponse
    }
  );
  const goods = (await responseCatalog.status) ? responseCatalog.data : null;

  return {
    brandData,
    filterList,
    filters,
    goods
  };
};

export default BrandWrapper;
