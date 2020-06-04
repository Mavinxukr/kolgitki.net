import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import { loginViaFacebook } from '../../../redux/actions/currentUser';
import { isAuthSelector } from '../../../utils/selectors';
import { login } from '../../../services/login';
import styles from './Login.scss';
import Button from '../../Layout/Button/Button';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import {
  required,
  composeValidators,
  passwordValidation,
  emailValidation,
} from '../../../utils/validation';
import { addToCartFromLocale, saveToken } from '../../../utils/helpers';
import IconExit from '../../../public/svg/Group795.svg';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const isAuthFromStore = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  if (isAuthFromStore) {
    router.push('/');
  }

  const onSubmit = (values) => {
    login({}, values).then((response) => {
      if (response.status) {
        saveToken(values.remember, response.data.token);
        addToCartFromLocale(dispatch);
        router.push('/');
      } else {
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
                <h4 className={styles.title}>Вход в аккаунт</h4>
                <div className={styles.links}>
                  <Link href="/login" prefetch={false}>
                    <a className={cx(styles.routeLink, styles.linkActive)}>Войти</a>
                  </Link>
                  <Link href="/registration" prefetch={false}>
                    <a className={styles.routeLink}>Регистрация</a>
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
                <p className={styles.errorMessage}>неверный e-mail или пароль</p>
                )}
                <div className={styles.checkboxWrapper}>
                  <Field
                    name="remember"
                    type="checkbox"
                    render={renderCheckbox({
                      name: 'login',
                      title: 'Запомнить меня',
                      classNameWrapperForLabelBefore: styles.labelBefore,
                    })}
                  />
                  <Link href="/password-recover" prefetch={false}>
                    <a className={styles.forgotPasswordButton}>Забыли пароль?</a>
                  </Link>
                </div>
                <FacebookLogin
                  appId="254130769334988"
                  autoLoad={false}
                  callback={(response) => {
                    dispatch(
                      loginViaFacebook({}, { fbToken: response.accessToken }),
                    );
                    setTimeout(() => addToCartFromLocale(dispatch), 600);
                  }}
                  cssClass={styles.facebookButton}
                  textButton="Войти через Facebook"
                />
                <Button
                  width="100%"
                  buttonType="submit"
                  viewType="red"
                  title="Войти"
                  disabled={errorMessage ? false : invalid || submitting}
                />
                <p className={styles.text}>
                  Уже есть аккаунт?
                  <Link href="/registration" prefetch={false}>
                    <a className={styles.registrationLink}>Регистрация</a>
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
