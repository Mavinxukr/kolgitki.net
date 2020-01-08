import React from 'react';
import BrandsWrapper from '../components/Wrappers/Brands/Brands';

import getBrandsRequest from '../services/brands';

BrandsWrapper.getInitialProps = async () => {
  const data = await getBrandsRequest({});

  return {
    data
  };
};

export default BrandsWrapper;
