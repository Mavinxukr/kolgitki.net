import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Countdown, { zeroPad } from 'react-countdown';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './StockTimer.scss';

const StockTimer = ({ stock }) => (
  <Countdown
    date={stock?.end}
    renderer={({
      days, hours, minutes, seconds, completed,
    }) => (
      <div className={styles.timer}>
        <p className={styles.desc}>
          {(completed
            && parseText(cookies, 'Акция закончилась', 'Акція закінчилася'))
            || parseText(
              cookies,
              'До конца акции осталось:',
              'До кінця акції залишилося',
            )}
        </p>
        {!completed && (
        <ul className={styles.items}>
          <li className={styles.item}>
            <span className={styles.dots}>:</span>
            <span className={styles.timeValue}>{zeroPad(days)}</span>
            <span className={styles.timeDesc}>
              {parseText(cookies, 'Дней', 'Днів')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.dots}>:</span>
            <span className={styles.timeValue}>{zeroPad(hours)}</span>
            <span className={styles.timeDesc}>
              {parseText(cookies, 'Часов', 'Годин')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.dots}>:</span>
            <span className={styles.timeValue}>{zeroPad(minutes)}</span>
            <span className={styles.timeDesc}>
              {parseText(cookies, 'Минут', 'Хвилин')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={cx(styles.timeValue, styles.timeSecond)}>
              {zeroPad(seconds)}
            </span>
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
    end: PropTypes.number,
  }),
};

export default StockTimer;
