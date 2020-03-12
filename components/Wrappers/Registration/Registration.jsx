import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
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
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import {
  required,
  composeValidators,
  emailValidation,
  passwordValidation,
  snpValidation,
} from '../../../utils/validation';

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

  const router = useRouter();

  const isAuthFromStore = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  if (isAuthFromStore) {
    router.push('/confirm-email');
  }

  const onSubmit = (values) => {
    registration(
      {},
      {
        ...values,
        mailing: Number(values.mailing) || 0,
        role_id: values.role_id ? 3 : 2,
      },
    ).then((response) => {
      if (!response.status) {
        setErrorMessage(response.errors.email);
      } else {
        cookies.set('token', response.data.token, { maxAge: 60 * 60 * 24 });
        router.push('/confirm-email');
      }
    });
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, invalid, submitting }) => (
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
            <Field
              name="role_id"
              type="checkbox"
              render={renderCheckbox({
                name: 'registration',
                title: 'зарегестрироваться как оптовый полкупатель',
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
                classNameWrapper: styles.checkboxWrapper,
                classNameWrapperForLabelBefore: styles.labelBefore,
              })}
            />
            <FacebookLogin
              appId="490339138347349"
              autoLoad={false}
              callback={(response) => {
                dispatch(
                  loginViaFacebook({}, { fbToken: response.accessToken }),
                );
              }}
              cssClass={styles.facebookButton}
              textButton="Войти через Facebook"
            />
            <Button
              disabled={errorMessage ? false : invalid || submitting}
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
