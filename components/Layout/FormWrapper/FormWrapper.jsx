import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styles from './FormWrapper.scss';

const FormWrapper = ({ children }) => (
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
    <div className={styles.formWrapper}>
      {children}
    </div>
  </>
);

FormWrapper.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default FormWrapper;
