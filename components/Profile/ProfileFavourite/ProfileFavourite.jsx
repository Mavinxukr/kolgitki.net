import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { data } from './data';
import styles from './ProfileFavourite.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const ProfileFavourite = () => {
  const [amountSelectItems, setAmountSelectItems] = useState(0);

  const addItemSelect = (e) => {
    if (e.target.checked) {
      setAmountSelectItems(amountSelectItems + 1);
    } else {
      setAmountSelectItems(amountSelectItems - 1);
    }
  };

  return (
    <div className={styles.profileFavourite}>
      <div className={styles.header}>
        <h2 className={styles.title}>Избранные</h2>
        {amountSelectItems > 0 ? (
          <div className={styles.selectedBlock}>
            <button className={styles.selectedBlockButtonShare} type="button">
              Поделиться ({amountSelectItems})
            </button>
            <button className={styles.selectedBlockButtonDelete} type="button">
              Удалить ({amountSelectItems})
            </button>
            <button className={styles.selectedBlockButtonCansel} type="button">
              Отменить
            </button>
          </div>
        ) : (
          <>
            <button className={styles.headerButtonShare} type="button">
              Поделиться
            </button>
            <div className={styles.headerButtonDeleteWrapper}>
              <button className={styles.headerButtonDelete} type="button">
                Удалить все
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.cards}>
        {data.map(item => (
          <div className={styles.card} key={item.id}>
            <input
              type="checkbox"
              id={`item${item.id}`}
              className={styles.field}
              onChange={addItemSelect}
            />
            <div className={styles.cardWrapper}>
              <DynamicComponentWithNoSSRCard item={item} />
            </div>
            <div className={styles.cardButtons}>
              <button className={styles.cardButtonDelete} type="button" />
              <button className={styles.cardButtonShare} type="button" />
              <label
                htmlFor={`item${item.id}`}
                className={styles.cardButtonSelect}
                type="button"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFavourite;
