import React from 'react';
import styles from './Login.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import Input from '../../Layout/Input/Input';
import Form from '../../Layout/Form/Form';

const Login = () => (
  <Form>
    <h3>Вход в аккаунт</h3>
    <div className={styles.links}>
      <a
        href="/"
        className={`${styles.routeLink} ${styles.linkActive}`}
      >
        Войти
      </a>
      <a href="/" type="button" className={styles.routeLink}>
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
    <Button width="100%" buttonType="submit" viewType="red" title="Войти" />
    <p className={styles.text}>
      Уже есть аккаунт?{' '}
      <a className={styles.registrationLink} href="/">
        Регистрация
      </a>
    </p>
  </Form>
);

export default Login;
