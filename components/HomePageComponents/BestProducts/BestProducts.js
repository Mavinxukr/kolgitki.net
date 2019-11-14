import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import Styles from './BestProducts.module.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../UIComponents/BestProductCard/BestProductCard'),
  { ssr: false },
);


const BestProducts = () => (
  <div className={Styles.BestProducts}>
    <h2 className={Styles.BestProducts__Title}>Лучшее товары</h2>
    <div className={Styles.BestProducts__RowContent}>
      {
        arrProducts.map(item => <DynamicComponentWithNoSSRSlider item={item} key={item.id} />)
      }
    </div>
  </div>
);

export default BestProducts;
