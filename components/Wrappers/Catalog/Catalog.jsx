import React from 'react';
import { useRouter } from 'next/router';
import Products from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import styles from './Catalog.scss';

const Catalog = () => {
  const router = useRouter();

  return (
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
          router={router}
        />
      </div>
    </MainLayout>
  );
};

export default Catalog;
