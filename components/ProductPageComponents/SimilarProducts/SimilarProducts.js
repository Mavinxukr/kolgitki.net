import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import Styles from './SimilarProducts.module.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);


const SimilarProducts = () => (
  <div className={Styles.SimilarProducts}>
    <h2 className={Styles.SimilarProducts__Title}>Похожие товары</h2>
    <div className={Styles.SimilarProducts__RowContent}>
      {
        arrProducts.map(item => (
          <div className={Styles.SimilarProducts__Card} key={item.id}>
            <DynamicComponentWithNoSSRSlider item={item} />
          </div>
        ))
      }
    </div>
  </div>
);

export default SimilarProducts;
