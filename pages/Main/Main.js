import React from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/UIComponents/Header/Header';
import HeaderInfo from '../../components/UIComponents/HeaderInfo/HeaderInfo';
import BestProducts from '../../components/HomePageComponents/BestProducts/BestProducts';
import FeaturesCard from '../../components/HomePageComponents/FeaturesCard/FeaturesCard';
import NewCollection from '../../components/HomePageComponents/NewCollection/NewCollection';
import PopularCategories from '../../components/HomePageComponents/PopularCategories/PopularCategories';
import InstagramBlock from '../../components/HomePageComponents/InstagramBlock/InstagramBlock';
import Footer from '../../components/UIComponents/Footer/Footer';
import './Main.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../components/HomePageComponents/SliderComponent/Slider/Slider'),
  { ssr: false },
);

const Main = () => (
  <div>
    <Header />
    <HeaderInfo />
    <DynamicComponentWithNoSSRSlider />
    <BestProducts />
    <FeaturesCard />
    <NewCollection />
    <PopularCategories />
    <InstagramBlock />
    <Footer />
  </div>
);

export default Main;
