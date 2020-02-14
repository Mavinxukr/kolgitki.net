import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import styles from './Viewed.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Viewed = ({ viewedProducts }) => (
  <div className={styles.profileViewed}>
    <h2 className={styles.title}>Просмотренные</h2>
    <div className={styles.cards}>
      {viewedProducts.map(item => (
        <DynamicComponentWithNoSSRCard
          key={item.id}
          item={item.goods}
          classNameWrapper={styles.card}
        />
      ))}
    </div>
  </div>
);

Viewed.propTypes = {
  viewedProducts: PropTypes.arrayOf(PropTypes.object),
};

export default Viewed;
