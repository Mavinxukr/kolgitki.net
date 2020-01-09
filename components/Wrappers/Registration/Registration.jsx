import React from 'react';
import styles from './Registration.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import Input from '../../Layout/Input/Input';
import Form from '../../Layout/Form/Form';

const Registration = () => (
  <Form>
    <h3>Регистрация аккаунта</h3>
    <div className={styles.links}>
      <a href="/" type="button" className={styles.routeLink}>
        Войти
      </a>
      <a
        href="/"
        type="button"
        className={`${styles.routeLink} ${styles.linkActive}`}
      >
        Регистрация
      </a>
    </div>
    <div className={styles.inputs}>
      <Input placeholder="ФИО" />
      <Input placeholder="E-mail" />
      <Input placeholder="Пароль" />
    </div>
    <div className={styles.checkboxWrapper}>
      <Checkbox
        id="registration"
        title="Я хочу получать информацию о акциях и скидках"
      />
    </div>
    <Button width="100%" buttonType="submit" viewType="red" title="Создать аккаунт" />
    <p className={styles.text}>
      Уже есть аккаунт?{' '}
      <a className={styles.loginLink} href="/">
        Войти
      </a>
    </p>
  </Form>
);

export default Registration;
