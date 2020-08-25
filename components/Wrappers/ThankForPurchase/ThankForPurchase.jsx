import React from 'react';
import Link from 'next/link';
import Button from '../../Layout/Button/Button';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './ThankForPurchase.scss';
import IconExit from '../../../public/svg/Group795.svg';

const ThankForPurchase = ({ closePopup, content }) => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>
      {parseText(cookies, 'Спасибо за покупку', 'Дякую за покупку')}
    </h3>
    <p className={styles.desc}>
      {parseText(cookies, 'Номер вашего заказа', 'Номер вашого замовлення')}:{' '}
      <b>{content}</b>
    </p>
    <p className={styles.desc}>
      {parseText(
        cookies,
        'В ближайшее время с вами свяжеться менеджер для подтверждения заказа',
        "Найближчим часом з вами зв'яжется менеджер для підтвердження замовлення"
      )}
    </p>
    <Link href="/stock">
      <Button
        title="Посмотреть акции"
        buttonType="button"
        viewType="white"
        classNameWrapper={styles.buttonLink}
        href
      />
    </Link>
    <button
      type="button"
      onClick={() => closePopup()}
      className={styles.closeButton}
    >
      <IconExit />
    </button>
  </div>
);

export default ThankForPurchase;
