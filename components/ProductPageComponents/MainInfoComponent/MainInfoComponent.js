import React from 'react';
import dynamic from 'next/dynamic';
import ProductDetails from '../ProductDetails/ProductDetails';
import Styles from './MainInfoComponent.module.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../ProductSlider/ProductSlider'),
  { ssr: false },
);


const MainInfoComponent = () => (
  <div className={Styles.MainInfoComponent}>
    <div className={Styles.MainInfoComponent__Wrapper}>
      <DynamicComponentWithNoSSRSlider />
      <ProductDetails />
    </div>
  </div>
);

export default MainInfoComponent;
