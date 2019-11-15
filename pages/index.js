import React from 'react';
import '../scss/index.scss';
import Head from 'next/head';
import MainHomeComponent from '../components/HomePageComponents/MainHomeComponent/MainHomeComponent';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <MainHomeComponent />
  </div>
);

export default Home;
