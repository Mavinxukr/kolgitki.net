import React from 'react';
import { Field, Form } from 'react-final-form';
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
import styles from './CartEntry.scss';

const onSubmit = (values) => {
  console.log(values);
};

const CartEntry = () => (
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
                  type="text"
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
                  <button className={styles.forgotPasswordButton} type="button">
                    Забыли пароль?
                  </button>
                </div>
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
                classNameWrapper={styles.radioButtonWrapper}
              />
              <RadioButton
                name="makeOrder"
                title="Зарегистрироваться во время регистрации"
                inputName="auth"
                classNameWrapper={styles.radioButtonWrapper}
              />
            </div>
            <Button
              title="Продолжить оформление заказа"
              classNameWrapper={styles.addInfoButton}
              buttonType="button"
              viewType="black"
              href
            />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default CartEntry;
