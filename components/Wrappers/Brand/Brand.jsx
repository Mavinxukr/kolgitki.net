import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { getAllCategories, getAllFilters } from '../../../services/home';
import {
  isDataReceivedForCatalogProducts,
  dataCatalogProductsSelector,
} from '../../../utils/selectors';

const Brand = ({ brandData }) => {
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

    if (router.query.bid) {
      delete router.query.bid;
    }

    return () => {
      cookies.remove('filters');
    };
  }, []);

  useEffect(() => {
    handleUpdateStorage();
  }, [router]);

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
                pathname: '/',
              },
              {
                id: 2,
                name: 'Бренды',
                pathname: '/Brands',
              },
              {
                id: 3,
                name: brandData.slug,
              },
            ]}
          />
          {catalog.length ? (
            <p>{catalog.data.length} товаров</p>
          ) : (
            <p>Нет результатов</p>
          )}
        </div>
        <Products
          classNameWrapper={styles.brandProducts}
          products={catalog}
          router={router}
          pathname={`/Brands/${cookies.get('filters').brands[0].id}`}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...createBodyForRequestCatalog(
                    cookies.get('filters'),
                  ),
                  page: catalog.current_page + 1 || 1,
                },
                true,
              ),
            );
          }}
          categories={categories}
          filters={filters}
        />
        <h4 className={styles.brandsTitle}>{brandData.name}</h4>
        <p className={styles.brandDesc}>{brandData.description}</p>
      </div>
    </MainLayout>
  );
};

Brand.propTypes = {
  brandData: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Brand;
