import React, { useEffect } from 'react';
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
import { createBodyForRequestCatalog } from '../../../utils/helpers';
import {
  dataStockSelector,
  isDataReceivedForStock,
} from '../../../utils/selectors';

const Stock = () => {
  const stock = useSelector(dataStockSelector);
  const isDataReceived = useSelector(isDataReceivedForStock);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      getStockData(createBodyForRequestCatalog(router.query), router.query.slug),
    );
  }, []);

  useEffect(() => {
    if (router.query.sid) {
      delete router.query.sid;
    }
    dispatch(
      getStockData(createBodyForRequestCatalog(router.query), router.query.slug),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <BreadCrumbs items={[{
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
        }]}
        />
        <StockVideo stock={stock.action} />
        <StockTimer stock={stock.action} />
        <div>
          <h2>Условия акции</h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: stock.action.description }}
          />
        </div>
        <div className={styles.productsWrapper}>
          <p className={styles.countProducts}>{stock.goods.data.length} товара</p>
          <Products
            products={stock.goods}
            filters={stock.filters}
            categories={stock.filters[0].categories}
            pathname="/stock/[sid]"
            router={router}
            action={() => {
              dispatch(
                getStockData(
                  {
                    ...createBodyForRequestCatalog(router.query),
                    page: stock.goods.current_page + 1 || 1,
                  },
                  router.query.slug,
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

export default Stock;
