import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import ProfileWholesaleNav from '../ProfileWholesaleNav/ProfileWholesaleNav';
import Styles from './ProfileWholesaleMainComponent.module.scss';

const ProfileWholesaleMainComponent = () => (
  <MainLayout>
    <div className={Styles.ProfileWholesaleMainComponent__Content}>
      <ProfileWholesaleNav />
    </div>
  </MainLayout>
);

export default ProfileWholesaleMainComponent;
