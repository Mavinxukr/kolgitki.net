import React from 'react';
import styles from './ConfirmEmail.scss';
import Form from '../../Layout/Form/Form';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';

const ConfirmEmail = () => (
  <Form>
    <h3>Подтвердите свой E-mail</h3>
    <ul className={styles.list}>
      <li className={styles.item}>
        Для продолжения подтвердите свой E-mail, перейдя по ссылке, которую мы
        отправили вам на E-mail Возможно, она в папке СПАМ
      </li>
      <li className={styles.item}>
        Если возникли вопросы - пишите или звоните нам, перейдя на страницу
        <a href="/" className={styles.itemBlue}>Контакты</a>
      </li>
      <li className={styles.item}>
        Спасибо, что выбрали Kolgot.net! Вы сделали правильный выбор
      </li>
    </ul>
    <div className={styles.routeWrapper}>
      <ButtonRoute />
    </div>
  </Form>
);

export default ConfirmEmail;
