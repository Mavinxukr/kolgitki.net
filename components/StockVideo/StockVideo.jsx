import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import styles from './StockVideo.scss';

const StockVideo = ({ stock }) => (
  <div className={styles.player}>
    <ReactPlayer
      width="100%"
      height="100%"
      url={stock.video || 'https://youtu.be/MRRM6O40hWs'}
      controls
    />
    <div className={styles.descBlock}>
      <h2 className={styles.descTitle}>{stock.name}</h2>
      <p className={styles.descTime}>{stock.deadlines}</p>
    </div>
  </div>
);

StockVideo.propTypes = {
  stock: PropTypes.shape({
    name: PropTypes.string,
    deadlines: PropTypes.string,
    video: PropTypes.string,
  }),
};

export default StockVideo;
