import React from 'react';
import Head from 'next/head';
import cx from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { withResponse } from '../../hoc/withResponse';
import styles from './FormWrapper.scss';

const FormWrapper = ({ children, isMobileScreen }) => {
  const router = useRouter();

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
            router.pathname === '/registration' && isMobileScreen,
        })}
      >
        {children}
      </div>
    </>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node,
  isMobileScreen: PropTypes.bool,
};

export default withResponse(FormWrapper);
