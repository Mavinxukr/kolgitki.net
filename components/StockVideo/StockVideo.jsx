import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import styles from './StockVideo.scss';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';

const StockVideo = ({ stock }) => (
  <div className={styles.player}>
    <ReactPlayer
      width="100%"
      height="100%"
      url={stock.video}
      controls
    />
    <div className={styles.descBlock}>
      <h2 className={styles.descTitle}>
        {parseText(cookies, stock.name, stock.name_uk)}
      </h2>
      <p className={styles.descTime}>{stock.deadlines}</p>
    </div>
  </div>
);

StockVideo.propTypes = {
  stock: PropTypes.shape({
    name: PropTypes.string,
    name_uk: PropTypes.string,
    deadlines: PropTypes.string,
    video: PropTypes.string,
  }),
};

export default StockVideo;
