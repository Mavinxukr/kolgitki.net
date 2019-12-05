import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import ProfileNav from '../ProfileNav/ProfileNav';
import Styles from './MainProfillePageComponent.module.scss';

const MainProfillePageComponent = () => (
  <MainLayout>
    <div className={Styles.MainProfillePageComponent__Content}>
      <ProfileNav />
    </div>
  </MainLayout>
);

export default MainProfillePageComponent;
