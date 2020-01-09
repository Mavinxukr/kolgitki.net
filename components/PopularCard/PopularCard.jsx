import React from 'react';
import PropTypes from 'prop-types';
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

CategoriesCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
};

export default CategoriesCard;
