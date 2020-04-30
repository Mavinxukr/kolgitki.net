import React from 'react';
import PropTypes from 'prop-types';
import PaymentInfo from '../../../PaymentInfo/PaymentInfo';
import Questions from '../../../Questions/Questions';
import styles from './Delivery.scss';

const Delivery = ({ deliveryData }) => (
  <div className={styles.delivery}>
    <h3 className={styles.title}>Доставка</h3>
    <p className={styles.desc}>
      Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата.
    </p>
    <div className={styles.dataList}>
      {deliveryData.delivery.map(item => (
        <PaymentInfo
          key={item.id}
          item={item}
        />
      ))}
    </div>
    <h3 className={styles.title}>Оплата</h3>
    <div className={styles.dataList}>
      {deliveryData.payment.map(item => (
        <PaymentInfo
          key={item.id}
          item={item}
        />
      ))}
    </div>
    <Questions questions={deliveryData.faq} />
  </div>
);

Delivery.propTypes = {
  deliveryData: PropTypes.shape({
    delivery: PropTypes.arrayOf(PropTypes.object),
    payment: PropTypes.arrayOf(PropTypes.object),
    faq: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Delivery;
