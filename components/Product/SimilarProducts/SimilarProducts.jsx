import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import styles from './SimilarProducts.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);


const SimilarProducts = () => (
  <div className={styles.similarProducts}>
    <h2 className={styles.title}>Похожие товары</h2>
    <div className={styles.rowContent}>
      {
        arrProducts.map(item => (
          <div className={styles.card} key={item.id}>
            <DynamicComponentWithNoSSRSlider item={item} />
          </div>
        ))
      }
    </div>
  </div>
);

export default SimilarProducts;
