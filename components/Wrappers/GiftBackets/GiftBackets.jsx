import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getFilters } from '../../../services/gift-backets';
import { getAllCategories } from '../../../services/home';
import { getPresentSets } from '../../../redux/actions/presentSets';
import {
  isDataReceivedForPresentSets,
  dataPresentSetsSelector,
} from '../../../utils/selectors';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
  getArrOfFilters,
  readFiltersFromUrl,
  setFiltersInCookies,
  getUrlArr,
  getCorrectWordCount,
  parseText,
} from '../../../utils/helpers';
import { arrSelect } from '../../../utils/fakeFetch/arrSelect';
import { withResponse } from '../../hoc/withResponse';
import { cookies } from '../../../utils/getCookies';
import styles from './GiftBackets.scss';

const DynamicComponentWithNoSSRGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false },
);

const GiftBackets = ({ isDesktopScreen }) => {
  const [filters, setFilters] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isChangePage, setIsChangePage] = useState(false);

  const presentSets = useSelector(dataPresentSetsSelector);
  const isDataReceived = useSelector(isDataReceivedForPresentSets);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateFilters = () => {
    const filtersCookies = cookies.get('filters');
    getAllCategories({}).then(response => setCategories(response.data));
    getFilters({
      category_id:
        (filtersCookies
          && filtersCookies.categories
          && filtersCookies.categories[0].id)
        || 0,
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
      !cookies.get('filters')
      && filters
      && categories.length
      && getUrlArr(router.asPath).length
    ) {
      setFiltersInCookies(
        cookies,
        readFiltersFromUrl(router.asPath, categories, filters),
      );
    }

    if (
      !isChangePage
      && getUrlArr(router.asPath).length
      && cookies.get('filters')
    ) {
      handleUpdateFilters();
      setIsChangePage(true);
    }
  }, [filters, categories]);

  if (!isDataReceived || !filters) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.giftBaskets}>
        <div className={styles.header}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                nameUa: 'Головна',
                pathname: '/',
              },
              {
                id: 2,
                name: 'Подарочные наборы',
                nameUa: 'Подарункові набори',
              },
            ]}
          />
          <FilterIndicators
            buttonValue="Удалить все поводы"
            buttonValueUa="Видалити всі приводи"
            classNameWrapper={styles.filterIndicatorsWrapper}
            router={router}
            pathname="/gift-backets"
          />
          <p>
            {getCorrectWordCount(presentSets.data.length, [
              'товар',
              'товара',
              'товаров',
            ])}
          </p>
        </div>
        <div className={styles.products}>
          {isDesktopScreen && (
            <Categories
              classNameWrapper={styles.leftSide}
              arrSubCategories={categories}
              router={router}
              pathname="/gift-backets"
            />
          )}
          <div className={styles.rightSide}>
            <div className={styles.controllersWrapper}>
              <Filter
                classNameWrapper={styles.filterWrapper}
                title={parseText(
                  cookies,
                  'Повод для подарка',
                  'Привід для подарунка',
                )}
                arrSelects={filters[2].tags}
                categoryName="tags"
                router={router}
                id="gift"
                pathname="/gift-backets"
                isGifts
              />
            </div>
            {isDesktopScreen && (
              <Sort router={router} pathname="/gift-backets" />
            )}
            <div
              className={cx(styles.cards, {
                [styles.cardsWithFilters]:
                  getArrOfFilters(arrSelect, cookies).length > 4,
              })}
            >
              {presentSets.data.length > 0 ? (
                presentSets.data.map(item => (
                  <DynamicComponentWithNoSSRGiftProductCard
                    classNameWrapper={styles.card}
                    key={item.id}
                    item={item}
                    height={338}
                  />
                ))
              ) : (
                <p className={styles.notFoundText}>Ничего не найдено</p>
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
                              cookies.get('filters'),
                            ),
                            page: presentSets.current_page + 1 || 1,
                          },
                          true,
                        ),
                      );
                    }}
                  />
                )}
              </div>
            )}
            <div className={cx(styles.descBlock, {
              [styles.descBlockWithoutPaginate]: presentSets.last_page === 1,
            })}
            >
              <h4>
                {parseText(
                  cookies,
                  'Чтобы оформить возврат, нужно сделать 3 шага',
                  'Щоб оформити повернення, потрібно зробити 3 кроки',
                )}
                :
              </h4>
              <p className={styles.descText}>
                {parseText(
                  cookies,
                  '       Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был\n'
                    + '                максимально приятным, и разработали максимально простую и\n'
                    + '                удобную процедуру возврата.',
                  '\n'
                    + 'Ми робимо все для того, щоб ваш досвід онлайн-шопінгу був\n'
                    + '                максимально приємним, і розробили максимально просту і\n'
                    + '                зручну процедуру повернення.',
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
