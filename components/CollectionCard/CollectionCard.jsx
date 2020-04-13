import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
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
          <a href="/" className={classNameForLink}>
            Подробнее
          </a>
          <p className={styles.price}>{price || 0} ₴</p>
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
