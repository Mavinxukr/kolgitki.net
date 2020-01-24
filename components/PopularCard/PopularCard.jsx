import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopularCard.scss';

const CategoriesCard = ({ item: { image_link, name, min_price } }) => (
  <article className={styles.card}>
    <img className={styles.image} src={image_link} alt={image_link} />
    <h3 className={styles.cardTitle}>{name}</h3>
    <p className={styles.price}>от {min_price} ₴</p>
  </article>
);

CategoriesCard.propTypes = {
  item: PropTypes.shape({
    image_link: PropTypes.string,
    name: PropTypes.string,
    min_price: PropTypes.number,
  }),
};

export default CategoriesCard;
