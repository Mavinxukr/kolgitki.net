import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './PopularCard.scss';
import {
  setFiltersInCookies,
  parseText,
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';

const CategoriesCard = ({
  item: {
    image_link, name, name_ua, id, slug, min_price,
  },
  isDesktopScreen,
}) => {
  const redirectToProducts = () => {
    setFiltersInCookies(cookies, {
      categories: [
        {
          id,
          name: slug,
          categoryName: parseText(cookies, name, name_ua),
        },
      ],
    });
  };

  return (
    <article className={styles.card}>
      <Link href="/Products" as={`/Products_${slug}`}>
        <a onClick={() => redirectToProducts()}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={image_link} alt={image_link} />
          </div>
        </a>
      </Link>
      <Link href="/Products" as={`/Products_${slug}`}>
        <a onClick={() => redirectToProducts()}>
          <h3 className={styles.cardTitle}>
            {parseText(cookies, name, name_ua)}
          </h3>
        </a>
      </Link>
      {isDesktopScreen && (
        <p className={styles.price}>от {min_price} грн</p>
      )}
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
    slug: PropTypes.string,
  }),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(CategoriesCard);
