import React, { useContext, useEffect, useState } from 'react';
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
  isDataReceivedForCatalogProducts
} from '../../../utils/selectors';
import {
  clearCatalogProducts,
  getCatalogProducts
} from '../../../redux/actions/catalogProducts';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
  readFiltersFromUrl,
  setFiltersInCookies,
  getUrlArr,
  getCorrectWordCount,
  parseText
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './Catalog.scss';
import {
  getAllCategories,
  getAllFilters,
  getCategoryBySlug,
  getCollectionsData
} from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import { arrSelect } from '../../../utils/fakeFetch/arrSelect';
import { ProductsContext } from '../../../context/ProductsContext';

const getCategoryName = cookie => {
  const filters = cookie.get('filters');
  return (
    (filters &&
      filters.collection_id &&
      filters.collection_id[0].collectionName) ||
    (filters && filters.categories && filters.categories[0]?.categoryName) ||
    parseText(cookie, 'Категории', 'Категорії')
  );
};

const Catalog = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);
  const { productsFilters, addProductsFilter } = useContext(ProductsContext);
  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);
  const router = useRouter();
  const dispatch = useDispatch();

  const builfFilterFromRequest = () => {
    const f = productsFilters;
    const newF = { ...f };
    if (f.hasOwnProperty('categories')) {
      newF.categories = JSON.stringify([JSON.parse(f.categories)[0].id]);
    }
    if (f.hasOwnProperty('attribute')) {
      newF.attribute = JSON.stringify(
        JSON.parse(f.attribute).map(item => item.value)
      );
    }
    if (f.hasOwnProperty('brands')) {
      newF.brands = JSON.stringify(JSON.parse(f.brands).map(item => item.name));
    }
    if (f.hasOwnProperty('sizes')) {
      newF.sizes = JSON.stringify(JSON.parse(f.sizes).map(item => item.name));
    }
    if (f.hasOwnProperty('colors')) {
      newF.colors = JSON.stringify(JSON.parse(f.colors).map(item => item.name));
    }
    return newF;
  };

  const handleUpdateFilters = () => {
    dispatch(clearCatalogProducts());
    dispatch(getCatalogProducts({}, builfFilterFromRequest()));

    let category_id = productsFilters.hasOwnProperty('categories')
      ? JSON.parse(productsFilters.categories)[0].id
      : null;
    getAllFilters({
      category_id: category_id
    }).then(response => {
      setFilters(response.data);
    });

    // //странный запрос для глявной страницы
    // getCollectionsData({}).then(response => {
    //   console.log(response.data);
    //   setCollectionData(response.data);
    // });
  };

  useEffect(() => {
    if (
      !productsFilters.hasOwnProperty('categories') &&
      router.query.hasOwnProperty('slug') &&
      router.query.slug.length > 0
    ) {
      let slug = getCategoryBySlug(
        router.query.slug[router.query.slug.length - 1]
      ).then(response => {
        if (response.data) {
          addProductsFilter('categories', JSON.stringify([response.data]));
        }
      });
    }
    if (localStorage.getItem('getAllCategories')) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
  }, []);

  useEffect(() => {
    handleUpdateFilters();
  }, [productsFilters]);

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
      <div className={styles.catalog}>
        <div className={styles.header}>
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
                name: 'Категории',
                nameUa: 'Категорії',
                pathname: '/novinki'
              }
              // ...(crumbs.map(item => ({
              //   id: item.id,
              //   name: item.name,
              //   nameUa: item.name_ua,
              //   pathname: `/Products/${item.slug}`
              // })) || [])
            ]}
          />
        </div>
        <h1
          className={cx(styles.title, {
            [styles.titleCategory]: !isDesktopScreen
          })}
        >
          {parseText(
            cookies,
            crumbs[crumbs.length - 1]?.name,
            crumbs[crumbs.length - 1]?.name_ua
          ) || 'Каталог'}
          <p
            className={styles.goodsNumber}
          >
            {getCorrectWordCount(catalog?.total, [
              parseText(cookies, 'товар', 'товар'),
              parseText(cookies, 'товара', 'товарти'),
              parseText(cookies, 'товаров', 'товарів'),
            ])}
          </p>
        </h1>
        <Products
          products={catalog}
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1
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
                  search: cookies.get('search')
                }
              )
            );
          }}
          categories={categories}
          filters={filters}
        />
      </div>
<<<<<<< HEAD
=======
      <p className={styles.goodsNumber}>
        {getCorrectWordCount(catalog?.total, [
          parseText(cookies, 'товар', 'товар'),
          parseText(cookies, 'товара', 'товарти'),
          parseText(cookies, 'товаров', 'товарів')
        ])}
      </p>
>>>>>>> lukin
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Catalog);
