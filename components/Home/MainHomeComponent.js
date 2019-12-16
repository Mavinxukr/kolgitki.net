import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '../UIComponents/MainLayout/MainLayout';
import FeaturesCards from '../UIComponents/FeaturesCards/FeaturesCards';
import NewCollection from './NewCollection/NewCollection';
import PopularCategories from './PopularCategories/PopularCategories';
import InstagramBlock from './InstagramBlock/InstagramBlock';
import Styles from './MainHomeComponent.module.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('./Slider/Slider'),
  { ssr: false },
);

const DynamicComponentWithNoSSRSliderBestProducts = dynamic(
  () => import('./BestProducts/BestProducts'),
  { ssr: false },
);

const MainHomeComponent = () => (
  <MainLayout>
    <DynamicComponentWithNoSSRSlider />
    <DynamicComponentWithNoSSRSliderBestProducts />
    <div className={Styles.MainHomeComponent__FeaturesCards}>
      <FeaturesCards />
    </div>
    <NewCollection />
    <PopularCategories />
    <InstagramBlock />
  </MainLayout>
);

export default MainHomeComponent;
