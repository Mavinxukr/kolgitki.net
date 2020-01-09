import BrandsWrapper from '../components/Wrappers/Brands/Brands';

import getBrandsRequest from '../services/brands';

BrandsWrapper.getInitialProps = async () => {
  const brandsData = await getBrandsRequest({});

  return {
    brandsData: brandsData.data,
  };
};

export default BrandsWrapper;
