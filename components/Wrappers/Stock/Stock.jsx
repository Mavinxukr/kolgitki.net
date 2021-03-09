import React, { useEffect } from 'react';
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
import { getStockData } from '../../../redux/actions/stockData';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import {
  dataStockSelector,
  isDataReceivedForStock
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';
import StockProducts from '../StockProducts/StockProducts';
import { StocksContext } from '../../../context/StocksContext';

const Stock = ({ isDesktopScreen }) => {
  const {
    filters,
    addFilter,
    clearFilters,
    removeFilter,
    setSorting
  } = React.useContext(StocksContext);
  const stock = useSelector(dataStockSelector);
  const isDataReceived = useSelector(isDataReceivedForStock);
  const loading = useSelector(state => state.stockData.isFetch);
  const dispatch = useDispatch();
  const router = useRouter();

  const builfFilterFromRequest = () => {
    const f = filters.stockFilters;
    const newF = { ...f };

    if (f.hasOwnProperty('brands')) {
      newF.brands = JSON.stringify(JSON.parse(f.brands).map(item => item.id));
    }
    if (f.hasOwnProperty('sizes')) {
      newF.sizes = JSON.stringify(JSON.parse(f.sizes).map(item => item.id));
    }
    if (f.hasOwnProperty('colors')) {
      newF.colors = JSON.parse(f.colors)
        .map(item => item.name)
        .join();
    }
    if (f.hasOwnProperty('attribute')) {
      newF.attribute = JSON.stringify(
        JSON.parse(f.attribute).map(item => item.value)
      );
    }
    if (f.hasOwnProperty('categories')) {
      newF.categories = JSON.stringify(
        JSON.parse(f.categories).map(item => item.id)
      );
    }
    return newF;
  };

  const handleUpdateData = () => {
    dispatch(
      getStockData(builfFilterFromRequest(), router.query.sid.split('_')[0])
    );
  };

  useEffect(() => {
    handleUpdateData();
  }, [
    filters.stockFilters.categories,
    filters.stockFilters.sort_price,
    filters.stockFilters.sort_date,
    filters.stockFilters.sort_popular,
    filters.stockFilters.page
  ]);

  //add filters
  const setFilter = (categoryName, value) => {
    addFilter('stockFilters', categoryName, value);
  };
  //clear filters list
  const clearFiltersList = list => {
    clearFilters('stockFilters', list);
  };
  //remove one selected filter
  const removeOneFilter = (filterGroupName, filterItem) => {
    removeFilter('stockFilters', filterGroupName, filterItem);
  };
  //set sorting product
  const setStockSorting = (filter, value) => {
    setSorting('stockFilters', filter, value);
  };

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
              pathname: '/'
            },
            {
              id: 2,
              name: 'Акции',
              nameUa: 'Акції',
              pathname: '/stock'
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
          {!isDesktopScreen && (
            <h2>
              {parseText(
                cookies,
                'В акции участвуют',
                'В акції приймають участь'
              )}
            </h2>
          )}
          {isDesktopScreen && (
            <h1 className={styles.categoryName}>
              {filters.stockFilters.hasOwnProperty('categories')
                ? parseText(
                    cookies,
                    JSON.parse(filters.stockFilters.categories)[0].name,
                    JSON.parse(filters.stockFilters.categories)[0].name_ua
                  )
                : 'Каталог'}
            </h1>
          )}
          <p className={styles.countProducts}>
            {getCorrectWordCount(
              stock?.goods.data.length,
              parseText(
                cookies,
                ['товар', 'товара', 'товаров'],
                ['товар', 'товару', 'товарів']
              )
            )}
          </p>
        </div>

        {/* {stock && <StockProducts products={stock} />} */}

        <Products
          usedFilters={filters.stockFilters}
          allCategories={stock.filters[0].categories}
          usedCategories={null}
          setFilter={setFilter}
          clearFilters={clearFiltersList}
          setSorting={setStockSorting}
          removeFilter={removeOneFilter}
          setPage={() => console.log(1)}
          productsList={stock.goods}
          getProductsList={() => handleUpdateData()}
          // classNameWrapper={styles.productsWrapper}
          allFiltersSizes={stock.filters[2].sizes}
          allFilrersBrands={stock.filters[0].brands}
          allFilrersColors={stock.filters[0].colors}
          allFilrersMaterials={stock.filters[1].attributes[0].value}
          allFilrersDensity={stock.filters[1].attributes[1].value}
          loading={loading}
          isProducts={false}
          isSale={true}
          isPresent={false}
        />
      </div>
    </MainLayout>
  );
};

export default withResponse(Stock);
