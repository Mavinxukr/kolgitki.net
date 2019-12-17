import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import styles from './SeenProducts.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const SeenProducts = () => (
  <div className={styles.seenProducts}>
    <h2 className={styles.title}>Просмотренные</h2>
    <div className={styles.rowContent}>
      {
        arrProducts.map(item => (
          <div key={item.id} className={styles.card}>
            <DynamicComponentWithNoSSRSlider item={item} />
          </div>
        ))
      }
    </div>
  </div>
);

export default SeenProducts;
