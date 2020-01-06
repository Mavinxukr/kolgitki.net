import React from 'react';
import ReactPlayer from 'react-player';
import styles from './StockVideo.scss';

const StockVideo = () => (
  <div className={styles.player}>
    <ReactPlayer
      width="100%"
      height="100%"
      url="https://youtu.be/MRRM6O40hWs"
      controls
    />
    <div className={styles.descBlock}>
      <h2 className={styles.descTitle}>
        Скидки до -50% на все бренды Bershka, Calvin Klein
      </h2>
      <p className={styles.descTime}>4 Июля — 12 Июля</p>
    </div>
  </div>
);

export default StockVideo;
