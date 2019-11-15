import React from 'react';
import Styles from './PopularCategories.module.scss';

const PopularCategories = () => (
  <div className={Styles.PopularCategories}>
    <h2 className={Styles.PopularCategories__Title}>Популярные категории</h2>
    <div className={Styles.PopularCategories__Cards}>
      <div className={Styles.PopularCategories__CardsGroup}>
        <article className={Styles.PopularCategories__Card}>
          <img className={Styles.PopularCategories__Image} src="/images/POLA_60_image_1008201(2).png" alt="pola" />
          <h2 className={Styles.PopularCategories__CardTitle}>Колготки</h2>
          <p className={Styles.PopularCategories__Price}>от 95,00 ₴</p>
        </article>
        <article className={Styles.PopularCategories__Card}>
          <img className={Styles.PopularCategories__Image} src="/images/CAPRI_SPORT_MELANGE_image_1006778.png" alt="capri" />
          <h2 className={Styles.PopularCategories__CardTitle}>Спортивная одежда</h2>
          <p className={Styles.PopularCategories__Price}>от 420,00 ₴</p>
        </article>
      </div>
      <div className={Styles.PopularCategories__CardsGroup}>
        <article className={Styles.PopularCategories__Card}>
          <img className={Styles.PopularCategories__Image} src="/images/CAPRI_SPORT_MELANGE_image_1006778.png" alt="capri" />
          <h2 className={Styles.PopularCategories__CardTitle}>Спортивная одежда</h2>
          <p className={Styles.PopularCategories__Price}>от 420,00 ₴</p>
        </article>
        <article className={Styles.PopularCategories__Card}>
          <img className={Styles.PopularCategories__Image} src="/images/POLA_60_image_1008201(2).png" alt="pola" />
          <h2 className={Styles.PopularCategories__CardTitle}>Колготки</h2>
          <p className={Styles.PopularCategories__Price}>от 95,00 ₴</p>
        </article>
      </div>
    </div>
  </div>
);

export default PopularCategories;
