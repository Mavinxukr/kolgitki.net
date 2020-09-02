import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { cookies } from '../../../utils/getCookies';
import { registration } from '../../../services/registration';
import { isAuthSelector } from '../../../utils/selectors';
import styles from './Registration.scss';
import Button from '../../Layout/Button/Button';
import Login from '../Login/Login';
import Loader from '../../Loader/Loader';
import ConfirmEmail from '../ConfirmEmail/ConfirmEmail';
import { renderInput, renderCheckbox } from '../../../utils/renderInputs';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
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

const Registration = ({ closePopup, openPopup }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const isAuthFromStore = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  if (isAuthFromStore) {
    openPopup(<ConfirmEmail closePopup={closePopup} />);
  }

  if (isLoaderActive) {
    return <Loader isPopup />;
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
        dispatch(sendCurrentUserData({}));
        openPopup(<ConfirmEmail closePopup={closePopup} />);
      }
    });
  };

  return (
    <div className={styles.formWrapper}>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, invalid, submitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formContentWrapper}>
              <h4 className={styles.title}>
                {parseText(
                  cookies,
                  'Регистрация аккаунта',
                  'Реєстрація аккаунта',
                )}
              </h4>
              <div className={styles.links}>
                <button
                  type="button"
                  onClick={() => openPopup(
                    <Login closePopup={closePopup} openPopup={openPopup} />,
                  )
                  }
                  className={styles.routeLink}
                >
                  {parseText(cookies, 'Войти', 'Ввійти')}
                </button>
                <button
                  type="button"
                  className={cx(styles.routeLink, styles.linkActive)}
                >
                  {parseText(cookies, 'Регистрация', 'Реєстрація')}
                </button>
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
                  title: 'Зарегистрироваться как оптовый покупатель',
                  titleUa: 'Зареєструватися як оптовий покупець',
                  classNameWrapperForLabel: styles.labelCheckbox,
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
                  classNameWrapperForLabel: styles.labelCheckbox,
                  classNameWrapper: styles.checkboxWrapper,
                  classNameWrapperForLabelBefore: styles.labelBefore,
                })}
              />
              <Button
                disabled={errorMessage ? false : invalid || submitting}
                width="100%"
                buttonType="submit"
                viewType="red"
                title="Создать аккаунт"
                titleUa="Створити аккаунт"
              />
              <p className={styles.text}>
                {parseText(cookies, 'Уже есть аккаунт?', 'Вже є акаунт?')}
                <button
                  className={styles.loginLink}
                  type="button"
                  onClick={() => openPopup(
                    <Login closePopup={closePopup} openPopup={openPopup} />,
                  )
                  }
                >
                  {parseText(cookies, 'Войти', 'Ввійти')}
                </button>
              </p>
            </div>
            <button
              type="button"
              onClick={() => closePopup()}
              className={styles.closeButton}
            >
              <IconExit />
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Registration;
