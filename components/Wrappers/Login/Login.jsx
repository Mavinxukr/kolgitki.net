import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import styles from './Login.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import InputFormWrapper from '../../InputFormWrapper/InputFormWrapper';
import {
  required,
  composeValidators,
  passwordValidation,
  emailValidation,
} from '../../../utils/validation';
import IconExit from '../../../assets/svg/Group 795.svg';

const Login = () => {
  const [rememberChecked, setRememberChecked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const errorMessage = useSelector(state => state.userData.error);
  const isAuth = useSelector(state => state.userData.isAuth);

  if (isAuth) {
    router.push('/');
  }

  const onSubmit = values => dispatch(sendCurrentUserData({}, { ...values }, rememberChecked));

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4>Вход в аккаунт</h4>
            <div className={styles.links}>
              <Link href="/login">
                <a className={cx(styles.routeLink, styles.linkActive)}>Войти</a>
              </Link>
              <Link href="/registration">
                <a className={styles.routeLink}>Регистрация</a>
              </Link>
            </div>
            <div className={styles.inputs}>
              <Field
                name="email"
                validate={composeValidators(required, emailValidation)}
              >
                {({ input, meta }) => (
                  <InputFormWrapper
                    placeholder="E-mail"
                    meta={meta}
                    inputProps={input}
                    type="email"
                  />
                )}
              </Field>
              <Field
                name="password"
                validate={composeValidators(required, passwordValidation)}
              >
                {({ input, meta }) => (
                  <InputFormWrapper
                    placeholder="Пароль"
                    meta={meta}
                    inputProps={input}
                    type="password"
                  />
                )}
              </Field>
            </div>
            {errorMessage ? (
              <p className={styles.errorMessage}>неверный e-mail или пароль</p>
            ) : null}
            <div className={styles.checkboxWrapper}>
              <Checkbox
                name="login"
                title="Запомнить меня"
                checked={rememberChecked}
                onChange={setRememberChecked}
              />
              <button className={styles.forgotPasswordButton} type="button">
                Забыли пароль?
              </button>
            </div>
            <Button
              width="100%"
              buttonType="button"
              viewType="facebook"
              title="Войти через Facebook"
            />
            <Button
              width="100%"
              buttonType="submit"
              viewType="auth"
              title="Войти"
              disabled={errorMessage ? false : invalid}
            />
            <p className={styles.text}>
              Уже есть аккаунт?
              <Link href="/registration">
                <a className={styles.registrationLink}>Регистрация</a>
              </Link>
            </p>
            <button type="button" className={styles.closeButton}>
              <IconExit />
            </button>
          </form>
        )}
      />
    </FormWrapper>
  );
};

export default Login;
