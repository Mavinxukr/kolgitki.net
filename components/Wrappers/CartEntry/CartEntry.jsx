import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import MainLayout from '../../Layout/Global/Global';
import Button from '../../Layout/Button/Button';
import { cookies } from '../../../utils/getCookies';
import RadioButton from '../../RadioButton/RadioButton';
import {
  composeValidators,
  emailValidation,
  passwordValidation,
  required,
} from '../../../utils/validation';
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import {
  saveToken,
  addToCartFromLocale,
  parseText,
} from '../../../utils/helpers';
import { login } from '../../../services/login';
import { withResponse } from '../../hoc/withResponse';
import styles from './CartEntry.scss';

const CartEntry = ({ isDesktopScreen }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [authValue, setAuthValue] = useState('auth');
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(true);

  const dispatch = useDispatch();

  const router = useRouter();

  const onSubmit = (values) => {
    login({}, values).then((response) => {
      if (response.status) {
        saveToken(values.remember, response.data.token);
        addToCartFromLocale(dispatch);
        setTimeout(() => router.push('/order'), 600);
      } else {
        setErrorMessage(
          parseText(
            cookies,
            'Неверное имя или email',
            "Неправильне ім'я або email",
          ),
        );
      }
    });
  };

  return (
    <MainLayout>
      <div className={styles.cartEntry}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {!isDesktopScreen && (
              <div className={styles.links}>
                <button
                  type="button"
                  className={cx(styles.routeLink, {
                    [styles.linkActive]: isOpenLoginForm,
                  })}
                  onClick={() => setIsOpenLoginForm(true)}
                >
                  {parseText(cookies, 'Войти', 'Ввійти')}
                </button>
                <button
                  type="button"
                  className={cx(styles.routeLink, {
                    [styles.linkActive]: !isOpenLoginForm,
                  })}
                  onClick={() => setIsOpenLoginForm(false)}
                >
                  {parseText(
                    cookies,
                    'Продолжить без регистрации',
                    'Продовжити без реєстрації',
                  )}
                </button>
              </div>
            )}
            {(isDesktopScreen || isOpenLoginForm) && (
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, invalid }) => (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>
                      {parseText(cookies, 'Войти в аккаунт', 'Увійти в акаунт')}
                    </h3>
                    <Field
                      type="email"
                      name="email"
                      validate={composeValidators(required, emailValidation)}
                      render={renderInput({
                        placeholder: 'E-mail',
                        placeholderUa: 'E-mail',
                        viewTypeForm: 'profileForm',
                        classNameWrapper: styles.inputWrapper,
                      })}
                    />
                    <Field
                      type="password"
                      name="password"
                      validate={composeValidators(required, passwordValidation)}
                      render={renderInput({
                        placeholder: 'Пароль',
                        placeholderUa: 'Пароль',
                        viewTypeForm: 'profileForm',
                        classNameWrapper: styles.inputWrapper,
                      })}
                    />
                    <div className={styles.rememberBlock}>
                      <Field
                        name="remember"
                        type="checkbox"
                        render={renderCheckbox({
                          name: 'entry',
                          title: parseText(
                            cookies,
                            'Запомнить меня',
                            "Запам'ятати мене",
                          ),
                          classNameWrapperForLabelBefore: styles.labelBefore,
                        })}
                      />
                      <Link href="/password-recover" prefetch={false}>
                        <a className={styles.forgotPasswordButton}>
                          {parseText(
                            cookies,
                            'Забыли пароль?',
                            'Забули пароль',
                          )}
                        </a>
                      </Link>
                    </div>
                    {errorMessage && (
                      <p className={styles.errorMessage}>{errorMessage}</p>
                    )}
                    <Button
                      title="Войти"
                      titleUa="Ввійти"
                      classNameWrapper={styles.submit}
                      buttonType="submit"
                      viewType={(!isDesktopScreen && 'red') || 'white'}
                      disabled={submitting || invalid}
                    />
                  </form>
                )}
              />
            )}
            {(isDesktopScreen || !isOpenLoginForm) && (
              <div className={styles.addInfo}>
                <h3 className={styles.addInfoTitle}>
                  {parseText(
                    cookies,
                    'Ещё нет аккаунта?',
                    'Ще немає облікового запису?',
                  )}
                </h3>
                <p className={styles.addInfoDesc}>
                  {parseText(
                    cookies,
                    'Вы можете оформить заказ без регистрации. Или создать аккаунт после оформления заказа',
                    'Ви можете оформити замовлення без реєстрації. Або створити акаунт після оформлення замовлення',
                  )}
                </p>
                <div className={styles.addInfoFields}>
                  <RadioButton
                    name="makeOrder"
                    title={parseText(
                      cookies,
                      'Оформит заказ без регистрации',
                      'Оформить замовлення без реєстрації',
                    )}
                    inputName="notAuth"
                    checked={authValue === 'notAuth'}
                    onChange={() => setAuthValue('notAuth')}
                    classNameWrapper={styles.radioButtonWrapper}
                  />
                  <RadioButton
                    name="makeOrder"
                    title={parseText(
                      cookies,
                      'Зарегистрироваться во время оформления',
                      'Зареєструватися під час оформлення',
                    )}
                    inputName="auth"
                    checked={authValue === 'auth'}
                    onChange={() => setAuthValue('auth')}
                    classNameWrapper={styles.radioButtonWrapper}
                  />
                </div>
                <Link
                  href={{
                    pathname: '/order',
                    query: {
                      shouldAuth: authValue === 'auth',
                    },
                  }}
                  prefetch={false}
                >
                  <Button
                    title="Продолжить оформление заказа"
                    titleUa="Продовжити оформлення замовлення"
                    classNameWrapper={styles.addInfoButton}
                    buttonType="button"
                    viewType="black"
                    href
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withResponse(CartEntry);
