import React from 'react';
import BreadCrumbs from '../../UIComponents/BreadCrumbs/BreadCrumbs';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import MainInfoComponent from '../MainInfoComponent/MainInfoComponent';
import InfoForUserMain from '../InfoForUserMain/InfoForUserMain';
import SeenProducts from '../SeenProducts/SeenProducts';
import FeaturesCards from '../../UIComponents/FeaturesCard/FeaturesCard'
import Styles from './MainProductComponent.module.scss';

const MainProductComponent = () => (
  <MainLayout>
    <BreadCrumbs />
    <MainInfoComponent />
    <InfoForUserMain />
    <SeenProducts />
    <div className={Styles.MainProductComponent__FeaturesCards}>
      <FeaturesCards />
    </div>
  </MainLayout>
);

export default MainProductComponent;
