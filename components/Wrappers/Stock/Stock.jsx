import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './Stock.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import StockVideo from '../../StockVideo/StockVideo';
import StockTimer from '../../StockTimer/StockTimer';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import {
  getStockData,
  getStockDataSuccess
} from '../../../redux/actions/stockData';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import {
  dataStockSelector,
  isDataReceivedForStock,
  userDataSelector
} from '../../../utils/selectors';
import CategoriesList from '../../CategoriesList/CategoriesList';
import FiltersList from '../../FiltersList/FiltersList';
import {
  importFiltersInQuery,
  removeOneFilter,
  removeUnnecessaryFilters
} from '../../../utils/products';
import ProductSort from '../../ProductSort/ProductSort';
import ProductsFilters from '../Products/ProductsFilters/ProductsFilters';
import ProductLoader from '../../ProductLoader/ProductLoader';
import { Noresult } from '../Products/Noresult/Noresult';
import { ProductsListOpt } from '../Products/ProductsListOpt/ProductsListOpt';
import { ProductsList } from '../Products/ProductsList/ProductsList';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';

const Stock = ({ filters: serverFilters, property: serverProperty }) => {
  const [filters, setFilters] = useState(serverFilters);

  const stock = useSelector(dataStockSelector);
  const userData = useSelector(userDataSelector);
  const loading = useSelector(state => state.stockData.isFetch);

  const dispatch = useDispatch();
  const router = useRouter();

  const getCatalogProducts = f => {
    dispatch(getStockData(f, router.query.sid));
  };

  const replaceFilters = f => {
    const replaceFilters = {};
    Object.keys(f).map(filter => {
      if (filter === 'dencity' || filter === 'materials') {
        replaceFilters.attribute = `${f[filter]}${
          replaceFilters.hasOwnProperty('attribute')
            ? '|' + replaceFilters.attribute
            : ''
        }`;
      } else {
        replaceFilters[filter] = f[filter];
      }
    });
    return replaceFilters;
  };

  useEffect(() => {
    if (serverProperty) {
      dispatch(getStockDataSuccess(serverProperty));
    } else {
      const filter = { ...router.query };
      delete filter.sid;
      getCatalogProducts(replaceFilters(filters));
    }
  }, []);

  useEffect(() => {
    const newFilers = { ...router.query };
    delete newFilers.sid;

    setFilters(newFilers);

    getCatalogProducts(replaceFilters(newFilers));
  }, [router.query]);

  if (!stock) {
    return <Loader />;
  }
  console.log(stock);
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Главная',
              nameUa: 'Головна',
              pathname: '/'
            },
            {
              id: 2,
              name: 'Акции',
              nameUa: 'Акції',
              pathname: 'stock'
            },
            {
              id: 3,
              name: stock?.action.name,
              nameUa: stock?.action.name_uk
            }
          ]}
        />
        {stock?.action && <StockVideo stock={stock?.action} />}
        <StockTimer stock={stock?.action} />
        <div className={styles.stockTextWrapper}>
          <h2 className={styles.title}>
            {parseText(cookies, 'Условия акции', 'Умови акції')}
          </h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: parseText(
                cookies,
                stock?.action.description,
                stock?.action.description_uk
              )
            }}
          />
        </div>

        <div className={styles.productsTitle}>
          <h2 className={styles.mobileTitle}>
            {parseText(
              cookies,
              'В акции участвуют',
              'В акції приймають участь'
            )}
          </h2>
          <span className={styles.count}>
            {getCorrectWordCount(stock.goods.data.length, [
              'товар',
              'товара',
              'товаров'
            ])}
          </span>
        </div>
        <div className={styles.products_wrapper}>
          <div className={styles.products_categories}>
            <CategoriesList
              usedCategories={null}
              allCategories={stock.filters[0].categories}
              selectedCategory={filters.categories || null}
              setLink={category =>
                importFiltersInQuery(
                  {
                    categories: JSON.stringify([category.id])
                  },
                  router
                )
              }
              clear={() => router.push(`${router.asPath.split('?')[0]}`)}
              isStock
            ></CategoriesList>
          </div>
          <div className={styles.products_content}>
            <div className={styles.products_header}>
              <div className={styles.products_desctop}>
                <FiltersList
                  loading={loading}
                  filters={filters}
                  updateProducts={importFiltersInQuery}
                  clearFilters={() => {
                    router.push(`${router.asPath.split('?')[0]}`);
                  }}
                  installedFilters={removeUnnecessaryFilters(filters, [
                    'brands',
                    'sizes',
                    'colors',
                    'dencity',
                    'materials'
                  ])}
                  removeOneFilter={(filter, name) => {
                    removeOneFilter(setFilters, filter, name);
                  }}
                ></FiltersList>
                <ProductsFilters
                  installedFilters={filters}
                  setFilters={setFilters}
                  removeOneFilter={(filter, name) => {
                    removeOneFilter(setFilters, filter, name);
                  }}
                  allFiltersSizes={stock.filters[2].sizes}
                  allFilrersBrands={stock.filters[0].brands}
                  allFilrersColors={stock.filters[0].colors}
                  allFilrersMaterials={stock.filters[1].attributes[0].value}
                  allFilrersDensity={stock.filters[1].attributes[1].value}
                ></ProductsFilters>
                <ProductSort
                  setSorting={sort => {
                    const f = { ...filters };
                    delete f.sort_date;
                    delete f.sort_price;
                    importFiltersInQuery(
                      {
                        ...f,
                        ...sort
                      },
                      router
                    );
                  }}
                  usedSort={filters}
                ></ProductSort>
              </div>
              <div className={styles.products_mobile}>
                <CategoriesMobile
                  usedCategories={null}
                  allCategories={stock.filters[0].categories}
                  selectedCategory={filters.categories || null}
                  setLink={category =>
                    importFiltersInQuery(
                      {
                        categories: JSON.stringify([category.id])
                      },
                      router
                    )
                  }
                  clear={() => router.push(`${router.asPath.split('?')[0]}`)}
                  isStock
                />

                <FiltersMobile
                  loading={loading}
                  installedFilters={filters}
                  setFilters={setFilters}
                  removeOneFilter={(filter, name) => {
                    removeOneFilter(setFilters, filter, name);
                  }}
                  setSorting={sort => {
                    const f = { ...filters };
                    delete f.sort_date;
                    delete f.sort_price;
                    importFiltersInQuery(
                      {
                        ...f,
                        ...sort
                      },
                      router
                    );
                  }}
                  clearFilters={() => {
                    router.push(`${router.asPath.split('?')[0]}`);
                  }}
                  updateProducts={importFiltersInQuery}
                  allFiltersSizes={stock.filters[2].sizes}
                  allFilrersBrands={stock.filters[0].brands}
                  allFilrersColors={stock.filters[0].colors}
                  allFilrersMaterials={stock.filters[1].attributes[0].value}
                  allFilrersDensity={stock.filters[1].attributes[1].value}
                />
              </div>
            </div>
            <div className={styles.products_goods}>
              {loading ? (
                <ProductLoader />
              ) : stock.goods.data?.length > 0 ? (
                userData?.role?.id === 3 ? (
                  <ProductsListOpt products={stock.goods.data} />
                ) : (
                  <ProductsList
                    products={stock.goods.data}
                    userId={userData?.role?.id}
                  />
                )
              ) : (
                <Noresult></Noresult>
              )}
            </div>
            <div className={styles.products_footer}>
              {stock.goods.last_page !== 1 && (
                <>
                  <Pagination
                    pageCount={stock.goods?.last_page}
                    currentPage={stock.goods?.current_page}
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
                  {stock.goods?.last_page !== stock.goods?.current_page && (
                    <Button
                      buttonType="button"
                      title="Показать ещё +25"
                      titleUa="Показати ще +25"
                      viewType="pagination"
                      classNameWrapper={styles.paginationButtonWrapper}
                      onClick={() => {
                        const f = { ...filters };
                        f.page = stock.goods.current_page + 1;
                        dispatch(getStockData(f, router.query.sid, true));
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stock;
