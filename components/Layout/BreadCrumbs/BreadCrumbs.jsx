import React from 'react';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ value }) => (
  <div className={styles.breadCrumbs}>
    {
      value ? value.map((item, id) => (
        <a href="/" className={styles.link} key={id}>
          {item}
        </a>
      )) : null
    }
  </div>
);

export default BreadCrumbs;
