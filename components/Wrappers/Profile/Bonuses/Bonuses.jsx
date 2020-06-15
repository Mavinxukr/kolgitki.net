import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Bonuses.scss';
import { cookies } from '../../../../utils/getCookies';
import { calculateBonusSum, parseText } from '../../../../utils/helpers';
import { getBonuses } from '../../../../redux/actions/bonuses';
import Loader from '../../../Loader/Loader';
import {
  bonusesDataSelector,
  isDataReceivedBonusesSelector,
} from '../../../../utils/selectors';

const Bonuses = () => {
  const bonuses = useSelector(bonusesDataSelector);
  const isDataReceived = useSelector(isDataReceivedBonusesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBonuses({}));
  }, []);

  if (!isDataReceived) {
    return <Loader isSmallPage />;
  }

  return (
    <div className={styles.bonuses}>
      <h2 className={styles.title}>
        {parseText(cookies, 'Бонусы', 'Бонуси')}
      </h2>
      <div className={styles.allBonuses}>
        <p className={styles.allBonunesPrice}>{calculateBonusSum(bonuses)} ₴</p>
        <p className={styles.allBonunesText}>
          {parseText(cookies, 'Количество бонусов', 'Кількість бонусів')}
        </p>
      </div>
      {bonuses.length > 0 ? (
        <>
          <h2 className={styles.historyTitle}>
            {parseText(cookies, 'История', 'Історія')}
          </h2>
          <div className={styles.headerTable}>
            <p className={styles.tableSumm}>
              {parseText(cookies, 'Сумма', 'Сума')}
            </p>
            <p className={styles.tableDate}>
              {parseText(cookies, 'Дата', 'Дата')}
            </p>
            <p className={styles.tableEvent}>
              {parseText(cookies, 'Событие', 'Подія')}
            </p>
          </div>
        </>
      ) : null}
      {bonuses.map(item => (
        <div className={styles.tableItem} key={item.id}>
          <div className={styles.tableTextGroup}>
            <p className={styles.tableItemPrice}>
              {Math.sign(item.count) !== -1 && '+'}
              {item.count} ₴
            </p>
            <p className={styles.tableItemDate}>{item.order_date || '3 октября 23:30'}</p>
          </div>
          <div className={styles.tableTextGroup}>
            <p className={styles.tableItemEvent}>{item.description}</p>
            <Link
              href={{
                pathname: '/Profile/orders',
                query: {
                  idOrder: item.order_number,
                },
              }}
              prefetch={false}
            >
              <a className={styles.tableLink}>
                {item.order_number && (
                  <>
                    <span className={styles.tableLinkText}>Дополнительно:</span> #{item.order_number}
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bonuses;
