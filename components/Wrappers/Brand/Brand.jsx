import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Brand.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
  setFiltersInCookies,
  readFiltersFromUrl,
  getCorrectWordCount,
  parseText
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { getAllCategories, getAllFilters } from '../../../services/home';
import {
  isDataReceivedForCatalogProducts,
  dataCatalogProductsSelector
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';
import { BrandsContext } from '../../../context/BrandsContext';
import { getBrandData } from '../../../services/brands';

const Brand = ({ brandData, isDesktopScreen }) => {
  const {
    brandsFilters,
    addBrandsFilter,
    clearBrandsFilters,
    removeBrandsFilter,
    setBrandsSorting,
    setBrandsPage
  } = useContext(BrandsContext);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);
  const [more, isMore] = useState(true);
  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);
  const loading = useSelector(state => state.catalogProducts.isFetch);

  const router = useRouter();
  const dispatch = useDispatch();

  const builfFilterFromRequest = () => {
    const f = brandsFilters;
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

  const handleUpdateStorage = () => {
    dispatch(getCatalogProducts({}, builfFilterFromRequest()));
  };

  useEffect(() => {
    brandsFilters.hasOwnProperty('brands') &&
      JSON.parse(brandsFilters.brands).length === 1 &&
      JSON.parse(brandsFilters.brands)[0].slug.toLowerCase() ===
        router.query.bid.toLowerCase() &&
      handleUpdateStorage();
  }, [brandsFilters.brands]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
    getAllFilters({}).then(response => setFilters(response.data));

    console.log(brandData);

    addBrandsFilter(
      'brands',
      JSON.stringify([
        {
          id: brandData.id,
          name: brandData.name,
          name_ua: brandData.name_ua,
          slug: brandData.slug
        }
      ])
    );

    return () => {
      clearBrandsFilters(['brands']);
    };
  }, []);

  useEffect(() => {
    console.log('init');
    handleUpdateStorage();
  }, [
    brandsFilters.categories,
    brandsFilters.sort_price,
    brandsFilters.sort_date,
    brandsFilters.sort_popular,
    brandsFilters.page
  ]);

  if (!isDataReceived || !filters || categories.length === 0) {
    return <Loader />;
  }

  if (document.querySelector('.ql-align-center')) {
    document.querySelector('.ql-align-center').style.textAlign = 'center';
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.BrandMainInfo}>
          <BreadCrumbs
            routerName="Brands"
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
                pathname: '/Brands'
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
        <div
          className={cx(styles.info, {
            [styles.hide]: brandData?.description?.length > 400 && more
          })}
        >
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
          {brandData?.description?.length > 400 && (
            <button
              onClick={() => isMore(!more)}
              type="button"
              className={styles.moreInfo}
            >
              {more
                ? parseText(cookies, '...больше', '...більше')
                : parseText(cookies, '...меньше', '...менше')}
            </button>
          )}
        </div>

        <div className={styles.titleBlock}>
          <h1>
            {brandsFilters.hasOwnProperty('categories')
              ? parseText(
                  cookies,
                  JSON.parse(brandsFilters.categories)[0].name,
                  JSON.parse(brandsFilters.categories)[0].name_ua
                )
              : 'Каталог'}
          </h1>
        </div>

        <Products
          usedFilters={brandsFilters}
          usedCategories={null}
          setFilter={addBrandsFilter}
          clearFilters={clearBrandsFilters}
          setSorting={setBrandsSorting}
          removeFilter={removeBrandsFilter}
          setPage={setBrandsPage}
          productsList={catalog}
          getProductsList={handleUpdateStorage}
          allFiltersSizes={filters[3].sizes}
          allFilrersBrands={filters[0].brands}
          allFilrersColors={filters[0].colors}
          allFilrersMaterials={filters[1].attributes[0].value}
          allFilrersDensity={filters[1].attributes[1].value}
          loading={loading}
          isProducts={true}
          // classNameWrapper={styles.brandProducts}
          // action={() => {
          //   dispatch(
          //     getCatalogProducts(
          //       {},
          //       {
          //         ...createBodyForRequestCatalog(cookies.get('filters')),
          //         page: catalog.current_page + 1 || 1
          //       },
          //       true
          //     )
          //   );
          // }}
        />
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
