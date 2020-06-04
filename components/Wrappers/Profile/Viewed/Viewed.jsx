import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { getViewedProducts } from '../../../../services/product';
import styles from './Viewed.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const DynamicComponentWithNoSSRCardGift = dynamic(
  () => import('../../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false },
);

const Viewed = ({ viewedProducts }) => {
  const [viewedArr, setViewedArr] = useState(viewedProducts);

  useEffect(() => {
    getViewedProducts({}).then(response => setViewedArr(response.data));
  }, []);

  return (
    <div className={styles.profileViewed}>
      <h2 className={styles.title}>Просмотренные</h2>
      <div className={styles.cards}>
        {viewedArr.map((item) => {
          const classNameForCard = cx({
            [styles.cardPresent]: item.presentsets,
            [styles.cardProduct]: item.goods,
            [styles.cardProductWithAddPrice]: item.goods && item.goods.price_for_3,
          });
          const Card = item.presentsets ? DynamicComponentWithNoSSRCardGift : DynamicComponentWithNoSSRCard;

          return (
            <Card
              key={item.id}
              item={item.goods || item.presentsets}
              classNameWrapper={classNameForCard}
            />
          );
        })}
      </div>
    </div>
  );
};

Viewed.propTypes = {
  viewedProducts: PropTypes.arrayOf(PropTypes.object),
};

export default Viewed;
