import BrandsWrapper from '../../components/Wrappers/Brands/Brands';
import { getBrandsData } from '../../services/brands';

BrandsWrapper.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {
      brands: [],
      filters: {}
    };
  }

  const filters = {};

  if (query.hasOwnProperty('char')) {
    filters.char = query.char;
  }
  const responseBrands = await getBrandsData(filters);
  const brands = (await responseBrands.status) ? responseBrands.data : null;

  return {
    brands,
    filters
  };
};

export default BrandsWrapper;
