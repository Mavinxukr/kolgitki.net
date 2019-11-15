import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import BestProducts from '../BestProducts/BestProducts';
import FeaturesCard from '../FeaturesCard/FeaturesCard';
import NewCollection from '../NewCollection/NewCollection';
import PopularCategories from '../PopularCategories/PopularCategories';
import InstagramBlock from '../InstagramBlock/InstagramBlock';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../SliderComponent/Slider/Slider'),
  { ssr: false },
);

const MainHomeComponent = () => (
  <MainLayout>
    <DynamicComponentWithNoSSRSlider />
    <BestProducts />
    <FeaturesCard />
    <NewCollection />
    <PopularCategories />
    <InstagramBlock />
  </MainLayout>
);

export default MainHomeComponent;
