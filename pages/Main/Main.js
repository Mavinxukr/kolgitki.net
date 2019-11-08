import React from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header/Header';
import HeaderInfo from '../../components/HeaderInfo/HeaderInfo';
import './Main.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../components/SliderComponent/Slider/Slider'),
  { ssr: false },
);

const Main = () => (
  <div>
    <Header />
    <HeaderInfo />
    <DynamicComponentWithNoSSRSlider />
  </div>
);

export default Main;
