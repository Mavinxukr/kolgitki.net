import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Link from 'next/link';
import { sendRegistrationData } from '../../../redux/actions/registration';
import styles from './Registration.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import InputFormWrapper from '../../InputFormWrapper/InputFormWrapper';
import {
  required,
  composeValidators,
  emailValidation,
  passwordConfirmValidation,
  passwordValidation,
  snpValidation,
} from '../../../utils/validation';

import IconExit from '../../../assets/svg/Group 795.svg';

const Registration = () => {
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [receiveCheckedMailing, setReceiveCheckedMailing] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(state => state.userData.isAuth);
  const errorEmail = useSelector(state => state.userData.error);

  if (isAuth) {
    router.push('/confirm-email');
  }

  const passwordValidationWrapper = (value) => {
    setPasswordInputValue(value);
    return passwordValidation(value);
  };

  const passwordConfirmValidationWrapper = value => (
    passwordConfirmValidation(value, passwordInputValue)
  );

  const onSubmit = values => dispatch(
    sendRegistrationData(
      {},
      { ...values, mailing: Number(receiveCheckedMailing), role_id: 2 },
    ),
  );

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4>Регистрация аккаунта</h4>
            <div className={styles.links}>
              <Link href="/login">
                <a className={styles.routeLink}>
                  Войти
                </a>
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
                {({ input, meta }) => (
                  <InputFormWrapper
                    inputProps={input}
                    meta={meta}
                    placeholder="ФИО"
                    type="text"
                  />
                )}
              </Field>
              <Field
                name="email"
                validate={composeValidators(required, emailValidation)}
              >
                {({ input, meta }) => (
                  <InputFormWrapper
                    inputProps={input}
                    meta={meta}
                    placeholder="E-mail"
                    type="email"
                    message={errorEmail}
                  />
                )}
              </Field>
              <Field
                name="password"
                validate={composeValidators(
                  required,
                  passwordValidationWrapper,
                )}
              >
                {({ input, meta }) => (
                  <InputFormWrapper
                    inputProps={input}
                    meta={meta}
                    placeholder="Пароль"
                    type="password"
                  />
                )}
              </Field>
              <Field
                name="password_confirmation"
                validate={composeValidators(
                  required,
                  passwordConfirmValidationWrapper,
                )}
              >
                {({ input, meta }) => (
                  <InputFormWrapper
                    inputProps={input}
                    meta={meta}
                    placeholder="Подтвердите пароль"
                    type="password"
                  />
                )}
              </Field>
            </div>
            <Checkbox
              name="registration"
              title="Я хочу получать информацию о акциях и скидках"
              classNameWrapper={styles.checkboxWrapper}
              checked={receiveCheckedMailing}
              onChange={setReceiveCheckedMailing}
            />
            <Button
              width="100%"
              buttonType="button"
              viewType="facebook"
              title="Войти через Facebook"
            />
            <Button
              disabled={errorEmail ? false : invalid}
              width="100%"
              buttonType="submit"
              viewType="auth"
              title="Создать аккаунт"
            />
            <p className={styles.text}>
              Уже есть аккаунт?
              <Link href="/login">
                <a className={styles.loginLink}>
                  Войти
                </a>
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
