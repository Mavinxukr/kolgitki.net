import React from 'react';
import styles from './Registration.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import ButtonForm from '../../Layout/ButtonForm/ButtonForm';
import Input from '../../Layout/Input/Input';
import Form from '../../Layout/Form/Form';

const Registration = () => (
  <Form>
    <h3>Регистрация аккаунта</h3>
    <div className={styles.buttons}>
      <a href="/" type="button" className={styles.button}>
        Войти
      </a>
      <a
        href="/"
        type="button"
        className={`${styles.button} ${styles.buttonActive}`}
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
    <ButtonForm title="Создать аккаунт" />
    <p className={styles.text}>
      Уже есть аккаунт?{' '}
      <a className={styles.loginLink} href="/">
        Войти
      </a>
    </p>
  </Form>
);

export default Registration;
