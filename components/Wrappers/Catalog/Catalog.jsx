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
  getCorrectWordCount,
  parseText
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './Catalog.scss';
import {
  getAllCategories,
  getAllFilters,
  getCategoryBySlug
} from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import { ProductsContext } from '../../../context/ProductsContext';

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
      newF.attribute = JSON.parse(f.attribute)
        .map(item => item.value)
        .join(',');
    }
    if (f.hasOwnProperty('brands')) {
      newF.brands = JSON.parse(f.brands)
        .map(item => item.name)
        .join(',');
    }
    if (f.hasOwnProperty('sizes')) {
      newF.sizes = JSON.parse(f.sizes)
        .map(item => item.name)
        .join(',');
    }
    if (f.hasOwnProperty('colors')) {
      newF.colors = JSON.parse(f.colors)
        .map(item => item.name)
        .join(',');
    }
    return newF;
  };

  const handleUpdateFilters = () => {
    // dispatch(clearCatalogProducts());
    dispatch(getCatalogProducts({}, builfFilterFromRequest()));

    let category_id = productsFilters.hasOwnProperty('categories')
      ? JSON.parse(productsFilters.categories)[0].id
      : null;
    getAllFilters({
      category_id: category_id
    }).then(response => {
      setFilters(response.data);
    });
  };

  useEffect(() => {
    if (
      !productsFilters.hasOwnProperty('categories') &&
      router.query.hasOwnProperty('slug') &&
      router.query.slug.length > 0
    ) {
      getCategoryBySlug(router.query.slug[router.query.slug.length - 1]).then(
        response => {
          if (response.data) {
            addProductsFilter('categories', JSON.stringify([response.data]));
          }
        }
      );
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
  }, [
    productsFilters.categories,
    productsFilters.sort_price,
    productsFilters.sort_date,
    productsFilters.sort_popular,
    productsFilters.page
  ]);

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
                pathname: '/Products'
              }
              // ...(crumbs.map(item => {
              //   console.log('cata', item);

              //   return {
              //     id: item.id,
              //     name: item.name,
              //     nameUa: item.name_ua,
              //     pathname: `/Products/${item.slug}`
              //   };
              // }) || [])
            ]}
          />
        </div>
        <h1
          className={cx(styles.title, {
            [styles.titleCategory]: !isDesktopScreen
          })}
        >
          {/* {parseText(
            cookies,
            crumbs[crumbs.length - 1]?.name,
            crumbs[crumbs.length - 1]?.name_ua
          ) || 'Каталог'} */}
          <p className={styles.goodsNumber}>
            {getCorrectWordCount(catalog?.total, [
              parseText(cookies, 'товар', 'товар'),
              parseText(cookies, 'товара', 'товарти'),
              parseText(cookies, 'товаров', 'товарів')
            ])}
          </p>
        </h1>
        <Products
          products={catalog}
          getProductHandle={() => handleUpdateFilters()}
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
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Catalog);
