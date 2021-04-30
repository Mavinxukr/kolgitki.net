import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import StocksCard from '../../StocksCard/StocksCard';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import MobileNav from '../../MobileNav/MobileNav';
import {
  clearStocks,
  getStocks,
  getStocksSuccess
} from '../../../redux/actions/stocks';
import {
  dataStocksSelector,
  isDataReceivedForStocks
} from '../../../utils/selectors';
import { cookies } from '../../../utils/getCookies';
import { getStockCategories } from '../../../services/stocks';
import { parseText } from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import styles from './Stocks.scss';
import CategoriesList from '../../CategoriesList/CategoriesList';

const getArraysForStocks = stocks => {
  const activeStocks = stocks.filter(item => item.active);
  const notActiveStocks = stocks.filter(item => !item.active);
  return {
    activeStocks,
    notActiveStocks
  };
};

const Stocks = ({
  property: serverProperty,
  filters: serverFilters,
  goods: serverGoods
}) => {
  const [property, setProperty] = useState(serverProperty);
  const [filters, setFilters] = useState(serverFilters);

  const stocks = useSelector(dataStocksSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  const getProductHandle = f => {
    dispatch(getStocks({}, f));
  };

  const importFiltersInQuery = f => {
    let query = '';
    Object.keys(f).map(filter => (query += `${filter}=${f[filter]}&`));
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  async function loadProperty() {
    const response = await getStockCategories({});
    if (response.status) {
      setProperty(response.data);
    }
  }

  useEffect(() => {
    const filters = { ...router.query };
    delete filters.sid;

    if (!property) {
      loadProperty();
    }

    if (serverGoods) {
      dispatch(getStocksSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    const newFilers = { ...router.query };
    setFilters(newFilers);
    getProductHandle(newFilers);
  }, [router.query]);

  if (!property || !stocks.hasOwnProperty('data')) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <BreadCrumbs
          routerName="/stock"
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
            }
          ]}
        />
        <div className={styles.row}>
          <div className={styles.leftBlock}>
            <CategoriesList
              isSale={true}
              allCategories={property}
              usedCategories={null}
              selectedCategory={null}
              filters={filters}
              setLink={category => {
                importFiltersInQuery({
                  category_id: category.id
                });
              }}
              clear={() => router.push(`/stock`)}
            ></CategoriesList>
          </div>
          <div
            className={styles.navPanelMobile}
            uk-slider="autoplay:false;finite:true;"
          >
            <MobileNav
              arrOfNavItems={property}
              router={router}
              mainRoute="/stock"
            />
          </div>
          {(stocks.data.length > 0 && (
            <div className={styles.rightBlock}>
              {!!getArraysForStocks(stocks.data).activeStocks.length && (
                <>
                  <h3 className={styles.title}>
                    {parseText(cookies, 'Акции', 'Акції')}
                  </h3>
                  <div className={styles.cards}>
                    {getArraysForStocks(stocks.data).activeStocks.map(item => (
                      <StocksCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
              {!!getArraysForStocks(stocks.data).notActiveStocks.length && (
                <>
                  <h3 className={styles.title}>
                    {parseText(cookies, 'Архив акций', 'Архів акцій')}
                  </h3>
                  <div className={styles.cards}>
                    {getArraysForStocks(stocks.data).notActiveStocks.map(
                      item => (
                        <StocksCard key={item.id} item={item} />
                      )
                    )}
                  </div>
                </>
              )}
              {stocks.last_page !== 1 && (
                <div className={styles.pagination}>
                  <Pagination
                    pageCount={stocks.last_page}
                    currentPage={stocks.current_page}
                    setPage={number => {
                      const newFilters = { ...filters };
                      newFilters.page = number;
                      let query = '';

                      Object.keys(newFilters).map(
                        filter => (query += `${filter}=${newFilters[filter]}&`)
                      );

                      query = query.slice(0, -1);
                      router.push(`${router.asPath.split('?')[0]}?${query}`);
                    }}
                  />
                  {stocks.last_page !== stocks.current_page && (
                    <Button
                      buttonType="button"
                      title="Показать ещё +6"
                      titleUa="Показати ще +6"
                      viewType="pagination"
                      onClick={() => {
                        dispatch(
                          getStocks(
                            {},
                            {
                              ...filters.stocksFilters,
                              page: stocks.current_page + 1 || 1
                            },
                            true
                          )
                        );
                      }}
                      classNameWrapper={styles.paginationButton}
                    />
                  )}
                </div>
              )}
            </div>
          )) || (
            <p className={styles.notFoundText}>
              {parseText(cookies, 'Ничего не найдено', 'Нічого не знайдено')}
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default withResponse(Stocks);
