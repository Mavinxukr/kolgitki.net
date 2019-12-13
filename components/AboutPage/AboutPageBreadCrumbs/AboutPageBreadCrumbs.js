import React from 'react';
import Styles from './AboutPageBreadCrumbs.module.scss';

const AboutPageBreadCrumbs = ({ valueForCrumb }) => (
  <div className={Styles.AboutPageBreadCrumbs}>
    <a href="/" className={Styles.AboutPageBreadCrumbs__Link}>Главная</a>
    <a href="/" className={Styles.AboutPageBreadCrumbs__Link}>/ {valueForCrumb}</a>
  </div>
);

export default AboutPageBreadCrumbs;
