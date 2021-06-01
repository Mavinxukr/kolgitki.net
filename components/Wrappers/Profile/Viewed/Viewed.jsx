import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import { getViewedProducts } from '../../../../services/product';
import styles from './Viewed.scss';
import { CardProduct } from '../../../Layout/CardProduct/CardProduct';

// const DynamicComponentWithNoSSRCard = dynamic(
//   () => import('../../../Layout/ProductCard/ProductCard'),
//   { ssr: false },
// );

const DynamicComponentWithNoSSRCardGift = dynamic(
  () => import('../../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false }
);

const Viewed = ({ viewedProducts }) => {
  const [viewedArr, setViewedArr] = useState(viewedProducts);

  useEffect(() => {
    getViewedProducts({}).then(response => setViewedArr(response.data));
  }, []);

  return (
    <div className={styles.profileViewed}>
      <h2 className={styles.title}>
        {parseText(cookies, 'Просмотренные', 'Переглянуті')}
      </h2>
      <div className={styles.cards}>
        {viewedArr.map(item => {
          const classNameForCard = cx({
            [styles.cardPresent]: item.presentsets,
            [styles.cardProduct]: item.goods
          });
          const Card = item.presentsets
            ? DynamicComponentWithNoSSRCardGift
            : CardProduct;

          return (
            <div className={classNameForCard}>
              <Card
                key={item.id}
                item={item.goods || item.presentsets}
                data={item.goods}
                // classNameWrapper={classNameForCard}
                isSimpleProduct
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Viewed.propTypes = {
  viewedProducts: PropTypes.arrayOf(PropTypes.object)
};

export default Viewed;
