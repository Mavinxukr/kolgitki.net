import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import styles from './StockVideo.scss';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';

const StockVideo = ({ stock }) => (
  <div className={styles.player}>
    {stock.video && (
      <ReactPlayer width="100%" height="100%" url={stock.video} controls />
    )}
    {!stock.video && (
      <img
        className="imgStock"
        style={{ objectFit: 'contain' }}
        src={stock.image_link}
        width="100%"
        height="100%"
        alt="image"
      />
    )}
    <div className={styles.descBlock}>
      <h2 className={styles.descTitle}>
        {parseText(cookies, stock.name, stock.name_uk)}
      </h2>
      <p className={styles.descTime}>
        {parseText(cookies, stock.deadlines, stock.deadlines_ua)}
      </p>
    </div>
  </div>
);

StockVideo.propTypes = {
  stock: PropTypes.shape({
    name: PropTypes.string,
    name_uk: PropTypes.string,
    deadlines: PropTypes.string,
    video: PropTypes.string
  })
};

export default StockVideo;
