import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import ProfileBreadCrumbs from '../ProfileBreadCrumbs/ProfileBreadCrumbs';
import ProfileNav from '../ProfileNav/ProfileNav';
import BonusComponent from '../BonusComponent/BonusComponent';
import Styles from './MainProfillePageComponent.module.scss';

const MainProfillePageComponent = () => (
  <MainLayout>
    <div className={Styles.MainProfillePageComponent__Content}>
      <ProfileBreadCrumbs />
      <div className={Styles.MainProfillePageComponent__MainContent}>
        <ProfileNav />
        <BonusComponent />
      </div>
    </div>
  </MainLayout>
);

export default MainProfillePageComponent;
