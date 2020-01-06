import React from 'react';
import { data } from './data';
import styles from './ProfileBonuses.scss';

const ProfileBonuses = () => (
  <div className={styles.bonuses}>
    <h2 className={styles.title}>Бонусы</h2>
    <div className={styles.allBonuses}>
      <p className={styles.allBonunesPrice}>1 590,00 ₴</p>
      <p className={styles.allBonunesText}>Количество бонусов</p>
    </div>
    <h2 className={styles.historyTitle}>История</h2>
    <div className={styles.headerTable}>
      <p className={styles.tableSumm}>Сумма</p>
      <p className={styles.tableDate}>Дата</p>
      <p className={styles.tableEvent}>Событие</p>
    </div>
    {data.map(item => (
      <div className={styles.tableItem} key={item.id}>
        <p className={styles.tableItemPrice}>{item.price}</p>
        <p className={styles.tableItemDate}>
          {item.date} <span className={styles.tableItemTime}>{item.time}</span>
        </p>
        <p className={styles.tableItemEvent}>
          {item.event}{' '}
          <span className={styles.tableItemEventPrice}>{item.eventPrice}</span>
        </p>
        <a href="/" className={styles.tableLink}>
          Дополнительно: {item.addInfo}
        </a>
      </div>
    ))}
  </div>
);

export default ProfileBonuses;
