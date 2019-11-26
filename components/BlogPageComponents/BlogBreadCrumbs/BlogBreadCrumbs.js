import React from 'react';
import Styles from './BlogBreadCrumbs.scss';

const BreadCrumbs = () => (
  <div className={Styles.BreadCrumbs}>
    <a href="/" className={Styles.BreadCrumbs__Link}>Главная</a> /
    <a href="/" className={Styles.BreadCrumbs__Link}>Новости</a> /
    <a href="/" className={Styles.BreadCrumbs__Link}>Post 025</a>
  </div>
);

export default BreadCrumbs;
