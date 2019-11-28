import React from 'react';
import Styles from './BrandCard.module.scss';

const BrandCard = ({ item: { logo, name, products } }) => (
  <article className={Styles.BrandCard}>
    <img src={logo} alt="logo" />
    <p className={Styles.BrandCard__Name}>{name}</p>
    <ul className={Styles.BrandCard__List}>
      {
        products.map((item, id) => <li className={Styles.BrandCard__ListItem} key={id}>{item}</li>)
      }
    </ul>
    <a className={Styles.BrandCard__Link} href="/">Все товары</a>
  </article>
);

export default BrandCard;
