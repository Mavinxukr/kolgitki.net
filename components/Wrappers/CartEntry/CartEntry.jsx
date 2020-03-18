import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/Global/Global';
import Button from '../../Layout/Button/Button';
import RadioButton from '../../RadioButton/RadioButton';
import {
  composeValidators,
  emailValidation,
  passwordValidation,
  required,
} from '../../../utils/validation';
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import { saveToken, addToCartFromLocale } from '../../../utils/helpers';
import { login } from '../../../services/login';
import styles from './CartEntry.scss';

const CartEntry = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [authValue, setAuthValue] = useState('auth');

  const dispatch = useDispatch();

  const router = useRouter();

  const onSubmit = (values) => {
    login({}, values).then((response) => {
      if (response.status) {
        saveToken(values.remember, response.data.token);
        addToCartFromLocale(dispatch);
        router.push('/order');
      } else {
        setErrorMessage('Неверное имя или email');
      }
    });
  };

  return (
    <MainLayout>
      <div className={styles.cartEntry}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, invalid }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Войти в аккаунт</h3>
                  <Field
                    type="email"
                    name="email"
                    validate={composeValidators(required, emailValidation)}
                    render={renderInput({
                      placeholder: 'E-mail',
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
                        title: 'Запомнить меня',
                        classNameWrapperForLabelBefore: styles.labelBefore,
                      })}
                    />
                    <Link href="/password-recover">
                      <a className={styles.forgotPasswordButton}>
                        Забыли пароль?
                      </a>
                    </Link>
                  </div>
                  {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                  )}
                  <Button
                    title="Войти"
                    classNameWrapper={styles.submit}
                    buttonType="submit"
                    viewType="white"
                    disabled={submitting || invalid}
                  />
                </form>
              )}
            />
            <div className={styles.addInfo}>
              <h3 className={styles.addInfoTitle}>Ещё нет аккаунта?</h3>
              <p className={styles.addInfoDesc}>
                Вы можете оформить заказ без регистрации. Или создать аккаунт
                после оформления заказа
              </p>
              <div className={styles.addInfoFields}>
                <RadioButton
                  name="makeOrder"
                  title="Оформит заказ без регистрации"
                  inputName="notAuth"
                  checked={authValue === 'notAuth'}
                  onChange={() => setAuthValue('notAuth')}
                  classNameWrapper={styles.radioButtonWrapper}
                />
                <RadioButton
                  name="makeOrder"
                  title="Зарегистрироваться во время регистрации"
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
              >
                <Button
                  title="Продолжить оформление заказа"
                  classNameWrapper={styles.addInfoButton}
                  buttonType="button"
                  viewType="black"
                  href
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartEntry;
