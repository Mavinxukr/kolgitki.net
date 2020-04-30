import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Countdown, { zeroPad } from 'react-countdown';
import styles from './StockTimer.scss';

const StockTimer = ({ stock }) => (
  <Countdown
    date={stock.end_date}
    renderer={({
      days, hours, minutes, seconds, completed,
    }) => (
      <div className={styles.timer}>
        <p className={styles.desc}>
          {(completed && 'Акция закончилась') || 'До конца акции осталось:'}
        </p>
        {!completed && (
        <ul className={styles.items}>
          <li className={styles.item}>
            <span className={styles.dots}>:</span>
            <span className={styles.timeValue}>{zeroPad(days)}</span>
            <span className={styles.timeDesc}>Дней</span>
          </li>
          <li className={styles.item}>
            <span className={styles.dots}>:</span>
            <span className={styles.timeValue}>{zeroPad(hours)}</span>
            <span className={styles.timeDesc}>Часов</span>
          </li>
          <li className={styles.item}>
            <span className={styles.dots}>:</span>
            <span className={styles.timeValue}>{zeroPad(minutes)}</span>
            <span className={styles.timeDesc}>Минут</span>
          </li>
          <li className={styles.item}>
            <span className={cx(styles.timeValue, styles.timeSecond)}>{zeroPad(seconds)}</span>
            <span className={styles.timeDesc}>Секунд</span>
          </li>
        </ul>
        )}
      </div>
    )}
  />
);

StockTimer.propTypes = {
  stock: PropTypes.shape({
    end_date: PropTypes.string,
  }),
};

export default StockTimer;
