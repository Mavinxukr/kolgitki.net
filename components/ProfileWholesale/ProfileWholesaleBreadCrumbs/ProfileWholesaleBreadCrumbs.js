import React from 'react';
import Styles from './ProfileWholesaleBreadCrumbs.module.scss';

const ProfileWholesaleBreadCrumbs = ({ valueForCrumb }) => (
  <div className={Styles.ProfileWholesaleBreadCrumbs}>
    <a href="/" className={Styles.ProfileWholesaleBreadCrumbs__Link}>Главная</a>/
    <a href="/" className={Styles.ProfileWholesaleBreadCrumbs__Link}>Личный кабинет (опт)</a>
    <a href="/" className={Styles.ProfileWholesaleBreadCrumbs__Link}>/ {valueForCrumb}</a>
  </div>
);

export default ProfileWholesaleBreadCrumbs;
