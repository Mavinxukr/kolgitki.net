import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Products from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import Loader from '../../Loader/Loader';
import {
  dataCatalogProductsSelector,
  isDataReceivedForCatalogProducts,
} from '../../../utils/selectors';
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
  readFiltersFromUrl,
  setFiltersInCookies,
  getUrlArr,
  getCorrectWordCount,
  parseText, getArrOfFilters
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './Catalog.scss';
import {
  getAllCategories,
  getAllFilters,
  getCollectionsData,
} from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import { arrSelect } from '../../../utils/fakeFetch/arrSelect';

const getCategoryName = (cookie) => {
  const filters = cookie.get('filters');
  return (
    (filters
      && filters.collection_id
      && filters.collection_id[0].collectionName)
    || (filters && filters.categories && filters.categories[0].categoryName)
    || parseText(cookie, 'Категории', 'Категорії')
  );
};

const Catalog = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [isChangePage, setIsChangePage] = useState(false);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateFilters = () => {
    const filtersCookies = cookies.get('filters');
    dispatch(
      getCatalogProducts({}, createBodyForRequestCatalog(filtersCookies)),
    );
    getAllCategories({}).then(response => setCategories(response.data));
    getAllFilters({
      category_id:
        (filtersCookies
          && filtersCookies.categories
          && filtersCookies.categories.length > 0
          && filtersCookies.categories[filtersCookies.categories.length - 1].id)
        || 0,
    }).then(response => setFilters(response.data));
    getCollectionsData({}).then(response => setCollectionData(response.data));
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
    if (
      !cookies.get('filters')
      && filters
      && categories.length
      && getUrlArr(router.asPath).length
      && collectionData
    ) {
      setFiltersInCookies(
        cookies,
        readFiltersFromUrl(router.asPath, categories, filters, collectionData),
      );
    }

    if (
      !isChangePage
      && getUrlArr(router.asPath).length
      && cookies.get('filters')
    ) {
      handleUpdateFilters();
      setIsChangePage(true);
    }
  }, [categories, collectionData]);

  if (!isDataReceived || !filters || categories.length === 0) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.catalog}>
        <div className={styles.header}>
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
                name: 'Категории',
                nameUa: 'Категорії',
                pathname: '/Products',
              },
              ...(cookies.get('filters')?.categories?.map(item => ({
                id: item.id,
                name: item.categoryName,
                nameUa: item.categoryName,
                pathname: `/Products/${item.name}`,
              })) || []),
            ]}
          />
          {(isDesktopScreen && (
            <>
              <FilterIndicators
                classNameWrapper={styles.filterIndicatorsWrapper}
                buttonValue="Удалить фильтры"
                buttonValueUa="Видалити фільтри"
                router={router}
                pathname="/Products"
              />
              <p
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '90px',
                }}
              >
                {getCorrectWordCount(catalog?.data?.length, [
                  parseText(cookies, 'товар', 'товар'),
                  parseText(cookies, 'товара', 'товарти'),
                  parseText(cookies, 'товаров', 'товарів'),
                ])}
              </p>
            </>
          )) || (
            <p className={styles.titleCategory}>{getCategoryName(cookies)}</p>
          )}
        </div>
        <h1 className={styles.title}>Колготки</h1>
        <Products
          products={catalog}
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1,
            [styles.marginTop]: getArrOfFilters(arrSelect, cookies).length > 0,
          })}
          router={router}
          pathname="/Products"
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...createBodyForRequestCatalog(cookies.get('filters')),
                  page: catalog.current_page + 1 || 1,
                  language: cookies.get('language').lang,
                  search: cookies.get('search'),
                },
                true,
              ),
            );
          }}
          categories={categories}
          filters={filters}
        />
      </div>
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Catalog);
