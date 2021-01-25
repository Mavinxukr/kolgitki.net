import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Products from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
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
  parseText,
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
    || (filters && filters.categories && filters.categories[0]?.categoryName)
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
    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then((response) => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
    getAllFilters({
      category_id:
        (filtersCookies
          && filtersCookies.categories
          && filtersCookies.categories.length > 0
          && filtersCookies.categories[filtersCookies.categories.length - 1].id)
        || 0,
    }).then(response => setFilters(response.data));
    getCollectionsData({}).then((response) => {
      setCollectionData(response.data);
    });
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

  const crumbs =
    filters[0].categories[filters[0].categories.length - 1].crumbs_object[0]
      .id === 99
      ? []
      : filters[0].categories[filters[0].categories.length - 1].crumbs_object;

  return (
    <MainLayout>
      <style jsx global>
        {`@media screen and (max-width: 768px) {
          .Catalog_goodsNumber {
            display: flex;
            justify-content: flex-end;
            position: absolute;
            top: 130px;
            right: 25px;
          }
        }`}
      </style>
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
                pathname: '/novinki',
              },
              ...(crumbs.map(item => ({
                id: item.id,
                name: item.name,
                nameUa: item.name_ua,
                pathname: `/Products/${item.slug}`,
              })) || []),
            ]}
          />
        </div>
        <h1
          className={cx(styles.title, {
            [styles.titleCategory]: !isDesktopScreen,
          })}
        >
          {parseText(
            cookies,
            crumbs[crumbs.length - 1]?.name,
            crumbs[crumbs.length - 1]?.name_ua,
          ) || 'Каталог'}
        </h1>
        <Products
          products={catalog}
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1,
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
              ),
            );
          }}
          categories={categories}
          filters={filters}
        />
      </div>
      <p
        className={styles.goodsNumber}
      >
        {getCorrectWordCount(catalog?.total, [
          parseText(cookies, 'товар', 'товар'),
          parseText(cookies, 'товара', 'товарти'),
          parseText(cookies, 'товаров', 'товарів'),
        ])}
      </p>
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Catalog);
