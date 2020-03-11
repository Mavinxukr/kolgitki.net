import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isDataReceivedForOrders,
  ordersDataSelector,
  isAuthSelector,
} from '../../../utils/selectors';
import { getOrdersData } from '../../../redux/actions/order';
import MainLayout from '../../Layout/Global/Global';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import Loader from '../../Loader/Loader';
import styles from './Thank.scss';
import { cookies } from '../../../utils/getCookies';

const Thank = () => {
  const orders = useSelector(ordersDataSelector);
  const isAuth = useSelector(isAuthSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(getOrdersData({}));
    }
  }, [isAuth]);

  if (!isDataReceived && isAuth) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.thank}>
        <h2>Спасибо за покупку!</h2>
        <p className={styles.order}>
          Номер вашего заказа:{' '}
          <span className={styles.orderNumber}>
            {orders[0] ? orders[orders.length - 1].id : cookies.get('idOrder')}
          </span>
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
