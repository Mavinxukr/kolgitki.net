import React from 'react';
import styles from './StockTimer.scss';

const StockTimer = () => (
  <div className={styles.timer}>
    <p className={styles.desc}>До конца акции осталось:</p>
    <ul className={styles.items}>
      <li className={styles.item}>
        <span className={styles.dots}>:</span>
        <span className={styles.timeValue}>12</span>
        <span className={styles.timeDesc}>Дней</span>
      </li>
      <li className={styles.item}>
        <span className={styles.dots}>:</span>
        <span className={styles.timeValue}>56</span>
        <span className={styles.timeDesc}>Часов</span>
      </li>
      <li className={styles.item}>
        <span className={styles.dots}>:</span>
        <span className={styles.timeValue}>31</span>
        <span className={styles.timeDesc}>Минут</span>
      </li>
      <li className={styles.item}>
        <span className={styles.timeValue}>03</span>
        <span className={styles.timeDesc}>Секунд</span>
      </li>
    </ul>
  </div>
);

export default StockTimer;
