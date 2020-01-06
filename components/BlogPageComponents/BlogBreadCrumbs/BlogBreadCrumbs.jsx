import React from 'react';
import styles from './BlogBreadCrumbs.scss';

const BlogBreadCrumbs = () => (
  <div className={styles.main}>
    <a href="/" className={styles.link}>
      Главная
    </a>{' '}
    /
    <a href="/" className={styles.link}>
      Новости
    </a>{' '}
    /
    <a href="/" className={styles.link}>
      Post 025
    </a>
  </div>
);

export default BlogBreadCrumbs;
