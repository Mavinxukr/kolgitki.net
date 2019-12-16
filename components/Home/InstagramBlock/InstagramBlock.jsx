import React from 'react';
import styles from './InstagramBlock.scss';

const InstagramBlock = () => (
  <div className={styles.instagramBlock}>
    <div className={styles.header}>
      <h2 className={styles.title}>Kolgot.net в Инстаграм</h2>
      <a href="/" className={styles.link}>
        Открыть
      </a>
    </div>
    <div className={styles.images}>
      <div className={styles.image} />
      <div className={styles.image} />
      <div className={styles.image} />
      <div className={styles.image} />
      <div className={styles.image} />
    </div>
  </div>
);

export default InstagramBlock;
