import React from 'react';
import styles from './ProfileMailing.scss';

const ProfileMailing = () => (
  <div className={styles.profileMailing}>
    <h2 className={styles.title}>Рассылки</h2>
    <p className={styles.desc}>Виды рассылок</p>
    <input defaultChecked type="checkbox" id="news" className={styles.field} />
    <label className={styles.controller} htmlFor="news">
      Новости, акции компании
    </label>
    <p className={styles.text}>
      Новые товары в магазине и акции на просмотренные вами товары
    </p>
    <hr className={styles.line} />
    <input
      defaultChecked
      type="checkbox"
      id="discount"
      className={styles.field}
    />
    <label className={styles.controller} htmlFor="discount">
      Промокоды, скидки и акции
    </label>
    <p className={styles.textTwo}>
      Информация о скидках, промокодах и акциях <br />
      Периодически мы проводим акции со скидками, розыгрышами, промокодами,
      которые могут помочь сэконмить на покупки или получить несколько товаров
      по цене одного.
    </p>
    <p className={styles.select}>Отправляем вам на</p>
    <input defaultChecked className={styles.field} type="checkbox" id="email" />
    <label
      className={`${styles.controller} ${styles.controllerSelect}`}
      htmlFor="email"
    >
      E-mail
    </label>
    <input defaultChecked className={styles.field} type="checkbox" id="viber" />
    <label
      className={`${styles.controller} ${styles.controllerSelect}`}
      htmlFor="viber"
    >
      Viber
    </label>
    <input defaultChecked className={styles.field} type="checkbox" id="sms" />
    <label
      className={`${styles.controller} ${styles.controllerSelect}`}
      htmlFor="sms"
    >
      SMS
    </label>
    <input
      defaultChecked
      className={styles.field}
      type="checkbox"
      id="notice"
    />
    <label
      className={`${styles.controller} ${styles.controllerSelect}`}
      htmlFor="notice"
    >
      Уведомления в браузере
    </label>
    <button className={styles.button} type="button">
      Сохранить
    </button>
  </div>
);

export default ProfileMailing;
