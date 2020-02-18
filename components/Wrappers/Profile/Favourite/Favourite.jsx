import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import {
  isFavouritesDataReceivedSelector,
  favouritesDataSelector,
} from '../../../../utils/selectors';
import {
  getFavourites,
  deleteFromFavourite,
} from '../../../../redux/actions/favourite';
import Loader from '../../../Loader/Loader';
import styles from './Favourite.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Favourite = () => {
  const [amountSelectItems, setAmountSelectItems] = useState(0);

  const isDataReceived = useSelector(isFavouritesDataReceivedSelector);
  const favouritesData = useSelector(favouritesDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

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
            <button className={styles.selectedBlockButtonCancel} type="button">
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
        {favouritesData.map(item => (
          <div className={styles.card} key={item.id}>
            <input
              type="checkbox"
              id={`item${item.id}`}
              className={styles.field}
              onChange={addItemSelect}
            />
            <DynamicComponentWithNoSSRCard
              classNameWrapper={styles.cardWrapper}
              item={item.good}
            />
            <div className={styles.cardButtons}>
              <button
                className={styles.cardButtonDelete}
                onClick={() => {
                  dispatch(
                    deleteFromFavourite({}, {
                      good_id: item.good.id,
                    }),
                  );
                }}
                type="button"
              />
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

export default Favourite;
