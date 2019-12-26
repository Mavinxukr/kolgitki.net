import React from 'react';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ value }) => (
  <div className={styles.breadCrumbs2}>
    {
      value ? value.map((item, id) => (
        <a href="/" className={styles.link2} key={id}>
          {item}
        </a>
      )) : null
    }
  </div>
);

export default BreadCrumbs;
