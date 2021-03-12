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

const CategoriesCard = ({
  item: { image_link, name, name_ua, id, slug, min_price, crumbs_object },
  isDesktopScreen,
  router
}) => {
  const crumbs = crumbs_object.map(item => ({
    id: item.id,
    name: item.slug,
    categoryName: parseText(cookies, item.name, item.name_ua)
  }));

  const redirectToProducts = () => {
    setFiltersInCookies(cookies, {
      categories: crumbs
    });
    router.push('/products', `/products/${createCleanUrl(cookies).join('/')}`);
  };

  return (
    <article className={styles.card}>
      <a onClick={() => redirectToProducts()}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image_link} alt={image_link} />
        </div>
      </a>
      <a onClick={() => redirectToProducts()}>
        <h3 className={styles.cardTitle}>
          {parseText(cookies, name, name_ua)}
        </h3>
      </a>
      {isDesktopScreen && <p className={styles.price}>от {min_price} грн</p>}
    </article>
  );
};

CategoriesCard.propTypes = {
  item: PropTypes.shape({
    image_link: PropTypes.string,
    name: PropTypes.string,
    name_ua: PropTypes.string,
    min_price: PropTypes.number,
    id: PropTypes.number,
    slug: PropTypes.string
  }),
  isDesktopScreen: PropTypes.bool,
  router: PropTypes.object
};

export default withResponse(CategoriesCard);
