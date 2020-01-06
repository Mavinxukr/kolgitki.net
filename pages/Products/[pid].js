import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSRProductWrapper = dynamic(
  () => import('../../components/Wrappers/Product/Product'),
  { ssr: false },
);

const Product = () => <DynamicComponentWithNoSSRProductWrapper />;

export default Product;
