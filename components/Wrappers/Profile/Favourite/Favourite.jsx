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

const DynamicComponentWithNoSSRGiftCard = dynamic(
  () => import('../../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false },
);

const addOrDeleteElem = ({
  id,
  item,
  setSelectedItemsGood,
  setSelectedItemsPresent,
  selectedItemsGood,
  selectedItemsPresent,
}) => {
  if (id && item.presentset) {
    setSelectedItemsPresent(selectedItemsPresent.filter(index => index !== id));
  }
  if (!id && item.presentset) {
    setSelectedItemsPresent([...selectedItemsPresent, item.presentset.id]);
  }
  if (id && item.good) {
    setSelectedItemsGood(selectedItemsGood.filter(index => index !== id));
  }
  if (!id && item.good) {
    setSelectedItemsGood([...selectedItemsGood, item.good.id]);
  }
};

const Favourite = () => {
  const [selectedItemsGood, setSelectedItemsGood] = useState([]);
  const [selectedItemsPresent, setSelectedItemsPresent] = useState([]);

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
      {favouritesData.length > 0 ? (
        <>
          <div className={styles.header}>
            <h2 className={styles.title}>Избранные</h2>
            {[...selectedItemsPresent, ...selectedItemsGood].length > 0 ? (
              <div className={styles.selectedBlock}>
                <button
                  className={styles.selectedBlockButtonDelete}
                  onClick={() => {
                    dispatch(
                      deleteFromFavourite(
                        {},
                        {
                          good_ids: JSON.stringify(selectedItemsGood),
                          present_ids: JSON.stringify(selectedItemsPresent),
                        },
                      ),
                    );
                    setSelectedItemsPresent([]);
                    setSelectedItemsGood([]);
                  }}
                  type="button"
                >
                  Удалить ({[...selectedItemsPresent, ...selectedItemsGood].length})
                </button>
                <button
                  className={styles.selectedBlockButtonCancel}
                  onClick={() => {
                    setSelectedItemsPresent([]);
                    setSelectedItemsGood([]);
                  }}
                  type="button"
                >
                  Отменить
                </button>
              </div>
            ) : (
              <div className={styles.headerButtonDeleteWrapper}>
                <button
                  className={styles.headerButtonDelete}
                  onClick={() => {
                    dispatch(
                      deleteFromFavourite(
                        {},
                        {
                          good_ids: JSON.stringify(
                            favouritesData.map(
                              item => item.good && item.good.id,
                            ).filter(item => item),
                          ),
                          present_ids: JSON.stringify(
                            favouritesData.map(
                              item => item.presentset && item.presentset.id,
                            ).filter(item => item),
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
            )}
          </div>
          <div className={styles.cards}>
            {favouritesData.map((item) => {
              const Card = item.presentset
                ? DynamicComponentWithNoSSRGiftCard
                : DynamicComponentWithNoSSRCard;

              const newItem = item.presentset || item.good;

              const classNameForButtonShow = cx(styles.cardButtonSelect, {
                [styles.cardButtonSelected]: checkHaveIndex(
                  item,
                  selectedItemsPresent,
                  selectedItemsGood,
                ),
              });

              const classNameForCardWrapper = cx(styles.cardWrapper, {
                [styles.cardWrapperActive]: checkHaveIndex(
                  item,
                  selectedItemsPresent,
                  selectedItemsGood,
                ),
              });

              return (
                <div className={styles.card} key={item.id}>
                  <Card
                    classNameWrapper={classNameForCardWrapper}
                    item={newItem}
                    key={item.id}
                  />
                  <div className={styles.cardButtons}>
                    <button
                      className={styles.cardButtonDelete}
                      onClick={() => {
                        const key = item.presentset
                          ? 'present_ids'
                          : 'good_ids';
                        dispatch(
                          deleteFromFavourite(
                            {},
                            {
                              [key]: JSON.stringify([newItem.id]),
                            },
                          ),
                        );
                      }}
                      type="button"
                    />
                    <button
                      className={classNameForButtonShow}
                      type="button"
                      onClick={() => {
                        const id = checkHaveIndex(
                          item,
                          selectedItemsPresent,
                          selectedItemsGood,
                        );
                        addOrDeleteElem({
                          id,
                          selectedItemsPresent,
                          setSelectedItemsGood,
                          selectedItemsGood,
                          setSelectedItemsPresent,
                          item,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className={styles.notFoundProducts}>
          Вы еще не добавили товаров в избранные
        </p>
      )}
    </div>
  );
};

export default Favourite;
