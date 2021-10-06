import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { func } from 'prop-types';
import { Products } from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Loader from '../../Loader/Loader';
import { dataCatalogProductsSelector } from '../../../utils/selectors';
import {
  getCatalogProducts,
  getCatalogProductsSuccess
} from '../../../redux/actions/catalogProducts';
import styles from './Catalog.scss';
import { getAllFilters, getCategoryBySlug } from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import { ProductTitle } from '../../ProductTitle/ProductTitle';
import {
  buildFiltersBySlug,
  importFiltersInQuery,
  replaceFilter
} from '../../../utils/products';
import { replaceFilters } from './helpers';

const Catalog = ({
  goods: serverGoods,
  allFilters: serverAllFilters,
  usedFilters: serverUsedFilters,
  categoryData: serverCategoryData,
  otherFilters: serverOtherFilters,
  allCategories: serverAllCategories,
  isDesktopScreen
}) => {
  const [category, setCategory] = useState(serverCategoryData);
  const [allFilters, setAllFilters] = useState(serverAllFilters);
  const [otherFilters, setOtherFilters] = useState(serverOtherFilters);
  const [filtersList, setFiltersList] = useState(serverUsedFilters);
  const [crumbs, setCrumbs] = useState([]);

  const [loadPage, setLoadPage] = useState(false);

  const [updateData, setUpdateData] = useState(false);

  const catalog = useSelector(dataCatalogProductsSelector);
  const loading = useSelector(state => state.catalogProducts.isFetch);

  const dispatch = useDispatch();
  const router = useRouter();

  const getProductHandle = data => {
    dispatch(getCatalogProducts({}, data));
  };

  useEffect(() => {
    let crumbs = category
      ? category.crumbs_object.map(item => ({
          id: item.id,
          name: item.name,
          nameUa: item.name_ua,
          pathname: `/${item.slug}`
        }))
      : [];
    setCrumbs(crumbs);
  }, [category]);

  async function loadCategory() {
    setLoadPage(true);
    const requestCategory = await getCategoryBySlug(
      router.query.slug[router.query.slug.length - 1]
    );
    const category = (await requestCategory.status)
      ? requestCategory.data
      : null;

    if (category) {
      setCategory(category);
      loadFilters(category.id);
      setFiltersList({});
      getProductHandle({
        ...replaceFilters({ categories: category })
      });
    } else {
      setLoadPage(false);
    }
  }

  async function loadFilters(id) {
    setLoadPage(true);
    const response = await getAllFilters({ category_id: id });
    if (response.status) {
      let formatAllFilters = replaceFilter(response.data);
      formatAllFilters.materials = formatAllFilters.attributes[0].value;
      formatAllFilters.density = formatAllFilters.attributes[1].value;
      setAllFilters(formatAllFilters);
    }
    setLoadPage(false);
  }

  useEffect(() => {
    if (!category && router.query.hasOwnProperty('slug')) {
      loadCategory();
    }

    if (serverAllCategories) {
      localStorage.setItem(
        'getAllCategories',
        JSON.stringify(serverAllCategories)
      );
    }

    if (
      Object.keys(filtersList).length < 1 &&
      Object.keys(router.query).length > 0
    ) {
      const filters = { ...router.query };
      delete filters.slug;
      //build filters from slugs
      const usedFilters = buildFiltersBySlug(filters, allFilters);

      const of = { ...filters };
      delete otherFilters.colors;
      delete otherFilters.sizes;
      delete otherFilters.brands;
      delete otherFilters.density;
      delete otherFilters.materials;

      setFiltersList(usedFilters);
      setOtherFilters(of);
    }

    if (serverGoods) {
      dispatch(getCatalogProductsSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    if (!updateData && router.query.hasOwnProperty('slug')) {
      setUpdateData(true);
    } else {
      const newFilers = { ...router.query };
      delete newFilers.slug;

      if (
        (router.query.hasOwnProperty('slug') && !category) ||
        (router.query.hasOwnProperty('slug') &&
          router.query.slug.join('/') !== category.crumbs)
      ) {
        loadCategory();
      } else {
        const usedFilters = buildFiltersBySlug(newFilers, allFilters);

        const of = { ...newFilers };
        delete of.colors;
        delete of.sizes;
        delete of.brands;
        delete of.density;
        delete of.materials;

        setFiltersList(usedFilters);
        setOtherFilters(of);

        let filterForResponse = {
          ...replaceFilters({
            ...usedFilters
          }),
          ...of
        };

        if (!router.query.hasOwnProperty('slug')) {
          loadFilters(0);
          setCategory(null);

          getProductHandle(filterForResponse);
        } else {
          if (category) {
            filterForResponse = {
              ...filterForResponse,
              ...replaceFilters({ categories: category })
            };
          }
          getProductHandle(filterForResponse);
        }
      }
    }
  }, [router.query]);

  if (!catalog || !filtersList || !allFilters) {
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
          allCategories={null}
          usedCategories={null}
          selectedCategory={category || null}
          setCategory={category => {
            router.push(`/products/${category.crumbs}`);
          }}
          clearCategory={() => {
            setCategory(null);
            router.push(`/products`);
          }}
          usedFilters={filtersList}
          otherFilters={otherFilters}
          setFilters={setFiltersList}
          clearFilters={() => {
            router.push(`${router.asPath.split('?')[0]}`);
          }}
          setSorting={sort => {
            let queryaData = router.query;

            delete queryaData.slug;
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
          removeFilter={(filter, item) => {
            setFiltersList(prev => {
              const next = { ...prev };
              next[filter] = next[filter].filter(f => f.id !== item.id);
              if (!next[filter].length) {
                delete next[filter];
              }

              if (Object.keys(next).length === 0) {
                importFiltersInQuery({}, otherFilters, router);
              }

              return next;
            });
          }}
          productsList={catalog}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...replaceFilters({
                    ...filtersList,
                    categories: category
                  }),
                  page: catalog.current_page + 1
                },
                true
              )
            );
          }}
          updateProducts={() => {
            importFiltersInQuery({ ...filtersList }, otherFilters, router);
          }}
          setPage={number => {
            let queryaData = router.query;
            delete queryaData.slug;
            queryaData.page = number;

            let query = '';
            Object.keys(queryaData).forEach(
              filter => (query += `${filter}=${queryaData[filter]}&`)
            );
            query = query.slice(0, -1);

            router.push(`${router.asPath.split('?')[0]}?${query}`);
          }}
          allFiltersSizes={allFilters.sizes}
          allFiltersBrands={allFilters.brands}
          allFiltersColors={allFilters.colors}
          allFiltersMaterials={allFilters.materials}
          allFiltersDensity={allFilters.density}
          loading={loading || loadPage}
          isDesktopScreen={isDesktopScreen}
        />
      </div>
    </MainLayout>
  );
};

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Catalog);
