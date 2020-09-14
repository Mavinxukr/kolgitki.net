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
import SharePopup from '../../../SharePopup/SharePopup';
import IconShare from '../../../../public/svg/share1.svg';
import { checkHaveIndex, parseText } from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';
import { withResponse } from '../../../hoc/withResponse';
import withPopup from '../../../hoc/withPopup';
import styles from './Favourite.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const DynamicComponentWithNoSSRGiftCard = dynamic(
  () => import('../../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false },
);

const filterArrIds = (arr, subArr, key) => arr
  .map(
    item => item[key]
        && !subArr.every(itemChild => item[key].id !== itemChild)
        && item[key].id,
  )
  .filter(item => item);

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

const Favourite = ({ openPopup }) => {
  const [selectedItemsGood, setSelectedItemsGood] = useState([]);
  const [selectedItemsPresent, setSelectedItemsPresent] = useState([]);
  const [activeBtn, setIsActiveBtn] = useState(false);

  const isDataReceived = useSelector(isFavouritesDataReceivedSelector);
  const favouritesData = useSelector(favouritesDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites({}));
  }, []);

  useEffect(() => {
    setSelectedItemsGood(
      filterArrIds(favouritesData, selectedItemsGood, 'good'),
    );
    setSelectedItemsPresent(
      filterArrIds(favouritesData, selectedItemsPresent, 'presentset'),
    );
    if (selectedItemsGood.length === 0) {
      setIsActiveBtn(false);
    }
  }, [favouritesData]);

  useEffect(() => {
    if (selectedItemsGood.length === 0) {
      setIsActiveBtn(false);
    }
  }, [selectedItemsGood]);

  if (!isDataReceived) {
    return <Loader isSmallPage />;
  }

  const selectArr = [];

  const arrFav = favouritesData.map(item => selectArr.push(item.good.id));

  return (
    <div className={styles.profileFavourite}>
      {favouritesData.length > 0 ? (
        <>
          <div className={styles.header}>
            <div className={styles.subHeaderWrapper}>
              <h2 className={styles.title}>
                {parseText(cookies, 'Избранные', 'Обрані')}
              </h2>
              {/* {isMobileScreen */}
              {/*  && [...selectedItemsPresent, ...selectedItemsGood].length > 0 && ( */}
              {/*    <button */}
              {/*      className={styles.selectedBlockButtonCancel} */}
              {/*      onClick={() => { */}
              {/*        setSelectedItemsPresent([]); */}
              {/*        setSelectedItemsGood([]); */}
              {/*      }} */}
              {/*      type="button" */}
              {/*    > */}
              {/*      {parseText(cookies, 'Отменить', 'Скасувати')} */}
              {/*    </button> */}
              {/* )} */}
            </div>
            {/* {[...selectedItemsPresent, ...selectedItemsGood].length > 0 */}
            {/* && isDesktopScreen ? ( */}
            {/*  <div className={styles.selectedBlock}> */}
            {/*    <button */}
            {/*      className={styles.selectedBlockButtonDelete} */}
            {/*      onClick={() => { */}
            {/*        dispatch( */}
            {/*          deleteFromFavourite( */}
            {/*            {}, */}
            {/*            { */}
            {/*              good_ids: JSON.stringify(selectedItemsGood), */}
            {/*              present_ids: JSON.stringify(selectedItemsPresent), */}
            {/*            }, */}
            {/*          ), */}
            {/*        ); */}
            {/*        setSelectedItemsPresent([]); */}
            {/*        setSelectedItemsGood([]); */}
            {/*      }} */}
            {/*      type="button" */}
            {/*    > */}
            {/*      {parseText(cookies, 'Удалить', 'Видалити')} ( */}
            {/*      {[...selectedItemsPresent, ...selectedItemsGood].length}) */}
            {/*    </button> */}
            {/*    <button */}
            {/*      className={styles.selectedBlockButtonCancel} */}
            {/*      onClick={() => { */}
            {/*        setSelectedItemsPresent([]); */}
            {/*        setSelectedItemsGood([]); */}
            {/*      }} */}
            {/*      type="button" */}
            {/*    > */}
            {/*      {parseText(cookies, 'Отменить', 'Скасувати')} */}
            {/*    </button> */}
            {/*  </div> */}
            {/*  ) : ( */}
            {/*    <div className={styles.headerButtonDeleteWrapper}> */}
            {/*      <button */}
            {/*        className={styles.headerButtonDelete} */}
            {/*        onClick={() => { */}
            {/*          dispatch( */}
            {/*            deleteFromFavourite( */}
            {/*              {}, */}
            {/*              { */}
            {/*                good_ids: JSON.stringify( */}
            {/*                  favouritesData */}
            {/*                    .map(item => item.good && item.good.id) */}
            {/*                    .filter(item => item), */}
            {/*                ), */}
            {/*                present_ids: JSON.stringify( */}
            {/*                  favouritesData */}
            {/*                    .map( */}
            {/*                      item => item.presentset && item.presentset.id, */}
            {/*                    ) */}
            {/*                    .filter(item => item), */}
            {/*                ), */}
            {/*              }, */}
            {/*            ), */}
            {/*          ); */}
            {/*        }} */}
            {/*        type="button" */}
            {/*      > */}
            {/*        {parseText(cookies, 'Удалить все', 'Видалити усе')} */}
            {/*      </button> */}
            {/*    </div> */}
            {/*  )} */}
          </div>
          <div className={styles.bottomHeader}>
            <button
              type="button"
              className={cx(styles.flexButton, {
                [styles.active]: activeBtn,
              })}
              onClick={() => {
                setIsActiveBtn(!activeBtn);
                if (selectedItemsGood.length === 0) {
                  setSelectedItemsGood(selectArr);
                } else {
                  setSelectedItemsGood([]);
                }
              }}
            >
              <p className={styles.cardButtonSelect} />
              {parseText(
                cookies,
                !activeBtn ? 'Выбрать все' : 'Oтменить',
                !activeBtn ? 'Вибрати все' : 'Відмінити',
              )}
            </button>
            <button
              className={styles.flexButton}
              type="button"
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
                setIsActiveBtn(false);
              }}
            >
              <p className={styles.cardButtonDelete} />
              {parseText(cookies, 'Удалить', 'Видалити')}
            </button>
          </div>
          <div className={styles.cards}>
            {favouritesData.map((item) => {
              if (!item.good && !item.presentset) {
                return;
              }

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
                    isSimpleProduct
                  />
                  <div className={styles.cardButtons}>
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
                        setIsActiveBtn(true);
                      }}
                    />
                    <button
                      className={styles.cardButtonShare}
                      type="button"
                      onClick={() => openPopup({
                        PopupContentComponent: SharePopup,
                        content: `Product/${newItem.id}${(item.presentset
                            && '?present=true')
                            || ''}`,
                      })
                      }
                    >
                      <IconShare />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className={styles.notFoundProducts}>
          {parseText(
            cookies,
            'Вы еще не добавили товаров в избранные',
            'Ви ще не додали товарів в обрані',
          )}
        </p>
      )}
    </div>
  );
};

export default withPopup(withResponse(Favourite));
