import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { withResponse } from '../../hoc/withResponse';
import { isAuthSelector } from '../../../utils/selectors';
import styles from './FormWrapper.scss';
import { cookies } from '../../../utils/getCookies';

const FormWrapper = ({ children }) => {
  const isAuth = useSelector(isAuthSelector);

  const router = useRouter();

  useEffect(() => {
    if (cookies && !isAuth && cookies.get('token')) {
      cookies.remove('token');
    }
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
      <div
        className={cx(styles.formWrapper, {
          [styles.formWrapperForRegistration]:
            (router.pathname.indexOf('/registration') !== -1
              || router.pathname.indexOf('/login') !== -1),
        })}
      >
        {children}
      </div>
    </>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node,
};

export default withResponse(FormWrapper);
