import React from 'react';
import Styles from './BreadCrumbs.module.scss';

const BreadCrumbs = () => (
  <div className={Styles.BreadCrumbs}>
    <a href="/" className={Styles.BreadCrumbs__Link}>Главная</a> /
    <a href="/" className={Styles.BreadCrumbs__Link}>Колготки</a> /
    <a href="/" className={Styles.BreadCrumbs__Link}>Rio 150 model 5</a>
  </div>
);

export default BreadCrumbs;
