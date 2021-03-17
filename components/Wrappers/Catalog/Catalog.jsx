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
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import styles from './Catalog.scss';
import {
  getAllCategories,
  getAllFilters,
  getCategoryBySlug
} from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import { ProductsContext } from '../../../context/ProductsContext';
import { ProductTitle } from '../../ProductTitle/ProductTitle';
import { set } from 'lodash';

const Catalog = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);
  const {
    productsFilters,
    addProductsFilter,
    clearProductsFilters,
    setProductsSorting,
    removeProductsFilter,
    setPage
  } = useContext(ProductsContext);
  const catalog = useSelector(dataCatalogProductsSelector);
  const loading = useSelector(state => state.catalogProducts.isFetch);
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
      getCategoryBySlug(router.query.slug[router.query.slug.length - 1])
        .then(response => {
          if (response.data) {
            addProductsFilter('categories', JSON.stringify([response.data]));
          }
        })
        .catch(e => console.log(e));
    }

    if (!router.query.hasOwnProperty('slug')) {
      clearProductsFilters(['categories']);
    }

    if (localStorage.getItem('getAllCategories')) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
    return () => {
      clearProductsFilters(['categories']);
    };
  }, []);

  useEffect(() => {
    router.query.hasOwnProperty('slug') && clearProductsFilters(['search']);
  }, [router.query]);

  useEffect(() => {
    handleUpdateFilters();
  }, [
    productsFilters.categories,
    productsFilters.sort_price,
    productsFilters.sort_date,
    productsFilters.sort_popular,
    productsFilters.page,
    productsFilters.search
  ]);
  useEffect(() => {
    if (
      !productsFilters.hasOwnProperty('brands') &&
      !productsFilters.hasOwnProperty('attribute') &&
      !productsFilters.hasOwnProperty('colors') &&
      !productsFilters.hasOwnProperty('sizes')
    )
      handleUpdateFilters();
  }, [
    productsFilters.brands,
    productsFilters.attribute,
    productsFilters.colors,
    productsFilters.sizes
  ]);

  if (!isDataReceived || !filters || categories.length === 0) {
    return <Loader />;
  }

  const crumbs = productsFilters.hasOwnProperty('categories')
    ? JSON.parse(productsFilters.categories)[0].crumbs_object.map(item => ({
        id: item.id,
        name: item.name,
        nameUa: item.name_ua,
        pathname: `/${item.slug}`
      }))
    : [];

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
                pathname: 'products'
              },
              ...crumbs
            ]}
          />
        </div>
        <ProductTitle
          categoryName={{
            name: crumbs[crumbs.length - 1]?.name,
            name_ua: crumbs[crumbs.length - 1]?.name_ua
          }}
          countGoods={catalog?.total}
        ></ProductTitle>
        <Products
          usedFilters={productsFilters}
          usedCategories={null}
          setFilter={addProductsFilter}
          clearFilters={clearProductsFilters}
          setSorting={setProductsSorting}
          removeFilter={removeProductsFilter}
          setPage={setPage}
          productsList={catalog}
          getProductsList={() => handleUpdateFilters()}
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1
          })}
          path="/products"
          allFiltersSizes={filters[3].sizes}
          allFilrersBrands={filters[0].brands}
          allFilrersColors={filters[0].colors}
          allFilrersMaterials={filters[1].attributes[0].value}
          allFilrersDensity={filters[1].attributes[1].value}
          loading={loading}
          isProducts={true}
          isSale={false}
          isPresent={false}
        />
      </div>
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Catalog);
