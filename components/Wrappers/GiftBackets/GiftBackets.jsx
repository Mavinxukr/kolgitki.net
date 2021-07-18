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
import { dataPresentSetsSelector } from '../../../utils/selectors';
import {
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
import { replaceFilters } from './helpers';
import { Noresult } from './../../Wrappers/Products/Noresult/Noresult';
import { buildFiltersBySlug, replaceFilter } from '../../../utils/products';

const DynamicComponentWithNoSSRGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false }
);

const GiftBackets = ({
  goods: serverGoods,
  allFilters: serverAllFilters,
  usedFilters: serverUsedFilters,
  categoryData: serverCategoryData,
  otherFilters: serverOtherFilters,
  allCategories: serverAllCategories,
  isDesktopScreen
}) => {
  const [category, setCategory] = useState(serverCategoryData);
  const [allFilters, setAllFilters] = useState(serverAllFilters);
  const [otherFilters, setOtherFilters] = useState(serverOtherFilters);
  const [filtersList, setFiltersList] = useState(serverUsedFilters);
  const [crumbs, setCrumbs] = useState([]);

  const [updateData, setUpdateData] = useState(false);

  const presentSets = useSelector(dataPresentSetsSelector);
  const loading = useSelector(state => state.presentSets.isFetch);

  const router = useRouter();
  const dispatch = useDispatch();

  const getProductHandle = f => {
    dispatch(getPresentSets({}, f));
  };

  useEffect(() => {
    let crumbs =
      category && category.length > 0
        ? category[0].crumbs_object.map(item => ({
            id: item.id,
            name: item.name,
            nameUa: item.name_ua,
            pathname: `/${item.slug}`
          }))
        : [];
    setCrumbs(crumbs);
  }, [category]);

  async function loadCategory() {
    const slug = router.query.slug.join('/');
    const category = allFilters.categories.filter(
      category => category.crumbs === slug
    );
    setFiltersList({});
    setCategory(category);
    getProductHandle({
      ...replaceFilters({ categories: category })
    });
  }
  const importFiltersInQuery = filter => {
    let query = '';
    Object.keys(filter).forEach(
      f =>
        (query += filter[f]
          ? `${f}=${filter[f].map(item => item.slug || item.crumbs)}&`
          : '')
    );

    if (otherFilters) {
      Object.keys(otherFilters).map(
        of => (query += `${of}=${otherFilters[of]}&`)
      );
    }
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  async function loadFilters() {
    const response = await getFilters({});
    if (response.status) {
      let formatAllFilters = replaceFilter(response.data);
      setAllFilters(formatAllFilters);
    }
  }

  useEffect(() => {
    if (!category && router.query.hasOwnProperty('slug')) {
      loadCategory();
    }
    if (!allFilters) {
      loadFilters();
    }

    if (serverAllCategories) {
      localStorage.setItem(
        'getAllCategories',
        JSON.stringify(serverAllCategories)
      );
    }

    if (
      Object.keys(filtersList).length < 1 &&
      Object.keys(router.query).length > 0
    ) {
      const filters = { ...router.query };
      //build filters from slugs
      const usedFilters = buildFiltersBySlug(filters, allFilters);

      const of = { ...filters };
      delete of.tags;

      setFiltersList(usedFilters);
      setOtherFilters(of);
    }

    if (serverGoods) {
      dispatch(getPresentSetsDataSuccess(serverGoods));
    } else {
      let filterForResponse = {
        ...replaceFilters({
          ...filtersList
        }),
        ...otherFilters
      };

      if (category) {
        filterForResponse = {
          ...filterForResponse,
          ...replaceFilters({ categories: category })
        };
      }

      getProductHandle(filterForResponse);
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      const newFilers = { ...router.query };
      delete newFilers.slug;

      if (
        router.query.hasOwnProperty('slug') &&
        router.query.slug.join('/') !== category?.[0].crumbs
      ) {
        loadCategory();
      } else {
        const usedFilters = buildFiltersBySlug(newFilers, allFilters);

        const of = { ...newFilers };
        delete of.tags;

        setFiltersList(usedFilters);
        setOtherFilters(of);

        let filterForResponse = {
          ...replaceFilters({
            ...usedFilters
          }),
          ...of
        };

        if (category) {
          filterForResponse = {
            ...filterForResponse,
            ...replaceFilters({ categories: category })
          };
        }

        getProductHandle({
          ...replaceFilters({
            ...usedFilters,
            categories: category
          }),
          ...of
        });
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  const toggleFilter = (checked, filterName, filter) => {
    if (checked) {
      setFiltersList(prev => {
        const next = { ...prev };
        const old = next.hasOwnProperty(filterName) ? next[filterName] : [];
        next[filterName] = [...old, filter];
        importFiltersInQuery(next);

        return next;
      });
    } else {
      setFiltersList(prev => {
        const next = { ...prev };
        next[filterName] = next[filterName].filter(f => f.id !== filter.id);
        if (!next[filterName].length) {
          delete next[filterName];
        }
        importFiltersInQuery(next);

        return next;
      });
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

  if (!presentSets || !filtersList || !allFilters) {
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
              allCategories={allFilters.categories}
              selectedCategory={null}
              setLink={category => {
                router.push(`/gift-backets/${category.crumbs}`);
              }}
              isGift
              clear={() => {
                setCategory(null);
                router.push(`/gift-backets`);
              }}
            />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.products_header}>
              <div className={styles.products_filters}>
                <FiltersList
                  loading={loading}
                  filters={filtersList}
                  updateProducts={() =>
                    importFiltersInQuery({
                      ...filtersList
                    })
                  }
                  clearFilters={() =>
                    router.push(`${router.asPath.split('?')[0]}`)
                  }
                  installedFilters={removeUnnecessaryFilters(filtersList, [
                    'tags'
                  ])}
                  removeOneFilter={(filter, item) => {
                    setFiltersList(prev => {
                      const next = { ...prev };
                      next[filter] = next[filter].filter(f => f.id !== item.id);
                      if (!next[filter].length) {
                        delete next[filter];
                      }
                      importFiltersInQuery(next);
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
                  arrSelects={allFilters.tags}
                  id="gift"
                  classNameWrapper={styles.filterWrapper}
                  changeHandle={(checked, filterName, filter) => {
                    toggleFilter(checked, filterName, filter);
                  }}
                  categoryName="tags"
                  selected={
                    filtersList.hasOwnProperty('tags') ? filtersList.tags : []
                  }
                  isGifts
                />
              </div>
            </div>

            <div className={styles.sortWrapper}>
              <ProductSort
                setSorting={sort => {
                  let queryaData = router.query;
                  delete queryaData.slug;

                  delete queryaData.sort_date;
                  delete queryaData.sort_price;
                  queryaData = { ...queryaData, ...sort };

                  let query = '';
                  Object.keys(queryaData).forEach(
                    filter => (query += `${filter}=${queryaData[filter]}&`)
                  );
                  query = query.slice(0, -1);

                  router.push(`${router.asPath.split('?')[0]}?${query}`);
                }}
                usedSort={otherFilters}
              ></ProductSort>
            </div>

            <div className={styles.cardsWrapper}>
              {loading && (
                <div className={styles.loader}>
                  <ProductLoader />
                </div>
              )}
              {presentSets.data && presentSets.data.length > 0 ? (
                <div
                  className={cx(styles.cards, {
                    [styles.cardsWithFilters]:
                      getArrOfFilters(arrSelect, cookies).length > 4
                  })}
                >
                  {presentSets.data.map(item => (
                    <DynamicComponentWithNoSSRGiftProductCard
                      classNameWrapper={styles.card}
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              ) : (
                <Noresult />
              )}
            </div>

            {presentSets.last_page !== 1 && (
              <div className={styles.addElements}>
                <Pagination
                  pageCount={presentSets.last_page}
                  currentPage={presentSets.current_page}
                  setPage={number => {
                    let queryaData = router.query;
                    delete queryaData.slug;
                    queryaData.page = number;

                    let query = '';
                    Object.keys(queryaData).forEach(
                      filter => (query += `${filter}=${queryaData[filter]}&`)
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
                            ...replaceFilters({
                              ...filtersList,
                              categories: category
                            }),
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
