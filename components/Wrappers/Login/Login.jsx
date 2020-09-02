import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import {
  loginViaFacebook,
  sendCurrentUserData,
} from '../../../redux/actions/currentUser';
import { isAuthSelector } from '../../../utils/selectors';
import { login } from '../../../services/login';
import styles from './Login.scss';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import Registration from '../Registration/Registration';
import Recover from '../Recover/Recover';
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

const Login = ({ closePopup, openPopup }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const router = useRouter();

  const isAuthFromStore = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  if (isAuthFromStore) {
    router.push('/');
  }

  if (isLoaderActive) {
    return <Loader isPopup />;
  }

  const onSubmit = (values) => {
    setIsLoaderActive(true);
    login({}, values).then((response) => {
      if (response.status) {
        saveToken(values.remember, response.data.token);
        addToCartFromLocale(dispatch);
        dispatch(sendCurrentUserData({}));
        closePopup();
      } else {
        setIsLoaderActive(false);
        setErrorMessage(response.message);
      }
    });
  };

  return (
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
                <button
                  type="button"
                  className={cx(styles.routeLink, styles.linkActive)}
                >
                  {parseText(cookies, 'Войти', 'Ввійти')}
                </button>
                <button
                  type="button"
                  onClick={() => openPopup(
                    <Registration
                      closePopup={closePopup}
                      openPopup={openPopup}
                    />,
                  )
                  }
                  className={styles.routeLink}
                >
                  {parseText(cookies, 'Регистрация', 'Реєстрація')}
                </button>
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
                    classNameWrapperForLabel: styles.labelCheckbox,
                    classNameWrapperForLabelBefore: styles.labelBefore,
                  })}
                />
                <button
                  className={styles.forgotPasswordButton}
                  type="button"
                  onClick={() => openPopup(
                    <Recover closePopup={closePopup} openPopup={openPopup} />,
                  )
                  }
                >
                  {parseText(cookies, 'Забыли пароль?', 'Забули пароль?')}
                </button>
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
              {/* <p className={styles.text}> */}
              {/*  {parseText(cookies, 'Не зарегистрированы?', 'Вже є акаунт?')} */}
              {/*  <button */}
              {/*    type="button" */}
              {/*    className={styles.registrationLink} */}
              {/*    onClick={() => openPopup( */}
              {/*      <Registration */}
              {/*        closePopup={closePopup} */}
              {/*        openPopup={openPopup} */}
              {/*      />, */}
              {/*    ) */}
              {/*    } */}
              {/*  > */}
              {/*    {parseText(cookies, 'Регистрация', 'Реєстрація')} */}
              {/*  </button> */}
              {/* </p> */}
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

export default Login;
