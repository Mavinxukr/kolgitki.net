import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cx from 'classnames';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import { getSeoData } from '../../../services/home';
import { userDataSelector, isAuthSelector } from '../../../utils/selectors';
import './Global.scss';
import styles from './GlobalModule.scss';
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

const Global = ({ children, seo = {} }) => {
  const userData = useSelector(userDataSelector);
  const isAuth = useSelector(isAuthSelector);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [seoData, setSeoData] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (cookies && !isAuth && cookies.get('token')) {
      cookies.remove('token');
    }
  }, [isAuth]);

  useEffect(() => {
    checkPagesForNotAuth(arrRoutesForAuthUser, router);
    if (cookies.get('token')) {
      dispatch(sendCurrentUserData({}));
    }
    getSeoData({}).then(response => setSeoData(response.data));
  }, []);

  if (!_.isEmpty(userData)) {
    checkUserRole(userData, router);
  }

  const classNameForChildren = cx(styles.children, {
    [styles.childrenSearchActive]: isSearchActive,
    [styles.childrenMenuActive]: isOpenMenu,
  });

  const classNameForFooter = cx(styles.footer, {
    [styles.footerSearchActive]: isSearchActive,
  });

  return (
    <>
      <Head>
        <title>{seo.seo_title || seoData.title || 'Home'}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={seo.seo_description || seoData.meta_description} />
        <meta name="keywords" content={seo.seo_keywords || seoData.meta_keywords} />
        <meta name="title" content={seo.seo_title || seoData.meta_title} />
        {seo.seo_canonical && <link rel="canonical" href={seo.seo_canonical} />}
        {process.env.NODE_ENV !== 'production' && (
          <link
            rel="stylesheet"
            type="text/css"
            href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
          />
        )}
        <link rel="stylesheet" href="/uikit/uikit.css" />
        <script src="/uikit/uikit.js" />
        {(router.pathname === '/order' && (
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg&libraries=places" />
        ))
          || (router.pathname === '/ProfileWholesale/data' && (
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg&libraries=places" />
          ))
          || (router.pathname === '/Profile/data' && (
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg&libraries=places" />
          ))}
      </Head>
      <Header
        setIsSearchActive={setIsSearchActive}
        isSearchActive={isSearchActive}
        setIsOpenMenu={setIsOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <SubNav />
      <div className={classNameForChildren}>{children}</div>
      <Footer classNameWrapper={classNameForFooter} />
    </>
  );
};

Global.propTypes = {
  children: PropTypes.node,
  seo: PropTypes.shape({
    seo_description: PropTypes.string,
    seo_keywords: PropTypes.string,
    seo_title: PropTypes.string,
    seo_canonical: PropTypes.string,
  }),
};

export default Global;
