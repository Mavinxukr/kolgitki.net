import React from 'react';
import styles from './Login.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import ButtonForm from '../../Layout/ButtonForm/ButtonForm';
import Input from '../../Layout/Input/Input';
import Form from '../../Layout/Form/Form';

const Login = () => (
  <Form>
    <h3>Вход в аккаунт</h3>
    <div className={styles.buttons}>
      <a
        href="/"
        type="button"
        className={`${styles.button} ${styles.buttonActive}`}
      >
        Войти
      </a>
      <a href="/" type="button" className={styles.button}>
        Регистрация
      </a>
    </div>
    <div className={styles.inputs}>
      <Input placeholder="E-mail" />
      <Input placeholder="Пароль" />
    </div>
    <div className={styles.checkboxWrapper}>
      <Checkbox
        id="registration"
        title="Запомнить меня"
      />
      <button className={styles.rememberPassword} type="button">
        Забыли пароль?
      </button>
    </div>
    <ButtonForm title="Войти" />
    <p className={styles.text}>
      Уже есть аккаунт?{' '}
      <a className={styles.registrationLink} href="/">
        Регистрация
      </a>
    </p>
  </Form>
);

export default Login;
