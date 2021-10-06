import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Brand.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Loader from '../../Loader/Loader';
import {
  getCatalogProducts,
  getCatalogProductsSuccess
} from '../../../redux/actions/catalogProducts';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { getAllFilters } from '../../../services/home';
import {
  isDataReceivedForCatalogProducts,
  dataCatalogProductsSelector
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';
import ReactPlayer from 'react-player';
import { getBrandById } from '../../../services/brand';
import { BrandProducts } from './BrandProducts/BrandProducts';
import {
  buildFiltersBySlug,
  importFiltersInQuery,
  replaceFilter
} from '../../../utils/products';
import { replaceFilters } from '../Catalog/helpers';

const Brand = ({
  brandData: serverBrandData,
  brand: serverBrand,
  allFilters: serverAllFilters,
  categoryData: serverCategory,
  otherFilters: serverOtherFilters,
  usedFilters: serverUsedFilters,
  goods: serverGoods,
  isDesktopScreen
}) => {
  const [updateData, setUpdateData] = useState(false);
  const [brand, setBrand] = useState(serverBrand);
  const [category, setCategory] = useState(serverCategory);

  const [allFilters, setAllFilters] = useState(serverAllFilters);
  const [otherFilters, setOtherFilters] = useState(serverOtherFilters);
  const [filtersList, setFiltersList] = useState(serverUsedFilters);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);
  const loading = useSelector(state => state.catalogProducts.isFetch);
  const [brandData, setBrandData] = useState(serverBrandData);

  const router = useRouter();
  const dispatch = useDispatch();

  const getProductHandle = data => {
    dispatch(getCatalogProducts({}, data));
  };

  async function loadBrand() {
    const responseBrand = await getBrandById({}, router.query.bid);
    const data = (await responseBrand.status) ? responseBrand.data : null;
    setBrandData(data);
  }
  async function loadAllFilters() {
    const responseAllFilters = await getAllFilters({});
    const filterList = (await responseAllFilters.status)
      ? responseAllFilters.data
      : null;

    let allFilters = replaceFilter(filterList);
    allFilters.materials = allFilters.attributes[0].value;
    allFilters.density = allFilters.attributes[1].value;
    delete allFilters.attributes;
    setAllFilters(allFilters);
  }

  const updateFilters = () => {
    const f = { ...router.query };
    delete f.bid;

    let categoryData = [];
    if (f.hasOwnProperty('categories')) {
      const categoryName = f.categories;
      if (allFilters.hasOwnProperty('categories')) {
        categoryData = [
          ...allFilters.categories.filter(
            category => category.crumbs === categoryName
          )
        ];
      }
      delete f.categories;
    }
    setCategory(categoryData);

    const usedFilters = buildFiltersBySlug(f, allFilters);

    setFiltersList(usedFilters);

    const otherFilters = { ...f };
    delete otherFilters.colors;
    delete otherFilters.sizes;
    delete otherFilters.density;
    delete otherFilters.materials;

    setOtherFilters(otherFilters);

    let filtersForRequest = replaceFilters({ ...usedFilters });

    if (categoryData.length) {
      filtersForRequest.categories = JSON.stringify([categoryData[0].id]);
    }

    getProductHandle({
      ...filtersForRequest,
      ...otherFilters,
      brands: brandData.name
    });
  };

  useEffect(() => {
    if (!brandData) {
      loadBrand();
    }
    if (serverGoods) {
      dispatch(getCatalogProductsSuccess(serverGoods));
    }
    return () => {
      dispatch(getCatalogProductsSuccess(null));
    };
  }, []);

  useEffect(() => {
    if (updateData) {
      if (!brandData || router.query.bid !== brandData.slug) {
        loadBrand();
      } else {
        updateFilters();
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (brandData && !allFilters) {
      loadAllFilters();
    }
    if (brandData && allFilters) {
      updateFilters();
    }
  }, [brandData, allFilters]);

  if (!brandData || !allFilters || !catalog) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.BrandMainInfo}>
          <BreadCrumbs
            routerName="brands"
            items={[
              {
                id: 1,
                name: 'Главная',
                nameUa: 'Головна',
                pathname: '/'
              },
              {
                id: 2,
                name: 'Бренды',
                nameUa: 'Бренди',
                pathname: 'brands'
              },
              {
                id: 3,
                name: brandData.slug,
                nameUa: brandData.slug
              }
            ]}
          />
          {(isDesktopScreen &&
            (catalog.data.length ? (
              <p>
                {getCorrectWordCount(
                  catalog.data.length,
                  parseText(
                    cookies,
                    ['товар', 'товара', 'товаров'],
                    ['товар', 'товару', 'товарів']
                  )
                )}
              </p>
            ) : (
              <p>Нет результатов</p>
            ))) || (
            <h3 className={styles.titleBrand}>
              {parseText(cookies, brandData.name, brandData.name_ua)}
            </h3>
          )}
        </div>

        <h1 className={styles.brandsTitle}>
          {parseText(cookies, brandData.name, brandData.name_ua)}
        </h1>
        {brandData.image_link && (
          <img
            className={styles.brandPicture}
            alt={brandData.name}
            src={brandData.image_link}
          />
        )}
        <div className={styles.info}>
          <div
            className={styles.brandDesc}
            dangerouslySetInnerHTML={{
              __html: parseText(
                cookies,
                brandData.description,
                brandData.description_ua
              )
            }}
          />
          {brandData.video_url && (
            <ReactPlayer
              className={styles.brandVideo}
              url={brandData.video_url}
            />
          )}
        </div>

        <div className={styles.titleBlock}>
          <h1>Каталог</h1>
        </div>
        {catalog ? (
          <BrandProducts
            allCategories={null}
            usedCategories={allFilters.categories}
            selectedCategory={category[0] || null}
            setCategory={category => {
              router.push(
                `${router.asPath.split('?')[0]}?categories=${category.crumbs}`
              );
            }}
            clearCategory={() => {
              router.push(`${router.asPath.split('?')[0]}`);
            }}
            usedFilters={filtersList}
            otherFilters={otherFilters}
            setFilters={setFiltersList}
            clearFilters={() => {
              router.push(`${router.asPath.split('?')[0]}`);
            }}
            setSorting={sort => {
              let queryaData = router.query;

              delete queryaData.bid;
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
                  if (category) {
                    importFiltersInQuery(
                      {
                        categories: category
                      },
                      otherFilters,
                      router
                    );
                  } else {
                    importFiltersInQuery({}, otherFilters, router);
                  }
                }

                return next;
              });
            }}
            productsList={catalog}
            action={() => {
              dispatch(
                getBlogProducts(
                  {},
                  {
                    ...replaceFilters({
                      ...filtersList,
                      categories: category
                    }),
                    page: catalog.current_page + 1,
                    post: blog.id
                  },
                  true
                )
              );
            }}
            updateProducts={() => {
              if (category) {
                importFiltersInQuery(
                  {
                    ...filtersList,
                    categories: category
                  },
                  otherFilters,
                  router
                );
              } else {
                importFiltersInQuery({ ...filtersList }, otherFilters, router);
              }
            }}
            allFiltersSizes={allFilters.sizes}
            allFiltersColors={allFilters.colors}
            allFiltersMaterials={allFilters.materials}
            allFiltersDensity={allFilters.density}
            loading={loading}
            isDesktopScreen={isDesktopScreen}
          />
        ) : null}
      </div>
    </MainLayout>
  );
};

Brand.propTypes = {
  brandData: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    name_ua: PropTypes.string,
    description: PropTypes.string,
    description_ua: PropTypes.string
  }),
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Brand);
