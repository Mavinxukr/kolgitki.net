import React from 'react';
import styles from './Tags.scss';

const Tags = () => (
  <div className={styles.tags}>
    <p className={styles.tag}>#Новости</p>
    <p className={styles.tag}>#Советы</p>
    <p className={styles.tag}>#Статьи</p>
  </div>
);

export default Tags;
