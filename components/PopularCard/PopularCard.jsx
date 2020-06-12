import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './PopularCard.scss';
import { getCorrectPrice, setFiltersInCookies } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';

const CategoriesCard = ({
  item: {
    image_link, name, id, slug, min_price,
  },
  isDesktopScreen,
}) => {
  const redirectToProducts = () => {
    setFiltersInCookies(cookies, {
      categories: [
        {
          id,
          name: slug,
          categoryName: name,
        },
      ],
    });
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link href="/Products" as={`/Products_${slug}`}>
          <a onClick={() => redirectToProducts()}>
            <img className={styles.image} src={image_link} alt={image_link} />
          </a>
        </Link>
      </div>
      <Link href="/Products" as={`/Products_${slug}`}>
        <a onClick={() => redirectToProducts()}>
          <h3 className={styles.cardTitle}>{name}</h3>
        </a>
      </Link>
      {isDesktopScreen && (
        <p className={styles.price}>от {getCorrectPrice(min_price)} грн.</p>
      )}
    </article>
  );
};

CategoriesCard.propTypes = {
  item: PropTypes.shape({
    image_link: PropTypes.string,
    name: PropTypes.string,
    min_price: PropTypes.number,
    id: PropTypes.number,
    slug: PropTypes.string,
  }),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(CategoriesCard);
