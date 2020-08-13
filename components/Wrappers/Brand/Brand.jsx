import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
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
  parseText,
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { getAllCategories, getAllFilters } from '../../../services/home';
import {
  isDataReceivedForCatalogProducts,
  dataCatalogProductsSelector,
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';

const Brand = ({ brandData, isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateStorage = () => {
    const cookieFilters = cookies.get('filters');
    dispatch(
      getCatalogProducts({}, createBodyForRequestCatalog(cookieFilters)),
    );
    getAllCategories({}).then(response => setCategories(response.data));
    getAllFilters({
      category_id:
        (cookieFilters
          && cookieFilters.categories
          && cookieFilters.categories[0].id)
        || 0,
    }).then(response => setFilters(response.data));
  };

  useEffect(() => {
    handleUpdateStorage();

    return () => {
      deleteFiltersFromCookie(cookies);
    };
  }, []);

  useEffect(() => {
    handleUpdateStorage();
  }, [router]);

  useEffect(() => {
    if (!cookies.get('filters') && categories.length && filters) {
      setFiltersInCookies(
        cookies,
        readFiltersFromUrl(router.asPath, categories, filters),
      );
    }

    dispatch(
      getCatalogProducts(
        {},
        createBodyForRequestCatalog(cookies.get('filters')),
      ),
    );
  }, [categories, filters]);

  if (!isDataReceived || !filters || categories.length === 0) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.BrandMainInfo}>
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
                name: 'Бренды',
                nameUa: 'Бренди',
                pathname: '/Brands',
              },
              {
                id: 3,
                name: brandData.slug,
                nameUa: brandData.slug,
              },
            ]}
          />
          {(isDesktopScreen
            && (catalog.data.length ? (
              <p>
                {getCorrectWordCount(
                  catalog.data.length,
                  parseText(
                    cookies,
                    ['товар', 'товара', 'товаров'],
                    ['товар', 'товару', 'товарів'],
                  ),
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
        <h4 className={styles.brandsTitle}>
          {parseText(cookies, brandData.name, brandData.name_ua)}
        </h4>
        <div
          className={styles.brandDesc}
          dangerouslySetInnerHTML={{
            __html: parseText(
              cookies,
              brandData.description,
              brandData.description_ua,
            ),
          }}
        />
        <Products
          classNameWrapper={styles.brandProducts}
          products={catalog}
          router={router}
          pathname={`/Brands/${router.query.bid.split('_')[0]}`}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...createBodyForRequestCatalog(cookies.get('filters')),
                  page: catalog.current_page + 1 || 1,
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

Brand.propTypes = {
  brandData: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    name_ua: PropTypes.string,
    description: PropTypes.string,
    description_ua: PropTypes.string,
  }),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Brand);
