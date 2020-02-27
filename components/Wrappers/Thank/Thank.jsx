import React from 'react';
import MainLayout from '../../Layout/Global/Global';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import styles from './Thank.scss';

const Thank = () => (
  <MainLayout>
    <div className={styles.thank}>
      <h2>Спасибо за покупку!</h2>
      <p className={styles.order}>
        Номер вашего заказа:{' '}
        <span className={styles.orderNumber}>10031315819</span>
      </p>
      <p className={styles.desc}>
        На вашу почту и телефон мы выслали реквизиты и подробную информацию о
        заказе
      </p>
      <ButtonRoute classNameWrapper={styles.routeWrapper} />
    </div>
  </MainLayout>
);

export default Thank;
