import React from 'react';
import Styles from './ProfileBreadCrumbs.module.scss';

const ProfileBreadCrumbs = () => (
  <div className={Styles.ProfileBreadCrumbs}>
    <a href="/" className={Styles.ProfileBreadCrumbs__Link}>Главная</a>/
    <a href="/" className={Styles.ProfileBreadCrumbs__Link}>Личный кабинет</a>
    <a href="/" className={Styles.ProfileBreadCrumbs__Link}>/ Бонусы</a>
  </div>
);

export default ProfileBreadCrumbs;
