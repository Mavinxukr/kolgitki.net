import React from 'react';
import Products from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import { data } from './data';
import styles from './Catalog.scss';

const Catalog = () => (
  <MainLayout>
    <div className={styles.catalog}>
      <div className={styles.header}>
        <BreadCrumbs items={['Главная', 'Категории']} />
        <FilterIndicators
          classNameWrapper={styles.filterIndicatorsWrapper}
          buttonValue="Удалить фильтры"
          countOfProducts="54 Товара"
        />
      </div>
      <Products
        classNameWrapper={styles.productsWrapper}
        products={data}
      />
    </div>
  </MainLayout>
);

export default Catalog;
