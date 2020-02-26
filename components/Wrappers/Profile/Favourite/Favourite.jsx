import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
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
import { checkHaveIndex } from '../../../../utils/helpers';
import styles from './Favourite.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Favourite = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const isDataReceived = useSelector(isFavouritesDataReceivedSelector);
  const favouritesData = useSelector(favouritesDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <div className={styles.profileFavourite}>
      <div className={styles.header}>
        <h2 className={styles.title}>Избранные</h2>
        {selectedItems.length > 0 ? (
          <div className={styles.selectedBlock}>
            <button className={styles.selectedBlockButtonShare} type="button">
              Поделиться ({selectedItems.length})
            </button>
            <button
              className={styles.selectedBlockButtonDelete}
              onClick={() => {
                dispatch(
                  deleteFromFavourite(
                    {},
                    {
                      good_ids: JSON.stringify(selectedItems),
                    },
                  ),
                );
                setSelectedItems([]);
              }}
              type="button"
            >
              Удалить ({selectedItems.length})
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
              <button
                className={styles.headerButtonDelete}
                onClick={() => {
                  dispatch(
                    deleteFromFavourite(
                      {},
                      {
                        good_ids: JSON.stringify(
                          favouritesData.map(item => item.good.id),
                        ),
                      },
                    ),
                  );
                }}
                type="button"
              >
                Удалить все
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.cards}>
        {favouritesData.map((item) => {
          const classNameForButtonShow = cx(styles.cardButtonSelect, {
            [styles.cardButtonSelected]: checkHaveIndex(item.good.id, selectedItems),
          });

          const classNameForCardWrapper = cx(styles.cardWrapper, {
            [styles.cardWrapperActive]: checkHaveIndex(item.good.id, selectedItems),
          });

          return (
            <div className={styles.card} key={item.id}>
              <DynamicComponentWithNoSSRCard
                classNameWrapper={classNameForCardWrapper}
                item={item.good}
              />
              <div className={styles.cardButtons}>
                <button
                  className={styles.cardButtonDelete}
                  onClick={() => {
                    dispatch(
                      deleteFromFavourite(
                        {},
                        {
                          good_ids: JSON.stringify([item.good.id]),
                        },
                      ),
                    );
                  }}
                  type="button"
                />
                <button className={styles.cardButtonShare} type="button" />
                <button
                  className={classNameForButtonShow}
                  type="button"
                  onClick={() => {
                    const id = checkHaveIndex(item.good.id, selectedItems);
                    if (id) {
                      setSelectedItems(
                        selectedItems.filter(index => index !== id),
                      );
                    } else {
                      setSelectedItems([...selectedItems, item.good.id]);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favourite;
