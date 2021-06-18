import React from 'react';
import styles from './ProductFeatures.scss';
import IconClothes from '../../../../public/svg/clothes1.svg';
import IconSale from '../../../../public/svg/sale1.svg';
import IconDelivery from '../../../../public/svg/free-delivery1.svg';
import { parseText } from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';

export const ProductFeatures = () => {
  return (
    <div className={styles.features}>
      <article className={styles.features__item}>
        <IconClothes className={styles.features__icon} />
        <p className={styles.features__description}>
          {parseText(cookies, '157 245', '157 245')}
          <br />
          {parseText(cookies, 'довольных клиентов', 'задоволених клієнтів')}
        </p>
      </article>
      <article className={styles.features__item}>
        <IconSale className={styles.features__icon} />
        <p className={styles.features__description}>
          {parseText(cookies, 'Низкие цены', 'Нізькі ціни')}
          <br />
          {parseText(cookies, 'от производителя', 'від виробника')}
        </p>
      </article>
      <article className={styles.features__item}>
        <IconDelivery className={styles.features__icon} />
        <p className={styles.features__description}>
          {parseText(cookies, 'Бесплатная доставка', 'Безкоштовна доставка')}
          <br />
          {parseText(
            cookies,
            'при заказе от 500 грн',
            'при замовленні від 500 грн'
          )}
        </p>
      </article>
    </div>
  );
};
