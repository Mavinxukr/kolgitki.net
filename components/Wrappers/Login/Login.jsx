import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/login';
import styles from './Login.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import Input from '../../Layout/Input/Input';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import { required } from '../../../utils/validation';
import IconExit from '../../../assets/svg/Group 795.svg';

const Login = () => {
  const [rememberChecked, setRememberChecked] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = values => (
    dispatch(login({}, { ...values }))
  );

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4>Вход в аккаунт</h4>
            <div className={styles.links}>
              <a
                href="/"
                className={`${styles.routeLink} ${styles.linkActive}`}
              >
                Войти
              </a>
              <a href="/" type="button" className={styles.routeLink}>
                Регистрация
              </a>
            </div>
            <div className={styles.inputs}>
              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <>
                    {meta.touched && meta.error && (
                      <p className={styles.errorMessage}>{meta.error}</p>
                    )}
                    <Input
                      placeholder="E-mail"
                      type="email"
                      viewType="userForm"
                      addInputProps={input}
                      classNameWrapper={styles.inputWrapper}
                    />
                  </>
                )}
              </Field>
              <Field name="password" validate={required}>
                {({ input, meta }) => (
                  <>
                    {meta.touched && meta.error && (
                      <p className={styles.errorMessage}>{meta.error}</p>
                    )}
                    <Input
                      placeholder="Пароль"
                      type="password"
                      viewType="userForm"
                      addInputProps={input}
                      classNameWrapper={styles.inputWrapper}
                    />
                  </>
                )}
              </Field>
            </div>
            <div className={styles.checkboxWrapper}>
              <Checkbox
                name="login"
                title="Запомнить меня"
                checked={rememberChecked}
                onChange={setRememberChecked}
              />
              <button className={styles.forgotPasswordButton} type="button">
                Забыли пароль?
              </button>
            </div>
            <Button width="100%" buttonType="submit" viewType="red" title="Войти" />
            <p className={styles.text}>
              Уже есть аккаунт?
              <a className={styles.registrationLink} href="/">
                Регистрация
              </a>
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

export default Login;
