import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { func } from 'prop-types';
import Products from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Loader from '../../Loader/Loader';
import {
  dataCatalogProductsSelector,
  isDataReceivedForCatalogProducts
} from '../../../utils/selectors';
import {
  getCatalogProducts,
  getCatalogProductsSuccess
} from '../../../redux/actions/catalogProducts';
import styles from './Catalog.scss';
import {
  getAllCategories,
  getAllFilters,
  getCategoryBySlug
} from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import { ProductTitle } from '../../ProductTitle/ProductTitle';

const Catalog = ({
  goods: serverGoods,
  category: serverCategory,
  filters: serverFilters,
  filterListFromCategory: serverFiltersFromCategory
}) => {
  const [category, setCategory] = useState(serverCategory);
  const [updateData, setUpdateData] = useState(false);
  const [categories, setCategories] = useState(null);
  const [filters, setFilters] = useState(serverFilters);
  const [filterList, setFilterList] = useState(serverFiltersFromCategory);
  const catalog = useSelector(dataCatalogProductsSelector);
  const loading = useSelector(state => state.catalogProducts.isFetch);
  const [pageLoading, setPageLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const replaceFilters = f => {
    const replaceFilters = {};
    Object.keys(f).map(filter => {
      if (filter === 'dencity' || filter === 'materials') {
        replaceFilters.attribute = `${f[filter]}${
          replaceFilters.hasOwnProperty('attribute')
            ? '|' + replaceFilters.attribute
            : ''
        }`;
      } else {
        replaceFilters[filter] = f[filter];
      }
    });
    return replaceFilters;
  };

  const getProductHandle = data => {
    dispatch(getCatalogProducts({}, data));
  };

  const importFiltersInQuery = f => {
    let query = '';
    Object.keys(f).map(filter => (query += `${filter}=${f[filter]}&`));
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };
  async function loadFilters(id) {
    const responseFilters = await getAllFilters({
      category_id: id
    });
    setFilterList(responseFilters.data);
  }
  async function loadCategory(slug) {
    setPageLoading(true);
    const responseCategory = await getCategoryBySlug(slug);
    const f = { ...router.query };
    delete f.slug;
    setFilters(f);
    if (responseCategory.status) {
      loadFilters(responseCategory.data.id);
      setCategory(responseCategory.data);

      getProductHandle({
        ...replaceFilters(f),
        categories: JSON.stringify([responseCategory.data.id])
      });
    }
    setPageLoading(false);
  }
  async function loadAllCategories() {
    const response = await getAllCategories({});
    setCategories(response.data);
    localStorage.setItem('getAllCategories', JSON.stringify(response.data));
  }

  useEffect(() => {
    if (!category && router.query.hasOwnProperty('slug')) {
      loadCategory(router.query.slug[router.query.slug.length - 1]);
    }
    if (!categories) {
      if (localStorage.getItem('getAllCategories')) {
        setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
      } else {
        loadAllCategories();
      }
    }
    if (Object.keys(filters).length < 1) {
      const f = { ...router.query };
      if (f.hasOwnProperty('slug')) {
        delete f.slug;
      }
      setFilters(f);
    }
    if (serverGoods) {
      dispatch(getCatalogProductsSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      const newFilers = { ...router.query };
      delete newFilers.slug;
      if (
        router.query.hasOwnProperty('slug') &&
        router.query?.slug[router.query.slug.length - 1] !== category?.slug
      ) {
        loadCategory(router.query.slug[router.query.slug.length - 1]);
      } else {
        setFilters(newFilers);
        let categories = category ? JSON.stringify([category.id]) : [];
        if (!router.query.hasOwnProperty('slug')) {
          setCategory(null);
          categories = [];
        }
        getProductHandle({
          ...replaceFilters(newFilers),
          categories
        });
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  if (!catalog || !filterList) {
    return <Loader />;
  }

  const crumbs = category
    ? category.crumbs_object.map(item => ({
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
          usedFilters={filters}
          usedCategories={null}
          selectedCategory={category}
          allCategories={categories}
          setCategory={category => setCategory(category)}
          setFilters={setFilters}
          clearFilters={() => {
            router.push(`${router.asPath.split('?')[0]}`);
          }}
          removeFilter={(filter, name) => {
            setFilters(prev => {
              const next = { ...prev };
              const list = next[filter].split('|');
              next[filter] = list.filter(item => item !== name).join('|');
              if (next[filter] === '') {
                delete next[filter];
              }
              return next;
            });
          }}
          productsList={catalog}
          updateProducts={importFiltersInQuery}
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1
          })}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...replaceFilters(filters),
                  categories: JSON.stringify([category.id]),
                  page: catalog.current_page + 1
                },
                true
              )
            );
          }}
          allFiltersSizes={filterList[3].sizes}
          allFilrersBrands={filterList[0].brands}
          allFilrersColors={filterList[0].colors}
          allFilrersMaterials={filterList[1].attributes[0].value}
          allFilrersDensity={filterList[1].attributes[1].value}
          loading={loading || pageLoading}
          setSorting={sort => {
            const f = { ...filters };
            delete f.sort_date;
            delete f.sort_price;
            importFiltersInQuery({
              ...f,
              ...sort
            });
          }}
        />
      </div>
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Catalog);
