import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import { loginViaFacebook } from '../../../redux/actions/currentUser';
import { isAuthSelector } from '../../../utils/selectors';
import { login } from '../../../services/login';
import styles from './Login.scss';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import FacebookButton from '../../FacebookButton/FacebookButton';
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import {
  required,
  composeValidators,
  passwordValidation,
  emailValidation,
} from '../../../utils/validation';
import { cookies } from '../../../utils/getCookies';
import {
  addToCartFromLocale,
  saveToken,
  parseText,
} from '../../../utils/helpers';
import IconExit from '../../../public/svg/Group795.svg';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const router = useRouter();

  const isAuthFromStore = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  if (isAuthFromStore) {
    router.push('/');
  }

  if (isLoaderActive) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    setIsLoaderActive(true);
    login({}, values).then((response) => {
      if (response.status) {
        saveToken(values.remember, response.data.token);
        addToCartFromLocale(dispatch);
        router.push('/');
      } else {
        setIsLoaderActive(false);
        setErrorMessage(response.message);
      }
    });
  };

  return (
    <FormWrapper>
      <div className={styles.formWrapper}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid, submitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formContentWrapper}>
                <h4 className={styles.title}>
                  {parseText(cookies, 'Вход в аккаунт', 'Вхід до акаунту')}
                </h4>
                <div className={styles.links}>
                  <Link href="/login" prefetch={false}>
                    <a className={cx(styles.routeLink, styles.linkActive)}>
                      {parseText(cookies, 'Войти', 'Ввійти')}
                    </a>
                  </Link>
                  <Link href="/registration" prefetch={false}>
                    <a className={styles.routeLink}>
                      {parseText(cookies, 'Регистрация', 'Реєстрація')}
                    </a>
                  </Link>
                </div>
                <div className={styles.inputs}>
                  <Field
                    name="email"
                    validate={composeValidators(required, emailValidation)}
                  >
                    {renderInput({
                      placeholder: 'E-mail',
                      type: 'email',
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
                </div>
                {errorMessage && (
                  <p className={styles.errorMessage}>
                    {parseText(
                      cookies,
                      'неверный e-mail или пароль',
                      'невірний e-mail чи пароль',
                    )}
                  </p>
                )}
                <div className={styles.checkboxWrapper}>
                  <Field
                    name="remember"
                    type="checkbox"
                    render={renderCheckbox({
                      name: 'login',
                      title: 'Запомнить меня',
                      titleUa: "Запам'ятати мене",
                      classNameWrapperForLabelBefore: styles.labelBefore,
                    })}
                  />
                  <Link href="/password-recover" prefetch={false}>
                    <a className={styles.forgotPasswordButton}>
                      {parseText(cookies, 'Забыли пароль?', 'Забули пароль?')}
                    </a>
                  </Link>
                </div>
                <FacebookButton
                  handleCallback={(response) => {
                    dispatch(
                      loginViaFacebook({}, { fbToken: response.accessToken }),
                    );
                    setIsLoaderActive(true);
                  }}
                  classNameWrapper={styles.facebookButton}
                />
                <Button
                  width="100%"
                  buttonType="submit"
                  viewType="red"
                  title="Войти"
                  titleUa="Ввійти"
                  disabled={errorMessage ? false : invalid || submitting}
                />
                <p className={styles.text}>
                  {parseText(cookies, 'Уже есть аккаунт?', 'Вже є акаунт?')}
                  <Link href="/registration" prefetch={false}>
                    <a className={styles.registrationLink}>
                      {parseText(cookies, 'Регистрация', 'Реєстрація')}
                    </a>
                  </Link>
                </p>
              </div>
              <Link href="/" prefetch={false}>
                <a className={styles.closeButton}>
                  <IconExit />
                </a>
              </Link>
            </form>
          )}
        />
      </div>
    </FormWrapper>
  );
};

export default Login;
