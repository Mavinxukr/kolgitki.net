import React from 'react';
import Head from 'next/head';
import styles from './Form.scss';
import IconExit from '../../../assets/svg/Group 795.svg';

const Form = ({ children }) => (
  <div>
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
      <form className={styles.form}>
        { children }
        <button type="button" className={styles.closeButton}>
          <IconExit />
        </button>
      </form>
    </div>
  </div>
);

export default Form;
