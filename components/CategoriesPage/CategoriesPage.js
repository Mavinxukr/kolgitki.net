import React from 'react';
import Styles from './CategoriesPage.module.scss';
import ProductsComponent from '../Wrappers/Products/Products';
import MainLayout from '../Layout/Global/Global';
import BreadCrumbs from '../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../FilterIndicators/FilterIndicators';
import { data } from './data';

const CategoriesPage = () => (
  <MainLayout>
    <div className={Styles.CategoriesPage}>
      <div className={Styles.CategoriesPage__Header}>
        <BreadCrumbs items={['Главная', '/ Категории']} />
        <div className={Styles.CategoriesPage__FilterIndicatorsWrapper}>
          <FilterIndicators buttonValue="Удалить фильтры" countOfProducts="54 Товара" />
        </div>
      </div>
      <div className={Styles.CategoriesPage__Products}>
        <ProductsComponent products={data} />
      </div>
    </div>
  </MainLayout>
);

export default CategoriesPage;
