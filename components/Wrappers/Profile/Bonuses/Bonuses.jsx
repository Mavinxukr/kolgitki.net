import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Bonuses.scss';
import { calculateBonusSum } from '../../../../utils/helpers';
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
    return <Loader />;
  }

  return (
    <div className={styles.bonuses}>
      <h2 className={styles.title}>Бонусы</h2>
      <div className={styles.allBonuses}>
        <p className={styles.allBonunesPrice}>
          {calculateBonusSum(bonuses)},00 ₴
        </p>
        <p className={styles.allBonunesText}>Количество бонусов</p>
      </div>
      {bonuses.length > 0 ? (
        <>
          <h2 className={styles.historyTitle}>История</h2>
          <div className={styles.headerTable}>
            <p className={styles.tableSumm}>Сумма</p>
            <p className={styles.tableDate}>Дата</p>
            <p className={styles.tableEvent}>Событие</p>
          </div>
        </>
      ) : null}
      {bonuses.map(item => (
        <div className={styles.tableItem} key={item.id}>
          <p className={styles.tableItemPrice}>+{item.count},00 ₴</p>
          <p className={styles.tableItemDate}>{item.created_at}</p>
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
