import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import styles from './StocksCard.scss';
import IconFire from '../../public/svg/fire.svg';

const StocksCard = ({ item }) => (
  <Link href={item.href}>
    <a className={styles.card}>
      <div className={cx(styles.status, item.open ? '' : styles.close)}>
        <IconFire />
        <span className={styles.statusText}>{item.type}</span>
      </div>
      <div className={styles.cardInfo}>
        <h4 className={styles.title}>{item.title}</h4>
        <p className={styles.date}>{item.date}</p>
      </div>
    </a>
  </Link>
);

StocksCard.propsTypes = {
  item: PropTypes.node,
};

export default StocksCard;
