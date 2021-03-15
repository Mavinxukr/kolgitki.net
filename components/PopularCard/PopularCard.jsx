import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './PopularCard.scss';
import {
  setFiltersInCookies,
  parseText,
  createCleanUrl
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';

const CategoriesCard = ({ item, isDesktopScreen }) => {
  // const crumbs = crumbs_object.map(item => ({
  //   id: item.id,
  //   name: item.slug,
  //   categoryName: parseText(cookies, item.name, item.name_ua)
  // }));

  // const redirectToProducts = () => {
  //   setFiltersInCookies(cookies, {
  //     categories: crumbs
  //   });
  //   router.push('/products', `/products/${createCleanUrl(cookies).join('/')}`);
  // };

  return (
    <article className={styles.card}>
      <a href={`/products/${item.crumbs}`}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={item.image_link}
            alt={item.image_link}
          />
        </div>
      </a>
      <a href={`/products/${item.crumbs}`}>
        <h3 className={styles.cardTitle}>
          {parseText(cookies, item.name, item.name_ua)}
        </h3>
      </a>
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
