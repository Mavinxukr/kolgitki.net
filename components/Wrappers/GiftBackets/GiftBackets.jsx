import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Filter from '../../Filter/Filter';
import FiltersList from '../../FiltersList/FiltersList';
import CategoriesList from '../../CategoriesList/CategoriesList';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getFilters } from '../../../services/gift-backets';
import { getPresentSets } from '../../../redux/actions/presentSets';
import {
  isDataReceivedForPresentSets,
  dataPresentSetsSelector
} from '../../../utils/selectors';
import {
  createBodyForRequestCatalog,
  getArrOfFilters,
  getCorrectWordCount,
  parseText
} from '../../../utils/helpers';
import { arrSelect } from '../../../utils/fakeFetch/arrSelect';
import { withResponse } from '../../hoc/withResponse';
import { cookies } from '../../../utils/getCookies';
import styles from './GiftBackets.scss';
import { GiftContext } from '../../../context/GiftContext';
import ProductSort from '../../ProductSort/ProductSort';
import ProductLoader from '../../ProductLoader/ProductLoader';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import { getCategoryBySlug } from '../../../services/home';
import { ProductTitle } from '../../ProductTitle/ProductTitle';

const DynamicComponentWithNoSSRGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false }
);

const GiftBackets = ({ isDesktopScreen }) => {
  const [filters, setFilters] = useState([]);
  const presentSets = useSelector(dataPresentSetsSelector);
  const isDataReceived = useSelector(isDataReceivedForPresentSets);
  const loading = useSelector(state => state.presentSets.isFetch);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    giftFilters,
    addGiftFilter,
    clearGiftFilters,
    removeGiftFilter,
    setGiftSorting
  } = useContext(GiftContext);

  const builfFilterFromRequest = () => {
    const f = giftFilters;
    const newF = { ...f };
    if (f.hasOwnProperty('categories')) {
      newF.categories = JSON.stringify([JSON.parse(f.categories)[0].id]);
    }
    if (f.hasOwnProperty('tags')) {
      newF.tags = JSON.stringify(JSON.parse(f.tags).map(item => item.id));
    }
    return newF;
  };

  const handleUpdateFilters = () => {
    dispatch(getPresentSets({}, builfFilterFromRequest()));
  };

  useEffect(() => {
    if (
      !giftFilters.hasOwnProperty('categories') &&
      router.query.hasOwnProperty('slug') &&
      router.query.slug.length > 0
    ) {
      getCategoryBySlug(router.query.slug[router.query.slug.length - 1]).then(
        response => {
          if (response.data) {
            addGiftFilter('categories', JSON.stringify([response.data]));
          }
        }
      );
    }
    if (!router.query.hasOwnProperty('slug')) {
      clearGiftFilters(['categories']);
    }
    getFilters({}).then(response => setFilters(response.data));

    return () => {
      clearGiftFilters(['categories']);
    };
  }, []);

  useEffect(() => {
    handleUpdateFilters();
  }, [
    giftFilters.tags,
    giftFilters.categories,
    giftFilters.page,
    giftFilters.sort_date,
    giftFilters.sort_popular,
    giftFilters.sort_price
  ]);

  // useEffect(() => {
  //   if (!giftFilters.hasOwnProperty('tags')) handleUpdateFilters();
  // }, [giftFilters.tags]);

  const crumbs = giftFilters.hasOwnProperty('categories')
    ? JSON.parse(giftFilters.categories)[0].crumbs_object.map(item => ({
        id: item.id,
        name: item.name,
        nameUa: item.name_ua,
        pathname: `/${item.slug}`
      }))
    : [];

  const toggleFilter = (ev, filter, selected) => {
    if (ev.target.checked) {
      addGiftFilter(ev.target.name, JSON.stringify([...selected, filter]));
    } else {
      let newFilterList = selected.filter(i => i.id !== filter.id);
      if (newFilterList.length === 0) {
        clearGiftFilters([ev.target.name]);
      } else {
        addGiftFilter(ev.target.name, JSON.stringify(newFilterList));
      }
    }
  };

  if (!isDataReceived) {
    return <Loader />;
  }
  const removeUnnecessaryFilters = allFilters => {
    const filters = { ...allFilters };
    delete filters?.categories;
    delete filters?.sort_popular;
    delete filters?.sort_price;
    delete filters?.sort_date;
    delete filters?.page;
    return filters;
  };
  return (
    <MainLayout>
      <div className={styles.giftBaskets}>
        <div className={styles.header}>
          <BreadCrumbs
            routerName="gift-backets"
            items={[
              {
                id: 1,
                name: 'Главная',
                nameUa: 'Головна',
                pathname: '/'
              },
              {
                id: 2,
                name: 'Подарочные наборы',
                nameUa: 'Подарункові набори',
                pathname: 'gift-backets'
              },
              ...crumbs
            ]}
          />

          <p className={styles.goodsNumber}>
            {getCorrectWordCount(presentSets.data.length, [
              'товар',
              'товара',
              'товаров'
            ])}
          </p>
        </div>
        <div className={styles.products}>
          {isDesktopScreen && (
            <div className={styles.leftSide}>
              <CategoriesList
                allCategories={filters[0]?.categories || []}
                usedCategories={null}
                filters={giftFilters}
                setCategoryInFilters={category => {
                  addGiftFilter('categories', JSON.stringify([category]));
                }}
                clearCategotyInFilters={() => clearGiftFilters(['categories'])}
                path="/gift-backets"
                isPresent={true}
                isSale={false}
                isProducts={false}
              />
            </div>
          )}
          <div className={styles.rightSide}>
            {isDesktopScreen ? (
              <>
                <FiltersList
                  installedFilters={removeUnnecessaryFilters(giftFilters)}
                  clearFilters={clearGiftFilters}
                  removeOneFilter={removeGiftFilter}
                  getProductHandle={handleUpdateFilters}
                  isGifts
                />
                <Filter
                  title={parseText(
                    cookies,
                    'Повод для подарка',
                    'Привід для подарунка'
                  )}
                  arrSelects={filters[1]?.tags || []}
                  id="gift"
                  classNameWrapper={styles.filterWrapper}
                  changeHandle={(ev, filter) => {
                    toggleFilter(
                      ev,
                      filter,
                      (giftFilters?.tags && JSON.parse(giftFilters.tags)) || []
                    );
                  }}
                  categoryName="tags"
                  isDesktopScreen={isDesktopScreen}
                  isGifts
                  selected={
                    (giftFilters?.tags && JSON.parse(giftFilters.tags)) || []
                  }
                />
                <ProductSort
                  setSorting={setGiftSorting}
                  installedFilters={giftFilters}
                ></ProductSort>
              </>
            ) : (
              <>
                <div className={styles.sortWrapperMobile}></div>
                <Filter
                  title={parseText(
                    cookies,
                    'Повод для подарка',
                    'Привід для подарунка'
                  )}
                  arrSelects={filters[1]?.tags || []}
                  id="gift"
                  classNameWrapper={styles.filterWrapper}
                  changeHandle={(ev, filter) => {
                    toggleFilter(
                      ev,
                      filter,
                      (giftFilters?.tags && JSON.parse(giftFilters.tags)) || []
                    );
                  }}
                  categoryName="tags"
                  isGifts
                  selected={
                    (giftFilters?.tags && JSON.parse(giftFilters.tags)) || []
                  }
                />
                <div className={styles.giftCheckedFilters}>
                  <FiltersList
                    getProductHandle={giftFilters}
                    clearFilters={clearGiftFilters}
                    installedFilters={removeUnnecessaryFilters(giftFilters, [
                      'categories',
                      'sort_popular',
                      'sort_price',
                      'sort_date',
                      'page',
                      'search'
                    ])}
                    removeOneFilter={removeGiftFilter}
                    isGifts
                  ></FiltersList>
                </div>
              </>
            )}
            <div
              className={cx(styles.cards, {
                [styles.cardsWithFilters]:
                  getArrOfFilters(arrSelect, cookies).length > 4
              })}
            >
              {loading ? (
                <ProductLoader></ProductLoader>
              ) : presentSets.data && presentSets.data.length > 0 ? (
                presentSets.data.map(item => (
                  <DynamicComponentWithNoSSRGiftProductCard
                    classNameWrapper={styles.card}
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <p className={styles.notFoundText}>
                  {parseText(
                    cookies,
                    'Ничего не найдено',
                    'Нiчого не знайдено'
                  )}
                </p>
              )}
            </div>
            {presentSets.last_page !== 1 && (
              <div className={styles.addElements}>
                <Pagination
                  pageCount={presentSets.last_page}
                  currentPage={presentSets.current_page}
                  pathName="/gift-backets"
                />
                {presentSets.last_page !== presentSets.current_page && (
                  <Button
                    buttonType="button"
                    title="Показать ещё +25"
                    titleUa="Показати ще +25"
                    viewType="pagination"
                    classNameWrapper={styles.showMoreButton}
                    onClick={() => {
                      dispatch(
                        getPresentSets(
                          {},
                          {
                            ...createBodyForRequestCatalog(
                              cookies.get('filters')
                            ),
                            page: presentSets.current_page + 1 || 1
                          },
                          true
                        )
                      );
                    }}
                  />
                )}
              </div>
            )}
            <div
              className={cx(styles.descBlock, {
                [styles.descBlockWithoutPaginate]: presentSets.last_page === 1
              })}
            >
              <h4>
                {parseText(
                  cookies,
                  'Чтобы оформить возврат, нужно сделать 3 шага',
                  'Щоб оформити повернення, потрібно зробити 3 кроки'
                )}
                :
              </h4>
              <p className={styles.descText}>
                {parseText(
                  cookies,
                  '       Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был\n' +
                    '                максимально приятным, и разработали максимально простую и\n' +
                    '                удобную процедуру возврата.',
                  '\n' +
                    'Ми робимо все для того, щоб ваш досвід онлайн-шопінгу був\n' +
                    '                максимально приємним, і розробили максимально просту і\n' +
                    '                зручну процедуру повернення.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withResponse(GiftBackets);
