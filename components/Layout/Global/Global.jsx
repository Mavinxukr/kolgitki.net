import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import { userDataSelector } from '../../../utils/selectors';
import './Global.scss';
import Header from '../Header/Header';
import SubNav from '../SubNav/SubNav';
import Footer from '../Footer/Footer';
import { arrRoutesForAuthUser } from '../../../utils/fakeFetch/routes';
import { cookies } from '../../../utils/getCookies';

const checkUserRole = (userData, router) => {
  if (
    userData.role.id === 2
    && router.pathname.indexOf('/ProfileWholesale/') !== -1
  ) {
    router.push('/Profile/data');
  }

  if (userData.role.id === 3 && router.pathname.indexOf('/Profile/') !== -1) {
    router.push('/ProfileWholesale/data');
  }
};

const checkPagesForNotAuth = (arr, router) => {
  arr.forEach((item) => {
    if (router.pathname.indexOf(item) !== -1 && !cookies.get('token')) {
      router.push('/login');
    }
  });
};

const Global = ({ children }) => {
  const userData = useSelector(userDataSelector);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    checkPagesForNotAuth(arrRoutesForAuthUser, router);
    dispatch(sendCurrentUserData({}));
  }, []);

  if (!_.isEmpty(userData)) {
    checkUserRole(userData, router);
  }

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
