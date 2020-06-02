import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Categories from '../../Categories/Categories';
import StocksCard from '../../StocksCard/StocksCard';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import MobileNav from '../../MobileNav/MobileNav';
import { getStocks } from '../../../redux/actions/stocks';
import {
  dataStocksSelector,
  isDataReceivedForStocks,
} from '../../../utils/selectors';
import { cookies } from '../../../utils/getCookies';
import { getStockCategories } from '../../../services/stocks';
import {
  deleteFiltersFromCookie,
  readFiltersFromUrl, setFiltersInCookies,
  getUrlArr,
} from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import styles from './Stocks.scss';

const getArraysForStocks = (stocks) => {
  const activeStocks = stocks.filter(item => item.active);
  const notActiveStocks = stocks.filter(item => !item.active);
  return {
    activeStocks,
    notActiveStocks,
  };
};

const Stocks = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState(null);
  const [isChangePage, setIsChangePage] = useState(false);

  const stocks = useSelector(dataStocksSelector);
  const isDataReceived = useSelector(isDataReceivedForStocks);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleUpdateFilters = () => {
    const filtersCookies = cookies.get('filters');
    dispatch(
      getStocks(
        {},
        {
          category_id:
            (filtersCookies
              && filtersCookies.categories
              && filtersCookies.categories[0].id)
            || '',
          page: (filtersCookies && filtersCookies.page) || '',
        },
      ),
    );
    getStockCategories({}).then(response => setCategories(response.data));
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
    if (!cookies.get('filters') && categories && getUrlArr(router.asPath).length) {
      setFiltersInCookies(cookies, readFiltersFromUrl(router.asPath, categories));
    }

    if (!isChangePage && getUrlArr(router.asPath).length && cookies.get('filters')) {
      const filtersCookies = cookies.get('filters');
      dispatch(
        getStocks(
          {},
          {
            category_id:
              (filtersCookies
                && filtersCookies.categories
                && filtersCookies.categories[0].id)
              || '',
            page: (filtersCookies && filtersCookies.page) || '',
          },
        ),
      );
      setIsChangePage(true);
    }
  }, [categories]);

  if (!categories || !isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Главная',
              pathname: '/',
            },
            {
              id: 2,
              name: 'Акции',
            },
          ]}
        />
        <div className={styles.row}>
          {isDesktopScreen ? (
            <div className={styles.leftBlock}>
              <Categories
                arrSubCategories={categories}
                pathname="/stock"
                router={router}
                stock
              />
            </div>
          ) : (
            <div
              className={styles.navPanelMobile}
              uk-slider="autoplay:false;finite:true;"
            >
              <MobileNav
                arrOfNavItems={categories}
                router={router}
                mainRoute="/stock"
              />
            </div>
          )}
          {(stocks.data.length > 0 && (
            <div className={styles.rightBlock}>
              {!!getArraysForStocks(stocks.data).activeStocks.length && (
                <>
                  <h3 className={styles.title}>Акции</h3>
                  <div className={styles.cards}>
                    {getArraysForStocks(stocks.data).activeStocks.map(item => (
                      <StocksCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
              {!!getArraysForStocks(stocks.data).notActiveStocks.length && (
                <>
                  <h3 className={styles.title}>Архив акций</h3>
                  <div className={styles.cards}>
                    {getArraysForStocks(stocks.data).notActiveStocks.map(
                      item => (
                        <StocksCard key={item.id} item={item} />
                      ),
                    )}
                  </div>
                </>
              )}
              <div className={styles.pagination}>
                <Pagination
                  pathName="/stock"
                  pageCount={stocks.last_page}
                  currentPage={stocks.current_page}
                />
                <Button
                  buttonType="button"
                  title="Показать ещё +25"
                  viewType="pagination"
                  disabled={stocks.current_page + 1 > stocks.last_page}
                  onClick={() => {
                    dispatch(
                      getStocks(
                        {},
                        {
                          category_id:
                            (cookies.get('filters')
                              && cookies.get('filters').categories
                              && cookies.get('filters').categories[0].id)
                            || '',
                          page: stocks.current_page + 1 || 1,
                        },
                        true,
                      ),
                    );
                  }}
                  classNameWrapper={styles.paginationButton}
                />
              </div>
            </div>
          )) || <p className={styles.notFoundText}>Ничего не найдено</p>}
        </div>
      </div>
    </MainLayout>
  );
};

export default withResponse(Stocks);
