import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import CategoriesList from '../../CategoriesList/CategoriesList';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getFilters } from '../../../services/gift-backets';
import { getAllCategories } from '../../../services/home';
import {
  clearPresentSetsData,
  getPresentSets
} from '../../../redux/actions/presentSets';
import {
  isDataReceivedForPresentSets,
  dataPresentSetsSelector
} from '../../../utils/selectors';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
  getArrOfFilters,
  getUrlArr,
  getCorrectWordCount,
  parseText
} from '../../../utils/helpers';
import { arrSelect } from '../../../utils/fakeFetch/arrSelect';
import { withResponse } from '../../hoc/withResponse';
import { cookies } from '../../../utils/getCookies';
import styles from './GiftBackets.scss';
import { GiftContext } from '../../../context/GiftContext';

const DynamicComponentWithNoSSRGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false }
);

//method for getting an array of categories of all products
//entry: array of objects
//output: array of objects
const usedCategoriesBuild = products => {
  let usedCategories = [];
  products.forEach(
    item => (usedCategories = [...usedCategories, ...item.categories])
  );
  return usedCategories;
};

const GiftBackets = ({ isDesktopScreen }) => {
  // const [filters, setFilters] = useState([]);
  const presentSets = useSelector(dataPresentSetsSelector);
  const isDataReceived = useSelector(isDataReceivedForPresentSets);
  const router = useRouter();
  const dispatch = useDispatch();
  const { giftFilters, addGiftFilter } = useContext(GiftContext);

  const usedCategories =
    Object.keys(presentSets).length > 0
      ? usedCategoriesBuild(presentSets.data)
      : [];

  const handleUpdateFilters = () => {
<<<<<<< HEAD
    const filtersCookies = cookies.get('filters');
    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
    getFilters({
      category_id:
        (filtersCookies &&
          filtersCookies.categories &&
          filtersCookies.categories[filtersCookies.categories.length - 1]
            ?.id) ||
        0
    }).then(response => setFilters(response.data));
    dispatch(getPresentSets({}, createBodyForRequestCatalog(filtersCookies)));
  };

  useEffect(() => {
    handleUpdateFilters();

    return () => {
      deleteFiltersFromCookie(cookies);
    };
  }, []);

  useEffect(() => {
    handleUpdateFilters();
  }, [router]);

  useEffect(() => {
    if (
      !isChangePage &&
      getUrlArr(router.asPath).length &&
      cookies.get('filters')
    ) {
      handleUpdateFilters();
      setIsChangePage(true);
    }
  }, [filters, categories]);
=======
    dispatch(getPresentSets({}, giftFilters));
    // getFilters({}).then(response => setFilters(response.data));
  };

  useEffect(() => {
    dispatch(clearPresentSetsData());
    handleUpdateFilters();
  }, [giftFilters]);
>>>>>>> lukin

  if (!isDataReceived) {
    return <Loader />;
  }

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
                pathname: '/gift-backets'
              }
              // ...(crumbs.map(item => ({
              //   id: item.id,
              //   name: item.name,
              //   nameUa: item.name_ua,
              //   pathname: `/Products/${item.slug}`
              // })) || [])
            ]}
          />
          <p>
            {/* {getCorrectWordCount(presentSets.data.length, [
              'товар',
              'товара',
              'товаров'
            ])} */}
          </p>
        </div>
        <div className={styles.products}>
          {isDesktopScreen && (
            <div className={styles.leftSide}>
              <CategoriesList
                usedCategories={usedCategories}
                filters={giftFilters}
                setCategoryInFilters={value =>
                  addGiftFilter('categories', JSON.stringify([value]))
                }
                clearCategotyInFilters={() =>
                  addGiftFilter('categories', JSON.stringify([]))
                }
                present={true}
              />
            </div>
          )}
          <div className={styles.rightSide}>
            <FilterIndicators
              buttonValue="Удалить все поводы"
              buttonValueUa="Видалити всі приводи"
              router={router}
              pathname="/gift-backets"
            />
            <div className={styles.controllersWrapper}>
              {/* <Filter
                classNameWrapper={styles.filterWrapper}
                title={parseText(
                  cookies,
                  'Повод для подарка',
                  'Привід для подарунка'
                )}
                arrSelects={filters[1].tags}
                categoryName="tags"
                router={router}
                id="gift"
                pathname="/gift-backets"
                isGifts
              /> */}
            </div>
            {isDesktopScreen && (
              <Sort router={router} pathname="/gift-backets" />
            )}
            <div
              className={cx(styles.cards, {
                [styles.cardsWithFilters]:
                  getArrOfFilters(arrSelect, cookies).length > 4
              })}
            >
              {presentSets.data && presentSets.data.length > 0 ? (
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
