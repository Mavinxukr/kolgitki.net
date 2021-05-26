import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Countdown, { zeroPad } from 'react-countdown';
import cx from 'classnames';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './StocksCard.scss';
import IconFire from '../../public/svg/fire.svg';

const StocksCard = ({ item }) => {
  const classNameForStockLabel = cx(styles.status, {
    [styles.close]: !item.active
  });

  const classNameForImage = cx(styles.image, {
    [styles.imageGrey]: !item.active
  });

  return (
    <Link href="/stock/[sid]" as={`/stock/${item.slug}`} prefetch={false}>
      <article className={styles.card}>
        <div
          style={{
            backgroundImage: item.preview_link
              ? `url(${item.preview_link})`
              : "url('/images/AMALIA_RETE_40_image_1006837.png')"
          }}
          className={classNameForImage}
        />
        <div className={classNameForStockLabel}>
          <IconFire />
          <span className={styles.statusText}>
            {!item.active ? 'Акция завершена' : 'Акция'}
          </span>
        </div>
        {!!item.active && (
          <Countdown
            date={item.end}
            renderer={({ hours, minutes, seconds }) => (
              <div className={styles.timer}>
                <span className={styles.timerItem}>{zeroPad(hours)}</span>:
                <span className={styles.timerItem}>{zeroPad(minutes)}</span>:
                <span className={styles.timerItem}>{zeroPad(seconds)}</span>
                <p className={styles.timerText}>До конца акции</p>
              </div>
            )}
          />
        )}
        <div className={styles.cardInfo}>
          <h4 className={styles.title}>
            {parseText(cookies, item.name, item.name_uk)}
          </h4>
          <p className={styles.date}>
            {parseText(cookies, item.deadlines, item.deadlines_ua)}
          </p>
        </div>
      </article>
    </Link>
  );
};

StocksCard.propsTypes = {
  item: PropTypes.shape({
    active: PropTypes.number,
    name: PropTypes.string,
    name_uk: PropTypes.string,
    deadlines: PropTypes.string,
    deadlines_ua: PropTypes.string,
    end: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number
  })
};

export default StocksCard;
