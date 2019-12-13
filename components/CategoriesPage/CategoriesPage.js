import React from 'react';
import Styles from './CategoriesPage.module.scss';
import ProductsComponent from '../UIComponents/ProductsComponent/ProductsComponent';
import MainLayout from '../UIComponents/MainLayout/MainLayout';
import { data } from './data';

const CategoriesPage = () => (
  <MainLayout>
    <div className={Styles.CategoriesPage}>
      <div className={Styles.CategoriesPage__Header}>
        <div className={Styles.CategoriesPage__BreadCrumbs}>
          <a href="/" className={Styles.CategoriesPage__BreadCrumbsLink}>Главная</a>
          <a href="/" className={Styles.CategoriesPage__BreadCrumbsLink}>/ Бренды</a>
          <a href="/" className={Styles.CategoriesPage__BreadCrumbsLink}>/ Колготки</a>
        </div>
        <div className={Styles.CategoriesPage__Indicators}>
          <div className={Styles.CategoriesPage__IndicatorsButtons}>
            <button className={Styles.CategoriesPage__IndicatorsDeleteButton} type="button">Удалить фильтры</button>
            <button className={Styles.CategoriesPage__IndicatorsButtonItem} type="button">2</button>
          </div>
          <p className={Styles.CategoriesPage__IndicatorsCounter}>54 Товара</p>
        </div>
      </div>
      <div className={Styles.CategoriesPage__Products}>
        <ProductsComponent products={data} />
      </div>
    </div>
  </MainLayout>
);

export default CategoriesPage;
