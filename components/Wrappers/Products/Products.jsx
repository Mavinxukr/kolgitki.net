import React from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Products.scss';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import { dataCategories } from './dataCategories';
import {
  sizes, densities, stuff, colors, marks,
} from './data';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Products = ({ products, classNameWrapper }) => (
  <div className={cx(styles.productsWrapper, classNameWrapper)}>
    <div className={styles.leftSide}>
      <Filter
        classNameForFilter={styles.leftSideControllerWrapper}
        title="Торговая марка"
        id="marks"
        arrSelects={marks}
      />
      <Categories
        classNameForCategories={styles.categoriesWrapper}
        arrSubCategories={dataCategories}
      />
    </div>
    <div className={styles.rightSide}>
      <div className={styles.controllersWrapper}>
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Размер"
          arrSelects={sizes}
          id="size"
        />
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Цвет"
          arrSelects={colors}
          id="color"
        />
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Плотность"
          arrSelects={densities}
          id="destiny"
        />
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Материал"
          arrSelects={stuff}
          id="stuff"
        />
      </div>
      <Sort />
      <div className={styles.cards}>
        {products.length > 0 ? (
          products.map(item => (
            <DynamicComponentWithNoSSRProductCard
              key={item.id}
              classNameWrapper={styles.card}
              item={item}
            />
          ))
        ) : (
          <p className={styles.notFoundText}>Ничего не найдено</p>
        )}
      </div>
      {
        products.length > 0 && (
          <div className={styles.addElements}>
            <Pagination />
            <Button
              buttonType="button"
              title="Показать ещё +25"
              viewType="pagination"
              width="246px"
            />
          </div>
        )
      }
    </div>
  </div>
);

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
};

export default Products;
