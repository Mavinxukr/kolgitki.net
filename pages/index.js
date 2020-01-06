import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSRHomeWrapper = dynamic(
  () => import('../components/Wrappers/Home/Home'),
  { ssr: false },
);

const Home = () => <DynamicComponentWithNoSSRHomeWrapper />;

export default Home;
