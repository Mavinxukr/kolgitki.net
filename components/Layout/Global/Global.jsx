import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import './Global.scss';
import Header from '../Header/Header';
import SubNav from '../SubNav/SubNav';
import Footer from '../Footer/Footer';

const Global = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      sendCurrentUserData({}),
    );
  }, []);

  return (
    <>
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
    </>
  );
};

Global.propTypes = {
  children: PropTypes.node,
};

export default Global;
