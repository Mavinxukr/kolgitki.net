import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Link from 'next/link';
import { cookies } from '../../../utils/getCookies';
import { registration } from '../../../services/registration';
import { loginViaFacebook } from '../../../redux/actions/currentUser';
import { isAuthSelector } from '../../../utils/selectors';
import styles from './Registration.scss';
import Button from '../../Layout/Button/Button';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import Loader from '../../Loader/Loader';
import FacebookButton from '../../FacebookButton/FacebookButton';
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import {
  required,
  composeValidators,
  emailValidation,
  passwordValidation,
  snpValidation,
} from '../../../utils/validation';
import { addToCartFromLocale, parseText } from '../../../utils/helpers';

import IconExit from '../../../public/svg/Group795.svg';

const validateForm = (values) => {
  const errors = {};
  if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Пароли не совпадают';
  }
  return errors;
};

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const router = useRouter();

  const isAuthFromStore = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  if (isAuthFromStore) {
    router.push('/confirm-email');
  }

  if (isLoaderActive) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    setIsLoaderActive(true);
    registration(
      {},
      {
        ...values,
        mailing: Number(values.mailing) || 0,
        role_id: values.role_id ? 3 : 2,
      },
    ).then((response) => {
      if (!response.status) {
        setIsLoaderActive(false);
        setErrorMessage(response.errors.email);
      } else {
        cookies.set('token', response.data.token, { maxAge: 60 * 60 * 24 });
        addToCartFromLocale(dispatch);
        router.push('/confirm-email');
      }
    });
  };

  return (
    <FormWrapper>
      <div className={styles.formWrapper}>
        <Form
          onSubmit={onSubmit}
          validate={validateForm}
          render={({ handleSubmit, invalid, submitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formContentWrapper}>
                <h4 className={styles.title}>
                  {parseText(cookies, 'Регистрация аккаунта', 'Реєстрація аккаунта')}
                </h4>
                <div className={styles.links}>
                  <Link href="/login" prefetch={false}>
                    <a className={styles.routeLink}>
                      {parseText(cookies, 'Войти', 'Ввійти')}
                    </a>
                  </Link>
                  <Link href="/registration" prefetch={false}>
                    <a className={cx(styles.routeLink, styles.linkActive)}>
                      {parseText(cookies, 'Регистрация', 'Реєстрація')}
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
                      placeholderUa: 'ПІБ',
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
                      placeholderUa: 'E-mail',
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
                      placeholderUa: 'Підтвердіть пароль',
                      type: 'password',
                      viewTypeForm: 'userForm',
                      classNameWrapper: styles.inputWrapper,
                    })}
                  </Field>
                </div>
                <Field
                  name="role_id"
                  type="checkbox"
                  render={renderCheckbox({
                    name: 'registration',
                    title: 'зарегестрироваться как оптовый полкупатель',
                    titleUa: 'зареєструватися як оптовий покупець',
                    classNameWrapper: styles.checkboxWrapperRoleUser,
                    classNameWrapperForLabelBefore: styles.labelBefore,
                  })}
                />
                <Field
                  name="mailing"
                  type="checkbox"
                  render={renderCheckbox({
                    name: 'registration',
                    title: 'Я хочу получать информацию о акциях и скидках',
                    titleUa: 'Я хочу имувати інформація про акції та знижки',
                    classNameWrapper: styles.checkboxWrapper,
                    classNameWrapperForLabelBefore: styles.labelBefore,
                  })}
                />
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
                  disabled={errorMessage ? false : invalid || submitting}
                  width="100%"
                  buttonType="submit"
                  viewType="auth"
                  title="Создать аккаунт"
                  titleUa="Створити аккаунт"
                />
                <p className={styles.text}>
                  {parseText(cookies, 'Уже есть аккаунт?', 'Вже є акаунт?')}
                  <Link href="/login" prefetch={false}>
                    <a className={styles.loginLink}>
                      {parseText(cookies, 'Войти', 'Ввійти')}
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

export default Registration;
