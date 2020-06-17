import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  getCorrectPrice,
  setFiltersInCookies,
  createCleanUrl,
  parseText,
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';
import styles from './CollectionCard.scss';


const CollectionCard = ({
  title,
  titleUk,
  price,
  collection,
  collectionUk,
  type,
  src,
  id,
  slug,
  router,
  isDesktopScreen,
}) => {
  const classNameForBigCard = cx(styles.card, {
    [styles.bigCard]: type === 'bigCard',
    [styles.smallCard]: type === 'smallCard',
  });

  const classNameForCardGroup = cx(styles.group, {
    [styles.bigCardGroup]: type === 'bigCard',
    [styles.smallCardGroup]: type === 'smallCard',
  });

  const classNameForCardWrapper = cx(styles.cardWrapper, {
    [styles.bigCardWrapper]: type === 'bigCard',
    [styles.smallCardWrapper]: type === 'smallCard',
  });

  const classNameForLink = cx(styles.link, {
    [styles.bigCardLink]: type === 'bigCard',
    [styles.smallCardLink]: type === 'smallCard',
  });

  const redirectToProducts = () => {
    setFiltersInCookies(cookies, {
      collection_id: [
        {
          id,
          name: slug,
          collectionName: parseText(cookies, title, titleUk),
        },
      ],
    });
    router.push('/Products', `/Products_${createCleanUrl(cookies).join('_')}`);
  };

  return (
    <>
      {isDesktopScreen && (
      <article
        className={classNameForCardWrapper}
        style={{ backgroundImage: `url(${src})` }}
      >
        <article className={classNameForBigCard}>
          <div className={styles.firstGroup}>
            <h4>{parseText(cookies, title, titleUk)}</h4>
            <p className={styles.desc}>
              {parseText(cookies, collection, collectionUk)}
            </p>
          </div>
          <div className={classNameForCardGroup}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                redirectToProducts();
              }}
              className={classNameForLink}
            >
              {parseText(cookies,'Подробнее', 'Докладніше')}
            </a>
            <p className={styles.price}>{getCorrectPrice(price) || 0} грн.</p>
          </div>
        </article>
      </article>
      ) || (
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          redirectToProducts();
        }}
        className={styles.linkWrapper}
      >
        <article
          className={classNameForCardWrapper}
          style={{ backgroundImage: `url(${src})` }}
        />
      </a>
      )}
    </>
  );
};

CollectionCard.propTypes = {
  title: PropTypes.string,
  titleUk: PropTypes.string,
  price: PropTypes.string,
  collection: PropTypes.string,
  collectionUk: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
  id: PropTypes.number,
  slug: PropTypes.string,
  router: PropTypes.object,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(CollectionCard);
