import React from 'react';
import ReturnBoxIcon from '../../../../public/svg/exchange.svg';
import ExchangeBoxIcon from '../../../../public/svg/exchange(1).svg';
import styles from './Recovery.scss';

const Recovery = () => (
  <div className={styles.recovery}>
    <h3>Возврат</h3>
    <div className={styles.mainIfo}>
      <div className={styles.iconBlock}>
        <ReturnBoxIcon />
      </div>
      <p className={styles.mainInfoDesc}>
        Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально
        приятным, и разработали максимально простую и удобную процедуру
        возврата.
      </p>
    </div>
    <p className={styles.detailsTitle}>
      Чтобы оформить возврат, нужно сделать 3 шага:
    </p>
    <ul className={styles.firstDetailsItems}>
      <li className={styles.detailsItem}>
        <span className={styles.number}>1.</span> Указать количество
        возвращаемого товара в столбце «Количество» и код с причиной возврата в
        столбце «Причина». Коды причин возврата указаны в накладной.
      </li>
      <li className={styles.detailsItem}>
        <span className={styles.number}>2.</span> Упаковать возвращаемый товар и
        вложить в упаковку товарную накладную, пломбы, ярлыки и этикетки,
        которые относятся к товару.
      </li>
      <li className={styles.detailsItem}>
        <span className={styles.number}>3.</span> Вернуть его любым удобным для
        вас способом.
      </li>
    </ul>
    <h3>Обмен</h3>
    <div className={styles.mainIfo}>
      <div className={styles.iconBlock}>
        <ExchangeBoxIcon />
      </div>
      <p className={styles.mainInfoDesc}>
        Передать возврат курьеру при следующей доставке вашего заказа, но не
        позднее чем через 14 дней со дня получения товара. В подтверждение того,
        что курьер принял товар
      </p>
    </div>
    <p className={styles.detailsTitle}>
      Чтобы оформить возврат, нужно сделать 3 шага:
    </p>
    <ul>
      <li className={styles.detailsItem}>
        <span className={styles.number}>1.</span> Вернуть его любым удобным для
        вас способом.
      </li>
    </ul>
  </div>
);

export default Recovery;
