import React, { useEffect, useState } from 'react';
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
import { getStockData, clearStockData } from '../../../redux/actions/stockData';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
  getUrlArr,
  getCorrectWordCount,
  parseText,
} from '../../../utils/helpers';
import { getAllFilters } from '../../../services/home';
import { cookies } from '../../../utils/getCookies';
import {
  dataStockSelector,
  isDataReceivedForStock,
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';

const Stock = ({ isDesktopScreen }) => {
  const [filters, setFilters] = useState(null);
  const [isChangePage, setIsChangePage] = useState(false);

  const stock = useSelector(dataStockSelector);
  const isDataReceived = useSelector(isDataReceivedForStock);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleUpdateData = () => {
    dispatch(
      getStockData(
        createBodyForRequestCatalog(cookies.get('filters')),
        router.query.sid.split('_')[0],
      ),
    );
    getAllFilters({ category_id: 0 }).then(response => setFilters(response.data));
  };

  useEffect(() => {
    dispatch(clearStockData());
    handleUpdateData();
  }, [router.query]);

  useEffect(() => {
    handleUpdateData();

    return () => {
      deleteFiltersFromCookie(cookies);
    };
  }, []);

  useEffect(() => {
    handleUpdateData();
  }, [router]);

  useEffect(() => {
    if (
      !isChangePage
      && getUrlArr(router.asPath).length
      && cookies.get('filters')
    ) {
      handleUpdateData();
      setIsChangePage(true);
    }
  }, [stock, filters]);

  if (!isDataReceived) {
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
              nameUa: 'Головна',
              pathname: '/',
            },
            {
              id: 2,
              name: 'Акции',
              nameUa: 'Акції',
              pathname: '/stock',
            },
            {
              id: 3,
              name: stock?.action.name,
              nameUa: stock?.action.name_uk,
            },
          ]}
        />
        {stock?.action && <StockVideo stock={stock?.action} />}
        <StockTimer stock={stock?.action} />
        <div className={styles.stockTextWrapper}>
          <h2 className={styles.title}>{parseText(cookies, 'Условия акции', 'Умови акції')}</h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: parseText(
                cookies,
                stock?.action.description,
                stock?.action.description_uk,
              ),
            }}
          />
        </div>
        <div className={cx(styles.productsWrapper, {
          [styles.productsWrapperWithoutPaginate]: stock?.goods.last_page === 1,
        })}
        >
          <div className={styles.productsTitle}>
            {!isDesktopScreen && (
              <h2>
                {parseText(
                  cookies,
                  'В акции участвуют',
                  'В акції приймають участь',
                )}
              </h2>
            )}
            <p className={styles.countProducts}>
              {getCorrectWordCount(
                stock?.goods.data.length,
                parseText(
                  cookies,
                  ['товар', 'товара', 'товаров'],
                  ['товар', 'товару', 'товарів'],
                ),
              )}
            </p>
          </div>
          <Products
            products={stock?.goods}
            filters={stock?.filters}
            categories={stock?.filters[0].categories}
            pathname={`/stock/${router.query.sid.split('_')[0]}`}
            router={router}
            action={() => {
              dispatch(
                getStockData(
                  {
                    ...createBodyForRequestCatalog(cookies.get('filters')),
                    page: stock?.goods.current_page + 1 || 1,
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
