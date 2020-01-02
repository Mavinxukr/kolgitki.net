import React from 'react';
import styles from './CollectionCard.scss';

const CollectionCard = ({
  title,
  price,
  collection,
  styleForCard,
  styleForGroup,
  marginTopForLink,
  styleForCardWrapper,
  src,
}) => (
  <article style={{ ...styleForCardWrapper, backgroundImage: `url(${src})` }}>
    <article className={styles.card} style={styleForCard}>
      <div className={styles.group}>
        <h2 className={styles.titleCard}>{title}</h2>
        <p className={styles.desc}>{collection}</p>
      </div>
      <div style={styleForGroup}>
        <p className={styles.price}>{price}</p>
        <a
          style={{ marginTop: marginTopForLink }}
          href="/"
          className={styles.link}
        >
          Подробнее
        </a>
      </div>
    </article>
  </article>
);

export default CollectionCard;
