import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './PopularCard.scss';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';

const CategoriesCard = ({ item, isDesktopScreen }) => {
  return (
    <article className={styles.card}>
      <Link href={`/products/${item.crumbs}`}>
        <a>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={item.image_link}
              alt={item.image_link}
            />
          </div>
        </a>
      </Link>
      <Link href={`/products/${item.crumbs}`}>
        <a>
          <h3 className={styles.cardTitle}>
            {parseText(cookies, item.name, item.name_ua)}
          </h3>
        </a>
      </Link>

      {isDesktopScreen && (
        <p className={styles.price}>от {item.min_price} грн</p>
      )}
    </article>
  );
};

CategoriesCard.propTypes = {
  item: PropTypes.object,
  isDesktopScreen: PropTypes.bool
};

export default withResponse(CategoriesCard);
