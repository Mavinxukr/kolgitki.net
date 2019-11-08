import React from 'react';
import '../scss/index.scss';
import Head from 'next/head';
import Main from './Main/Main';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/css/bootstrap-grid.min.css" />
    </Head>
    <Main />
  </div>
);

export default Home;
