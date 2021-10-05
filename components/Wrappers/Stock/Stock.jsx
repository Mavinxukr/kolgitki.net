import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Stock.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import StockVideo from '../../StockVideo/StockVideo';
import StockTimer from '../../StockTimer/StockTimer';
import Loader from '../../Loader/Loader';
import {
  getStockData,
  getStockDataSuccess
} from '../../../redux/actions/stockData';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { dataStockSelector, userDataSelector } from '../../../utils/selectors';
import { buildFiltersBySlug, replaceFilter } from '../../../utils/products';

import { replaceFilters } from './helpers';
import { StockProducts } from './StockProducts/StockProducts';

const Stock = ({
  allFilters: serverAllFilters,
  action: serverActions,
  usedFilters: serverUsedFilters,
  otherFilters: serverOtherFilters,
  categoryData: serverCategoryData
}) => {
  const [allFilters, setAllFilters] = useState(serverAllFilters);
  const [otherFilters, setOtherFilters] = useState(serverOtherFilters);
  const [filtersList, setFiltersList] = useState(serverUsedFilters);
  const [category, setCategory] = useState(serverCategoryData);
  const [updateData, setUpdateData] = useState(false);
  const [goods, setGoods] = useState(null);

  const stock = useSelector(dataStockSelector);
  const loading = useSelector(state => state.stockData.isFetch);

  const dispatch = useDispatch();
  const router = useRouter();

  const getCatalogProducts = f => {
    dispatch(getStockData(f, router.query.sid));
  };
  const importFiltersInQuery = filter => {
    let query = '';
    Object.keys(filter).forEach(
      f =>
        (query += `${f}=${filter[f].map(
          item => item.slug || item.crumbs || item.name
        )}&`)
    );

    if (otherFilters) {
      Object.keys(otherFilters).map(
        of => (query += `${of}=${otherFilters[of]}&`)
      );
    }
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  useEffect(() => {
    let allFilters = {};

    if (stock) {
      allFilters = replaceFilter(stock.filters);
      allFilters.materials = allFilters.attributes[0].value;
      allFilters.density = allFilters.attributes[1].value;
      delete allFilters.attributes;

      setAllFilters(allFilters);
      setGoods(stock.goods);
    }
  }, [stock]);

  useEffect(() => {
    if (serverActions) {
      dispatch(getStockDataSuccess(serverActions));
    } else {
      getCatalogProducts({});
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      const newFilers = { ...router.query };
      delete newFilers.sid;

      if (router.query.sid !== stock.action.slug) {
        getCatalogProducts({});
      } else {
        let categoryData = [];

        if (newFilers.hasOwnProperty('categories')) {
          const categoryName = newFilers.categories;
          if (allFilters.hasOwnProperty('categories')) {
            categoryData = [
              ...allFilters.categories.filter(
                category => category.crumbs === categoryName
              )
            ];
          }
          delete newFilers.categories;
        }
        setCategory(categoryData);

        //build filters from slugs
        const usedFilters = buildFiltersBySlug(newFilers, allFilters);

        setFiltersList(usedFilters);

        const otherFilters = { ...newFilers };
        delete otherFilters.colors;
        delete otherFilters.sizes;
        delete otherFilters.brands;
        delete otherFilters.density;
        delete otherFilters.materials;
        setOtherFilters(otherFilters);

        getCatalogProducts({
          ...replaceFilters({ ...usedFilters, categories: categoryData }),
          ...otherFilters
        });
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  if (!stock || !allFilters) {
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
        <StockProducts
          usedCategories={null}
          allCategories={allFilters.categories}
          selectedCategory={category?.[0] || null}
          setCategory={category => {
            router.push(
              `${router.asPath.split('?')[0]}?categories=${category.crumbs}`
            );
          }}
          clearCategory={() => router.push(`${router.asPath.split('?')[0]}`)}
          loading={loading}
          allFilters={allFilters}
          usedFilters={filtersList}
          otherFilters={otherFilters}
          setFilters={setFiltersList}
          updateProducts={() =>
            importFiltersInQuery({
              ...filtersList,
              categories: category
            })
          }
          clearFilters={() => {
            router.push(`${router.asPath.split('?')[0]}`);
          }}
          removeOneFilter={(filter, item) => {
            setFiltersList(prev => {
              const next = { ...prev };
              next[filter] = next[filter].filter(f => f.id !== item.id);
              if (!next[filter].length) {
                delete next[filter];
              }
              if (Object.keys(next).length === 0) {
                importFiltersInQuery({ categories: category });
              }
              return next;
            });
          }}
          setSort={sort => {
            let queryaData = router.query;

            delete queryaData.sid;
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
          allFiltersSizes={allFilters.sizes}
          allFilrersBrands={allFilters.brands}
          allFilrersColors={allFilters.colors}
          allFilrersMaterials={allFilters.materials}
          allFilrersDensity={allFilters.density}
          goods={goods}
          setPage={number => {
            let queryaData = router.query;
            delete queryaData.sid;
            queryaData.page = number;

            let query = '';
            Object.keys(queryaData).forEach(
              filter => (query += `${filter}=${queryaData[filter]}&`)
            );
            query = query.slice(0, -1);

            router.push(`${router.asPath.split('?')[0]}?${query}`);
          }}
          action={() => {
            dispatch(
              getStockData(
                {
                  ...replaceFilters({
                    ...filtersList,
                    categories: category
                  }),
                  page: goods.current_page + 1
                },
                router.query.sid,
                true
              )
            );
          }}
        />
      </div>
    </MainLayout>
  );
};

export default Stock;
