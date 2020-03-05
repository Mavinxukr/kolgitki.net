import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'next/dynamic';
import { isDataReceivedForOrders, ordersDataSelector } from '../../../utils/selectors';
import { getOrdersData } from '../../../redux/actions/order';
import MainLayout from '../../Layout/Global/Global';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import styles from './Thank.scss';

const Thank = () => {
  const orders = useSelector(ordersDataSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.thank}>
        <h2>Спасибо за покупку!</h2>
        <p className={styles.order}>
          Номер вашего заказа:{' '}
          <span className={styles.orderNumber}>{orders[0].id}</span>
        </p>
        <p className={styles.desc}>
          На вашу почту и телефон мы выслали реквизиты и подробную информацию о
          заказе
        </p>
        <ButtonRoute classNameWrapper={styles.routeWrapper} />
      </div>
    </MainLayout>
  );
};

export default Thank;
