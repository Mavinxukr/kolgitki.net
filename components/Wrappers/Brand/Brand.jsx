import React from 'react';
import PropTypes from 'prop-types';
import styles from './Brand.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Products from '../Products/Products';

const Brand = ({ brandData }) => (
  <MainLayout>
    <div className={styles.content}>
      <div className={styles.BrandMainInfo}>
        <BreadCrumbs
          items={[
            'Главная',
            'Бренды',
            brandData.slug,
          ]}
        />
        {brandData.goods.length > 0 ? (
          <p>{brandData.goods.length} товаров</p>
        ) : (
          <p>Нет результатов</p>
        )}
      </div>
      <Products
        classNameForProducts={styles.brandProducts}
        products={brandData.goods}
      />
      <h4 className={styles.brandsTitle}>{brandData.name}</h4>
      <p className={styles.brandDesc}>{brandData.description}</p>
    </div>
  </MainLayout>
);

Brand.propTypes = {
  brandData: PropTypes.shape({
    slug: PropTypes.string,
    goods: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Brand;
