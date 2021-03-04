import React from 'react';
import styles from './ProductLoader.scss';

const ProductLoader = ({}) => (
  <div className={styles.loaderBlock}>
    <img className={styles.loaderLogo} src="/images/logo_cut.png" alt="logo" />
  </div>
);

export default ProductLoader;
