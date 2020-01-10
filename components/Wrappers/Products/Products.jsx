import React from 'react';
import dynamic from 'next/dynamic';
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

const Products = ({ products, classNameForProducts }) => (
  <div className={`${styles.productsWrapper} ${classNameForProducts}`}>
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
          classNameForFilter={styles.filtersWrapper}
          width="25%"
          title="Размер"
          arrSelects={sizes}
          id="size"
        />
        <Filter
          classNameForFilter={styles.filtersWrapper}
          width="25%"
          title="Цвет"
          arrSelects={colors}
          id="color"
        />
        <Filter
          classNameForFilter={styles.filtersWrapper}
          title="Плотность"
          arrSelects={densities}
          id="destiny"
        />
        <Filter
          classNameForFilter={styles.filtersWrapper}
          width="25%"
          title="Материал"
          arrSelects={stuff}
          id="stuff"
        />
      </div>
      <Sort />
      <div className={styles.cards}>
        {products.map(item => (
          <DynamicComponentWithNoSSRProductCard
            key={item.id}
            classNameForCard={styles.card}
            item={item}
          />
        ))}
      </div>
      <div className={styles.addElements}>
        <Pagination />
        <Button
          buttonType="button"
          title="Показать ещё +25"
          viewType="pagination"
          width="246px"
        />
      </div>
    </div>
  </div>
);

Products.propTypes = {
  products: PropTypes.array,
  classNameForProducts: PropTypes.string,
};

export default Products;
