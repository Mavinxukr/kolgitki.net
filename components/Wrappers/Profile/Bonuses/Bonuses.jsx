import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import styles from './Bonuses.scss';
import { calculateBonusSum } from '../../../../utils/helpers';
import { getBonuses } from '../../../../redux/actions/bonuses';
import Loader from '../../../Loader/Loader';

const bonusesDataSelector = createSelector(
  state => state.bonuses.bonuses,
  bonuses => bonuses,
);

const isDataReceivedSelector = createSelector(
  state => state.bonuses.isDataReceived,
  isDataReceived => isDataReceived,
);

const Bonuses = () => {
  const bonuses = useSelector(bonusesDataSelector);
  const isDataReceived = useSelector(isDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBonuses({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <div className={styles.bonuses}>
      <h2 className={styles.title}>Бонусы</h2>
      <div className={styles.allBonuses}>
        <p className={styles.allBonunesPrice}>{calculateBonusSum(bonuses)},00 ₴</p>
        <p className={styles.allBonunesText}>Количество бонусов</p>
      </div>
      <h2 className={styles.historyTitle}>История</h2>
      <div className={styles.headerTable}>
        <p className={styles.tableSumm}>Сумма</p>
        <p className={styles.tableDate}>Дата</p>
        <p className={styles.tableEvent}>Событие</p>
      </div>
      {bonuses.map(item => (
        <div className={styles.tableItem} key={item.id}>
          <p className={styles.tableItemPrice}>+{item.count},00 ₴</p>
          <p className={styles.tableItemDate}>
            {item.created_at}
          </p>
          <p className={styles.tableItemEvent}>
            2 Товара{' '}
            <span className={styles.tableItemEventPrice}>1 780,00 ₴</span>
          </p>
          <a href="/" className={styles.tableLink}>
            Дополнительно: #63491
          </a>
        </div>
      ))}
    </div>
  );
};

export default Bonuses;
