import React from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import MainInfoComponent from '../MainInfoComponent/MainInfoComponent';
import InfoForUserMain from '../InfoForUserMain/InfoForUserMain';
import SeenProducts from '../SeenProducts/SeenProducts';
import FeaturesCard from '../../UIComponents/FeaturesCard/FeaturesCard'
import Styles from './MainProductComponent.module.scss';

const MainProductComponent = () => (
  <MainLayout>
    <BreadCrumbs />
    <MainInfoComponent />
    <InfoForUserMain />
    <SeenProducts />
    <div className={Styles.MainProductComponent__FeaturesCards}>
      <FeaturesCard />
    </div>
  </MainLayout>
);

export default MainProductComponent;
