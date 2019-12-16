import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import Styles from './SeenProducts.module.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const SeenProducts = () => (
  <div className={Styles.SeenProducts}>
    <h2 className={Styles.SeenProducts__Title}>Просмотренные</h2>
    <div className={Styles.SeenProducts__RowContent}>
      {
        arrProducts.map(item => (
          <div key={item.id} className={Styles.SeenProducts__Card}>
            <DynamicComponentWithNoSSRSlider item={item} />
          </div>
        ))
      }
    </div>
  </div>
);

export default SeenProducts;
