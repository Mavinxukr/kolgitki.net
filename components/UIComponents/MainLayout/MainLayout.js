import React from 'react';
import Head from 'next/head';
import './global.scss';
import Header from '../Header/Header';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => (
  <div>
    <Head>
      <title>Home</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/*{process.env.NODE_ENV !== 'production' && (*/}
      {/*  <link rel="stylesheet" type="text/css" href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`} />*/}
      {/*)}*/}
      <link rel="stylesheet" href="/uikit/uikit.css" />
      <script src="/uikit/uikit.js" />
    </Head>
    <Header />
    <HeaderInfo />
    { children }
    <Footer />
  </div>
);


export default MainLayout;
