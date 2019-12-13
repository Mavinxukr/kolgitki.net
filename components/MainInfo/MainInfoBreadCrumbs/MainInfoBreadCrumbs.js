import React from 'react';
import Styles from './MainInfoBreadCrumbs.module.scss';

const MainInfoBreadCrumbs = ({ valueForCrumb }) => (
  <div className={Styles.MainInfoBreadCrumbs}>
    <a href="/" className={Styles.MainInfoBreadCrumbs__Link}>Главная</a>
    <a href="/" className={Styles.MainInfoBreadCrumbs__Link}>/ {valueForCrumb}</a>
  </div>
);

export default MainInfoBreadCrumbs;
