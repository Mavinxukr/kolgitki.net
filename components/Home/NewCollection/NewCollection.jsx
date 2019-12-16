import React from 'react';
import styles from './NewCollection.scss';

const CollectionCard = ({ title, price, collection }) => (
  <article className={styles.smallCard}>
    <article className={`${styles.smallCardChildCard} ${styles.childCard}`}>
      <div className={styles.groupSmall}>
        <h2 className={styles.titleCard}>{title}</h2>
        <p className={styles.price}>от {price} ₴</p>
      </div>
      <div className={styles.groupSmall}>
        <p className={styles.desc}>{collection}</p>
        <a href="/" className={styles.link}>
          Подробнее
        </a>
      </div>
    </article>
  </article>
);

const NewCollection = () => (
  <div className={styles.newCollection}>
    <h2 className={styles.title}> Новые коллекции</h2>
    <div className={styles.cards}>
      <article className={styles.bigCard}>
        <article className={`${styles.bigCardWrapper} ${styles.childCard}`}>
          <h2 className={styles.titleCard}>Колготки</h2>
          <p className={`${styles.desc} ${styles.descCardBig}`}>
            Зима 19-20 / Giulia
          </p>
          <div className={styles.groupBig}>
            <a href="/" className={styles.link}>
              Подробнее
            </a>
            <p className={styles.price}>от 159 ₴</p>
          </div>
        </article>
      </article>
      <div className={styles.smallCards}>
        <CollectionCard
          title="Легинсы"
          collection="Зима 19-20 / Giulia"
          price="159"
        />
        <CollectionCard
          title="Брюки"
          collection="Зима 19-20 / Giulia"
          price="420"
        />
      </div>
    </div>
  </div>
);

export default NewCollection;
