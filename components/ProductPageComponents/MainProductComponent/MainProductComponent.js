import React from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import MainInfoComponent from '../MainInfoComponent/MainInfoComponent';

const MainProductComponent = () => (
  <MainLayout>
    <BreadCrumbs />
    <MainInfoComponent />
  </MainLayout>
);

export default MainProductComponent;
