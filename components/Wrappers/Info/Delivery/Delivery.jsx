import React from 'react';
import PropTypes from 'prop-types';
import PaymentInfo from '../../../PaymentInfo/PaymentInfo';
import Questions from '../../../Questions/Questions';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import styles from './Delivery.scss';

const Delivery = ({ deliveryData }) => (
  <div className={styles.delivery}>
    <h3 className={styles.title}>Доставка</h3>
    <p className={styles.desc}>
      {parseText(
        cookies,
        'Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным, и разработали максимально простую и удобную процедуру возврата.',
        'Ми робимо все для того, щоб ваш досвід онлайн-шопінгу був максимально приємним, і розробили максимально просту і зручну процедуру повернення.',
      )}
    </p>
    <div className={styles.dataList}>
      {deliveryData.delivery.map(item => (
        <PaymentInfo classNameWrapper={styles.borderMobile} key={item.id} item={item} />
      ))}
    </div>
    <h3 className={styles.title}>Оплата</h3>
    <div className={styles.dataList}>
      {deliveryData.payment.map(item => (
        <PaymentInfo key={item.id} item={item} />
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
