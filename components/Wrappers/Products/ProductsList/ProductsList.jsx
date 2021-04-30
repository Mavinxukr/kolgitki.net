import dynamic from 'next/dynamic';
import React from 'react';
import styles from './ProductsList.scss';
const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../../Layout/ProductCard/ProductCard'),
  { ssr: false }
);

export const ProductsList = ({ products, userId }) => {
  return (
    <div className={styles.cards}>
      {products.map(item => (
        <DynamicComponentWithNoSSRProductCard
          key={item.id}
          classNameWrapper={styles.card}
          item={item}
          isSimpleProduct
          userDataId={userId}
        />
      ))}
    </div>
  );
};
