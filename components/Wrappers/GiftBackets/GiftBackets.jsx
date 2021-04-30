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
import {
  getPresentSets,
  getPresentSetsDataSuccess
} from '../../../redux/actions/presentSets';
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
import ProductSort from '../../ProductSort/ProductSort';
import ProductLoader from '../../ProductLoader/ProductLoader';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import { getCategoryBySlug } from '../../../services/home';

const DynamicComponentWithNoSSRGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false }
);

const GiftBackets = ({
  goods: serverGoods,
  category: serverCategory,
  filters: serverFilters,
  filterList: serverFilterList
}) => {
  const [category, setCategory] = useState(serverCategory);
  const [filters, setFilters] = useState(serverFilters);
  const [filterList, setFilterList] = useState(serverFilterList);
  const presentSets = useSelector(dataPresentSetsSelector);
  const loading = useSelector(state => state.presentSets.isFetch);

  const router = useRouter();
  const dispatch = useDispatch();

  const getProductHandle = f => {
    dispatch(getPresentSets({}, f));
  };

  async function loadCategory(slug) {
    const responseCategory = await getCategoryBySlug(slug);
    const f = { ...router.query };
    delete f.slug;
    setFilters(f);
    if (responseCategory.status) {
      setCategory(responseCategory.data);

      getProductHandle({
        ...f,
        categories: JSON.stringify([responseCategory.data.id])
      });
    }
  }

  const importFiltersInQuery = f => {
    let query = '';
    Object.keys(f).map(filter => (query += `${filter}=${f[filter]}&`));
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  async function loadFilters() {
    const response = await getFilters({});
    if (response.status) {
      setFilterList(response.data);
    }
  }

  useEffect(() => {
    if (!category && router.query.hasOwnProperty('slug')) {
      loadCategory(router.query.slug[router.query.slug.length - 1]);
    }
    if (!filterList) {
      loadFilters();
    }

    if (Object.keys(filters).length < 1) {
      setFilters({ ...router.query });
    }

    if (serverGoods) {
      dispatch(getPresentSetsDataSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    const newFilers = { ...router.query };
    delete newFilers.slug;

    if (
      router.query.hasOwnProperty('slug') &&
      router.query?.slug[router.query.slug.length - 1] !== category?.slug
    ) {
      loadCategory(router.query.slug[router.query.slug.length - 1]);
    } else {
      setFilters(newFilers);
      let categories = category ? JSON.stringify([category.id]) : [];
      if (!router.query.hasOwnProperty('slug')) {
        setCategory(null);
        categories = [];
      }
      getProductHandle({
        categories,
        ...newFilers
      });
    }
  }, [router.query]);

  const toggleFilter = (checked, filter, name) => {
    if (checked) {
      const next = { ...filters };
      const old = next.hasOwnProperty(filter) ? next[filter].split('|') : [];
      next[filter] = [...old, name].join('|');
      importFiltersInQuery(next);
      setFilters(next);
    } else {
      const next = { ...filters };
      const list = next[filter].split('|');
      next[filter] = list.filter(item => item !== name).join('|');
      if (next[filter] === '') {
        delete next[filter];
      }
      importFiltersInQuery(next);

      setFilters(next);
    }
  };

  const removeUnnecessaryFilters = (allFilters, filteList) => {
    const filters = {};
    filteList.forEach(item => {
      if (allFilters.hasOwnProperty(item)) {
        filters[item] = allFilters[item];
      }
    });
    return filters;
  };

  const crumbs = category
    ? category.crumbs_object.map(item => ({
        id: item.id,
        name: item.name,
        nameUa: item.name_ua,
        pathname: `/${item.slug}`
      }))
    : [];

  if (!presentSets || !filterList) {
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
                pathname: 'gift-backets'
              },
              ...crumbs
            ]}
          />

          <p className={styles.goodsNumber}>
            {getCorrectWordCount(presentSets?.data?.length, [
              'товар',
              'товара',
              'товаров'
            ])}
          </p>
        </div>
        <div className={styles.products}>
          <div className={styles.leftSide}>
            <CategoriesList
              usedCategories={null}
              allCategories={filterList[0].categories}
              selectedCategory={null}
              setLink={category => {
                setFilters({});
                router.push(`/gift-backets/${category.crumbs}`);
              }}
              isGift
              clear={() => router.push(`/gift-backets`)}
            />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.products_header}>
              <div className={styles.products_filters}>
                <FiltersList
                  loading={loading}
                  filters={filters}
                  updateProducts={() => importFiltersInQuery(filters)}
                  clearFilters={() =>
                    router.push(`${router.asPath.split('?')[0]}`)
                  }
                  installedFilters={removeUnnecessaryFilters(filters, ['tags'])}
                  removeOneFilter={(filter, name) => {
                    setFilters(prev => {
                      const next = { ...prev };
                      const list = next[filter].split('|');
                      next[filter] = list
                        .filter(item => item !== name)
                        .join('|');
                      if (next[filter] === '') {
                        delete next[filter];
                      }
                      return next;
                    });
                  }}
                ></FiltersList>
              </div>
              <div className={styles.products_filter}>
                <Filter
                  title={parseText(
                    cookies,
                    'Повод для подарка',
                    'Привід для подарунка'
                  )}
                  arrSelects={filterList[1].tags}
                  id="gift"
                  classNameWrapper={styles.filterWrapper}
                  changeHandle={(checked, filter, name) =>
                    toggleFilter(checked, filter, name)
                  }
                  categoryName="tags"
                  selected={(filters?.tags && filters.tags.split('|')) || []}
                  isGifts
                />
              </div>
            </div>

            <div className={styles.sortWrapper}>
              <ProductSort
                setSorting={sort => {
                  const f = { ...filters };
                  delete f.sort_date;
                  delete f.sort_price;
                  importFiltersInQuery({
                    ...f,
                    ...sort
                  });
                }}
                usedSort={filters}
              ></ProductSort>
            </div>

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
                  setPage={number => {
                    const newFilters = { ...usedFilters };
                    newFilters.page = number;
                    let query = '';

                    Object.keys(newFilters).map(
                      filter => (query += `${filter}=${newFilters[filter]}&`)
                    );

                    query = query.slice(0, -1);
                    router.push(`${router.asPath.split('?')[0]}?${query}`);
                  }}
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
                            ...filters,
                            categories: JSON.stringify([category.id]),
                            page: catalog.current_page + 1
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
