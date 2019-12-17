import React from 'react';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = () => (
  <div className={styles.breadCrumbs}>
    <a href="/" className={styles.link}>
      Главная
    </a>
    <a href="/" className={styles.link}>
      / Колготки
    </a>
    <a href="/" className={styles.link}>
      / Rio 150 model 5
    </a>
  </div>
);

export default BreadCrumbs;
