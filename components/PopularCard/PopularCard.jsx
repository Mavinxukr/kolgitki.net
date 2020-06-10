import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopularCard.scss';
import {
  createCleanUrl,
  getCorrectPrice,
  setFiltersInCookies,
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';

const CategoriesCard = ({
  item: {
    image_link, name, id, slug, min_price,
  },
  isDesktopScreen,
  router,
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
    router.push('/Products', `/Products_${createCleanUrl(cookies).join('_')}`);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            redirectToProducts();
          }}
        >
          <img
            className={styles.image}
            src={image_link}
            alt={image_link}
          />
        </a>
      </div>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          redirectToProducts();
        }}
      >
        <h3 className={styles.cardTitle}>{name}</h3>
      </a>
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
  router: PropTypes.object,
};

export default withResponse(CategoriesCard);
