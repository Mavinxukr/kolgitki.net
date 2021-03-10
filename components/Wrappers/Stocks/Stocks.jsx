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
import { clearStocks, getStocks } from '../../../redux/actions/stocks';
import {
  dataStocksSelector,
  isDataReceivedForStocks
} from '../../../utils/selectors';
import { cookies } from '../../../utils/getCookies';
import { getStockCategories } from '../../../services/stocks';
import { parseText } from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import styles from './Stocks.scss';
import { StocksContext } from '../../../context/StocksContext';
import CategoriesList from '../../CategoriesList/CategoriesList';

const getArraysForStocks = stocks => {
  const activeStocks = stocks.filter(item => item.active);
  const notActiveStocks = stocks.filter(item => !item.active);
  return {
    activeStocks,
    notActiveStocks
  };
};

const Stocks = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState(null);
  const { filters, addFilter, clearFilters } = React.useContext(StocksContext);
  const stocks = useSelector(dataStocksSelector);
  const isDataReceived = useSelector(isDataReceivedForStocks);
  const router = useRouter();
  const dispatch = useDispatch();

  const builfFilterFromRequest = () => {
    const f = filters.stocksFilters;
    const newF = { ...f };

    if (f.hasOwnProperty('brands')) {
      newF.brands = JSON.stringify(JSON.parse(f.brands).map(item => item.name));
    }
    if (f.hasOwnProperty('sizes')) {
      newF.sizes = JSON.stringify(JSON.parse(f.sizes).map(item => item.name));
    }
    if (f.hasOwnProperty('colors')) {
      newF.colors = JSON.stringify(JSON.parse(f.colors).map(item => item.name));
    }
    if (f.hasOwnProperty('attribute')) {
      newF.attribute = JSON.stringify(
        JSON.parse(f.attribute).map(item => item.value)
      );
    }
    if (f.hasOwnProperty('category_id')) {
      newF.category_id = f.category_id.id;
    }
    return newF;
  };

  const handleUpdateFilters = () => {
    dispatch(getStocks({}, builfFilterFromRequest()));
    getStockCategories({}).then(response => setCategories(response.data));
  };

  useEffect(() => {
    dispatch(clearStocks());
    handleUpdateFilters();
  }, [filters]);

  if (!categories || !isDataReceived) {
    return <Loader />;
  }
  console.log(categories);

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
              pathname: '/stock'
            }
          ]}
        />
        <div className={styles.row}>
          {isDesktopScreen ? (
            <div className={styles.leftBlock}>
              <CategoriesList
                isActions={true}
                allCategories={categories}
                usedCategories={null}
                filters={filters.stocksFilters}
                setCategoryInFilters={id =>
                  addFilter('stocksFilters', 'category_id', id)
                }
                clearCategotyInFilters={() => {
                  clearFilters('stocksFilters', ['category_id']);
                }}
              ></CategoriesList>
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
                  {/* <Pagination
                    pathName="/stock"
                    pageCount={stocks.last_page}
                    currentPage={stocks.current_page}
                  /> */}
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
