import React from 'react';
import styles from './PopularCategories.scss';

const CategoriesCard = ({
  src, alt, title, price,
}) => (
  <article className={styles.card}>
    <img className={styles.image} src={src} alt={alt} />
    <h2 className={styles.cardTitle}>{title}</h2>
    <p className={styles.price}>от {price} ₴</p>
  </article>
);

const PopularCategories = () => (
  <div className={styles.popularCategories}>
    <h2 className={styles.title}>Популярные категории</h2>
    <div className={styles.cards}>
      <div className={styles.cardsGroup}>
        <CategoriesCard
          src="/images/POLA_60_image_1008201_2x.png"
          alt="pola"
          title="Колготки"
          price="95"
        />
        <CategoriesCard
          src="/images/CAPRI_SPORT_MELANGE_image_1006778.png"
          alt="capri"
          title="Спортивная одежда"
          price="420"
        />
      </div>
      <div className={styles.cardsGroup}>
        <CategoriesCard
          src="/images/CAPRI_SPORT_MELANGE_image_1006778.png"
          alt="capri"
          title="Спортивная одежда"
          price="420"
        />
        <CategoriesCard
          src="/images/POLA_60_image_1008201_2x.png"
          alt="pola"
          title="Колготки"
          price="95"
        />
      </div>
    </div>
  </div>
);

export default PopularCategories;
