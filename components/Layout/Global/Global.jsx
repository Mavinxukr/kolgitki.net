import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import createStore from '../../../redux/store';
import './Global.scss';
import Header from '../Header/Header';
import SubNav from '../SubNav/SubNav';
import Footer from '../Footer/Footer';

const store = createStore({})
//
// console.log(store);

const Global = ({ children }) => (
  <Provider store={store}>
    <Head>
      <title>Home</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {process.env.NODE_ENV !== 'production' && (
        <link
          rel="stylesheet"
          type="text/css"
          href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
        />
      )}
      <link rel="stylesheet" href="/uikit/uikit.css" />
      <script src="/uikit/uikit.js" />
    </Head>
    <Header />
    <SubNav />
    {children}
    <Footer />
  </Provider>
);

export default Global;
