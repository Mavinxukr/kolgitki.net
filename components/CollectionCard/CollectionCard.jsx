import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { getCorrectPrice } from '../../utils/helpers';
import styles from './CollectionCard.scss';

const CollectionCard = ({
  title, price, collection, type, src,
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

  return (
    <article
      className={classNameForCardWrapper}
      style={{ backgroundImage: `url(${src})` }}
    >
      <article className={classNameForBigCard}>
        <div className={styles.firstGroup}>
          <h4>{title}</h4>
          <p className={styles.desc}>{collection}</p>
        </div>
        <div className={classNameForCardGroup}>
          <Link href="/Products" prefetch={false} passHref>
            <a className={classNameForLink}>
              Подробнее
            </a>
          </Link>
          <p className={styles.price}>{getCorrectPrice(price) || 0} грн.</p>
        </div>
      </article>
    </article>
  );
};

CollectionCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  collection: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
};

export default CollectionCard;
