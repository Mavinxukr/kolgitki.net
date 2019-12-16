import React from 'react';
import dynamic from 'next/dynamic';
import Global from '../Layout/Global/Global';
import FeaturesCards from '../Layout/FeaturesCards/FeaturesCards';
import NewCollection from './NewCollection/NewCollection';
import PopularCategories from './PopularCategories/PopularCategories';
import InstagramBlock from './InstagramBlock/InstagramBlock';
import styles from './Home.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('./Slider/Slider'),
  { ssr: false },
);

const DynamicComponentWithNoSSRSliderBestProducts = dynamic(
  () => import('./BestProducts/BestProducts'),
  { ssr: false },
);

const Home = () => (
  <Global>
    <DynamicComponentWithNoSSRSlider />
    <DynamicComponentWithNoSSRSliderBestProducts />
    <div className={styles.featuresCards}>
      <FeaturesCards />
    </div>
    <NewCollection />
    <PopularCategories />
    <InstagramBlock />
  </Global>
);

export default Home;
