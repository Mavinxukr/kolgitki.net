import React from 'react';
import styles from './BrandsCard.scss';

const BrandsCard = ({ item: { logo, name, products } }) => (
  <article className={styles.brandCard}>
    <img src={logo} alt="logo" />
    <p className={styles.name}>{name}</p>
    <ul className={styles.list}>
      {
        products.map((item, id) => <li className={styles.listItem} key={id}>{item}</li>)
      }
    </ul>
    <a className={styles.link} href="/">Все товары</a>
  </article>
);

export default BrandsCard;
