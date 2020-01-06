import React from 'react';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ value }) => (
  <div className={styles.breadCrumbs}>
    {
      value.map((item, id) => (
        <a href="/" className={styles.link} key={id}>
          {item}
        </a>
      ))
    }
  </div>
);

export default BreadCrumbs;
