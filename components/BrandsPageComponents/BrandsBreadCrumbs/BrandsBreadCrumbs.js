import React from 'react';
import Styles from './BrandsBreadCrumbs.module.scss';

const BrandsBreadCrumbs = () => (
  <div className={Styles.BrandsBreadCrumbs}>
    <div className={Styles.BreadCrumbs__Links}>
      <a href="/" className={Styles.BrandsBreadCrumbs__Link}>Главная</a>
      <a href="/" className={Styles.BrandsBreadCrumbs__Link}>/ Бренды</a>
    </div>
    <p className={Styles.BreadCrumbs__AllBrands}>150 Брендов всего</p>
  </div>
);

export default BrandsBreadCrumbs;
