import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogProductsSuccess } from '../../../redux/actions/catalogProducts';
import { getNoveltyProducts } from '../../../redux/actions/noveltyProducts';
import { getAllCategories, getCategoryBySlug } from '../../../services/home';
import { importFiltersInQuery } from '../../../utils/products';
import { dataCatalogProductsSelector } from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';
import MainLayout from '../../Layout/Global/Global';
import Loader from '../../Loader/Loader';
import { Products } from '../Products/Products';
import { replaceNoveltyFilters } from './helpers';
import styles from '../Catalog/Catalog.scss';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import { ProductTitle } from '../../ProductTitle/ProductTitle';

const NoveltyPage = ({
  novelty: serverGoods,
  noveltyFilters,
  usedFilters: serverUsedFilters,
  otherFilters: serverOtherFilters,
  categoryData: serverCategoryData,
  isDesktopScreen
}) => {
  const [otherFilters, setOtherFilters] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [allCategory, setAllCategory] = useState();
  const [category, setCategory] = useState(null);
  const [crumbs, setCrumbs] = useState([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const catalog = useSelector(dataCatalogProductsSelector);
  const stateLoading = useSelector(state => state.catalogProducts.isFetch);

  async function loadCategory(slug) {
    const requestCategories = await getCategoryBySlug(slug);
    const categories = await requestCategories.data;

    setCategory(categories);
  }

  async function loadAllCategory() {
    const allCategory = await getAllCategories({});
    localStorage.setItem('getAllCategories', JSON.stringify(allCategory.data));
    setAllCategory(allCategory.data);
  }

  useEffect(() => {
    setFiltersList(serverUsedFilters);
    setOtherFilters(serverOtherFilters);
    setCategory(serverCategoryData);
    dispatch(getCatalogProductsSuccess(serverGoods));
  }, [serverUsedFilters, serverOtherFilters, serverGoods, serverCategoryData]);

  useEffect(() => {
    if (router.query.hasOwnProperty('slug') && !serverCategoryData) {
      loadCategory(router.query.slug[router.query.slug.length - 1]);
    }
  }, [router.query]);

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

  useEffect(() => {
    if (localStorage.getItem('getAllCategories')) {
      setAllCategory(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      loadAllCategory();
    }

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  if (!catalog || !allCategory) {
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
                name: 'Новинки',
                nameUa: 'Новинки',
                pathname: 'novelty'
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
          allCategories={allCategory}
          usedCategories={noveltyFilters[0].categories}
          selectedCategory={category}
          setCategory={category => {
            router.push(`/novelty/${category.crumbs}`);
          }}
          clearCategory={() => {
            router.push(`/novelty`);
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
              getNoveltyProducts(
                {},
                {
                  ...replaceNoveltyFilters({
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
          allFiltersSizes={noveltyFilters[3].sizes}
          allFiltersBrands={noveltyFilters[0].brands}
          allFiltersColors={noveltyFilters[0].colors}
          allFiltersMaterials={noveltyFilters[1].attributes[0].value}
          allFiltersDensity={noveltyFilters[1].attributes[1].value}
          loading={loading || stateLoading}
          isDesktopScreen={isDesktopScreen}
        />
      </div>
    </MainLayout>
  );
};

export default withResponse(NoveltyPage);
