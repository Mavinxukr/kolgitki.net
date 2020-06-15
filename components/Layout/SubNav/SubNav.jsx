import React from 'react';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './SubNav.scss';
import IconClothes from '../../../public/svg/clothes.svg';
import IconSale from '../../../public/svg/sale.svg';
import IconDelivery from '../../../public/svg/free-delivery.svg';
import IconPhone from '../../../public/svg/call-answer.svg';

const SubNav = () => (
  <div className={styles.subNavWrapper}>
    <div className={styles.subNav}>
      <div className={styles.container}>
        <div className={styles.item}>
          <p className={styles.iconBlockPhone}>
            <IconPhone className={styles.icon} />
          </p>
          <p className={`${styles.textPhone} ${styles.text}`}>044 495 523 395</p>
        </div>
        <div className={styles.item}>
          <p className={styles.iconBlockClother}>
            <IconClothes className={styles.icon} />
          </p>
          <p className={styles.text}>
            {parseText(cookies, 'Магазин в вашем городе', 'Магазин у вашому місті')}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.iconBlockSale}>
            <IconSale className={`${styles.icon} ${styles.iconBlockClother}`} />
          </p>
          <p className={styles.text}>
            {parseText(cookies, 'Низкие цены', 'Низькі ціни')}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.iconBlockDelivery}>
            <IconDelivery className={styles.icon} />
          </p>
          <p className={styles.text}>
            {parseText(cookies, 'Бесплатная доставка от 500 грн', 'Бескоштовна доставка від 500 грн')}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SubNav;
