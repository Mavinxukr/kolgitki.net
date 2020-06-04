import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Stock.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import StockVideo from '../../StockVideo/StockVideo';
import StockTimer from '../../StockTimer/StockTimer';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import { getStockData } from '../../../redux/actions/stockData';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie, getUrlArr,
  readFiltersFromUrl,
  setFiltersInCookies,
} from '../../../utils/helpers';
import { getStockCategories } from '../../../services/stocks';
import { getAllFilters } from '../../../services/home';
import { cookies } from '../../../utils/getCookies';
import {
  dataStockSelector,
  isDataReceivedForStock,
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';

const Stock = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState(null);
  const [filters, setFilters] = useState(null);
  const [isChangePage, setIsChangePage] = useState(false);

  const stock = useSelector(dataStockSelector);
  const isDataReceived = useSelector(isDataReceivedForStock);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      getStockData(
        createBodyForRequestCatalog(cookies.get('filters')),
        router.query.sid.split('_')[0],
      ),
    );

    getStockCategories({})
      .then(response => setCategories(response.data));
    getAllFilters({ category_id: 0 })
      .then(response => setFilters(response.data));

    return () => {
      deleteFiltersFromCookie(cookies);
    };
  }, []);

  useEffect(() => {
    dispatch(
      getStockData(
        createBodyForRequestCatalog(cookies.get('filters')),
        router.query.sid.split('_')[0],
      ),
    );
  }, [router]);

  useEffect(() => {
    if (!cookies.get('filters') && categories && filters) {
      setFiltersInCookies(cookies, readFiltersFromUrl(router.asPath, categories, filters));
    }

    if (!isChangePage && getUrlArr(router.asPath).length && cookies.get('filters')) {
      dispatch(
        getStockData(
          createBodyForRequestCatalog(cookies.get('filters')),
          router.query.sid.split('_')[0],
        ),
      );

      setIsChangePage(true);
    }
  }, [categories, filters]);

  if (!isDataReceived || !categories) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.wrapper}>
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
              pathname: '/stock',
            },
            {
              id: 3,
              name: stock.action.name,
            },
          ]}
        />
        <StockVideo stock={stock.action} />
        <StockTimer stock={stock.action} />
        <div className={styles.stockTextWrapper}>
          <h2>Условия акции</h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: stock.action.description }}
          />
        </div>
        <div className={styles.productsWrapper}>
          <div className={styles.productsTitle}>
            {!isDesktopScreen && <h2>В акции участвуют</h2>}
            <p className={styles.countProducts}>
              {stock.goods.data.length} товара
            </p>
          </div>
          <Products
            products={stock.goods}
            filters={stock.filters}
            categories={categories}
            pathname={`/stock/${router.query.sid.split('_')[0]}`}
            router={router}
            action={() => {
              dispatch(
                getStockData(
                  {
                    ...createBodyForRequestCatalog(cookies.get('filters')),
                    page: stock.goods.current_page + 1 || 1,
                  },
                  router.query.sid.split('_')[0],
                  true,
                ),
              );
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default withResponse(Stock);
