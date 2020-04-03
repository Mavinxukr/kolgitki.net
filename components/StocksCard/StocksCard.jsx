import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Countdown, { zeroPad } from 'react-countdown';
import cx from 'classnames';
import styles from './StocksCard.scss';
import IconFire from '../../public/svg/fire.svg';

const StocksCard = ({ item }) => {
  const classNameForStockLabel = cx(styles.status, {
    [styles.close]: !item.active,
  });

  return (
    <Link href={{
      pathname: `/stock/${item.id}`,
      query: {
        slug: item.slug,
      },
    }}
    >
      <article className={styles.card}>
        <div className={classNameForStockLabel}>
          <IconFire />
          <span className={styles.statusText}>
            {!item.active ? 'Акция завершена' : 'Акция'}
          </span>
        </div>
        {!!item.active && (
        <Countdown
          date={Date.parse(item.end_date)}
          renderer={({
            hours, minutes, seconds,
          }) => (
            <div className={styles.timer}>
              <span className={styles.timerItem}>
                {zeroPad(hours)}
              </span>:
              <span className={styles.timerItem}>
                {zeroPad(minutes)}
              </span>:
              <span className={styles.timerItem}>
                {zeroPad(seconds)}
              </span>
              <p className={styles.timerText}>До конца акции</p>
            </div>
          )}
        />
        )}
        <div className={styles.cardInfo}>
          <h4 className={styles.title}>{item.name}</h4>
          <p className={styles.date}>{item.deadlines}</p>
        </div>
      </article>
    </Link>
  );
};

StocksCard.propsTypes = {
  item: PropTypes.shape({
    active: PropTypes.number,
    name: PropTypes.string,
    deadlines: PropTypes.string,
    end_date: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default StocksCard;
