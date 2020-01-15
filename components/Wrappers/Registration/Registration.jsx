import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { registration } from '../../../redux/actions/registration';
import styles from './Registration.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import Input from '../../Layout/Input/Input';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import IconExit from '../../../assets/svg/Group 795.svg';

const Registration = () => {
  const [mailingChecked, setMailingChecked] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = values => (
    dispatch(registration({}, { ...values, mailing: Number(mailingChecked), role_id: 2 }))
  );

  const required = (value) => {
    if (!value || value.length === 0) {
      return 'field is required';
    }
    return undefined;
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Регистрация аккаунта</h3>
            <div className={styles.links}>
              <a href="/" type="button" className={styles.routeLink}>
                Войти
              </a>
              <a
                href="/"
                type="button"
                className={`${styles.routeLink} ${styles.linkActive}`}
              >
                Регистрация
              </a>
            </div>
            <div className={styles.inputs}>
              <Field name="snp" validate={required}>
                {({ input, meta }) => (
                  <>
                    {meta.touched && meta.error && (
                      <p className={styles.errorMessage}>{meta.error}</p>
                    )}
                    <Input
                      placeholder="ФИО"
                      type="text"
                      viewType="userForm"
                      addInputProps={input}
                      classNameWrapper={styles.inputWrapper}
                    />
                  </>
                )}
              </Field>
              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <>
                    {meta.touched && meta.error && (
                      <p className={styles.errorMessage}>{meta.error}</p>
                    )}
                    <Input
                      placeholder="E-mail"
                      type="text"
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
              <Field name="password_confirmation" validate={required}>
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
            <Checkbox
              name="registration"
              title="Я хочу получать информацию о акциях и скидках"
              classNameWrapper={styles.checkboxWrapper}
              checked={mailingChecked}
              onChange={setMailingChecked}
            />
            <Button
              disabled={invalid}
              width="100%"
              buttonType="submit"
              viewType="red"
              title="Создать аккаунт"
            />
            <p className={styles.text}>
              Уже есть аккаунт?
              <a className={styles.loginLink} href="/">
                Войти
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

export default Registration;
