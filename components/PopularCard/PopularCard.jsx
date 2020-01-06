import React from 'react';
import styles from './PopularCard.scss';

const CategoriesCard = ({
  src, alt, title, price,
}) => (
  <article className={styles.card}>
    <img className={styles.image} src={src} alt={alt} />
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.price}>от {price} ₴</p>
  </article>
);

export default CategoriesCard;
