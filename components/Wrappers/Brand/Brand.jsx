import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Brand.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import { createBodyForRequestCatalog } from '../../../utils/helpers';
import {
  isDataReceivedForCatalogProducts,
  dataCatalogProductsSelector,
} from '../../../utils/selectors';

const Brand = ({ brandData }) => {
  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogProducts({}, createBodyForRequestCatalog(router.query)));
  }, []);

  useEffect(() => {
    dispatch(getCatalogProducts({}, createBodyForRequestCatalog(router.query)));
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.BrandMainInfo}>
          <BreadCrumbs items={['Главная', 'Бренды', brandData.slug]} />
          {brandData.goods.length > 0 ? (
            <p>{brandData.goods.length} товаров</p>
          ) : (
            <p>Нет результатов</p>
          )}
        </div>
        <Products
          classNameWrapper={styles.brandProducts}
          products={catalog}
          router={router}
          pathname="/Brands/[bid]"
          action={getCatalogProducts}
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
    goods: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Brand;
