import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import FacebookLogin from 'react-facebook-login';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Link from 'next/link';
import { cookies } from '../../../utils/getCookies';
import { registration } from '../../../services/registration';
import { onLoginViaFacebook } from '../../../utils/loginWithFacebook';
import styles from './Registration.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import InputFormWrapper from '../../InputFormWrapper/InputFormWrapper';
import {
  required,
  composeValidators,
  emailValidation,
  passwordValidation,
  snpValidation,
} from '../../../utils/validation';

import IconExit from '../../../assets/svg/Group 795.svg';

const renderInput = props => ({ input, meta }) => (
  <InputFormWrapper inputProps={input} meta={meta} {...props} />
);

const validateForm = (values) => {
  const errors = {};
  if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Пароли не совпадают';
  }
  return errors;
};

const Registration = () => {
  const [shouldReceiveMailing, setShouldReceiveMailing] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  if (isAuth) {
    router.push('/confirm-email');
  }

  const onSubmit = (values) => {
    registration(
      {},
      { ...values, mailing: Number(shouldReceiveMailing), role_id: 2 },
    ).then((response) => {
      if (!response.status) {
        setErrorMessage(response.errors.email);
      } else {
        setIsAuth(true);
        cookies.set('token', response.data.token, { maxAge: 60 * 60 * 24 });
      }
    });
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4>Регистрация аккаунта</h4>
            <div className={styles.links}>
              <Link href="/login">
                <a className={styles.routeLink}>Войти</a>
              </Link>
              <Link href="/registration">
                <a className={cx(styles.routeLink, styles.linkActive)}>
                  Регистрация
                </a>
              </Link>
            </div>
            <div className={styles.inputs}>
              <Field
                name="snp"
                validate={composeValidators(required, snpValidation)}
              >
                {renderInput({
                  placeholder: 'ФИО',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
              <Field
                name="email"
                validate={composeValidators(required, emailValidation)}
              >
                {renderInput({
                  placeholder: 'E-mail',
                  type: 'email',
                  message: errorMessage,
                  viewTypeForm: 'userForm',
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
              <Field
                name="password"
                validate={composeValidators(required, passwordValidation)}
              >
                {renderInput({
                  placeholder: 'Пароль',
                  type: 'password',
                  viewTypeForm: 'userForm',
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
              <Field name="password_confirmation" validate={required}>
                {renderInput({
                  placeholder: 'Подтвердите пароль',
                  type: 'password',
                  viewTypeForm: 'userForm',
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <Checkbox
              name="registration"
              title="Я хочу получать информацию о акциях и скидках"
              classNameWrapper={styles.checkboxWrapper}
              checked={shouldReceiveMailing}
              onChange={setShouldReceiveMailing}
            />
            <FacebookLogin
              appId="490339138347349"
              autoLoad={false}
              callback={response => onLoginViaFacebook(response, setIsAuth)}
              cssClass={styles.facebookButton}
              textButton="Войти через Facebook"
            />
            <Button
              disabled={errorMessage ? false : invalid}
              width="100%"
              buttonType="submit"
              viewType="auth"
              title="Создать аккаунт"
            />
            <p className={styles.text}>
              Уже есть аккаунт?
              <Link href="/login">
                <a className={styles.loginLink}>Войти</a>
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

export default Registration;
