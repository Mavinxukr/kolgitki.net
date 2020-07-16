import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import cx from 'classnames';
import styles from './ChangePasswordForm.scss';
import {
  composeValidators,
  passwordValidation,
  required,
} from '../../utils/validation';
import { renderInput } from '../../utils/renderInputs';
import Button from '../Layout/Button/Button';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import { changeUserPassword } from '../../services/profile/userData';

const validateForm = (values) => {
  const errors = {};
  if (values.confirm_new_password !== values.new_password) {
    errors.confirm_new_password = parseText(
      cookies,
      'Пароли не совпадают',
      'Паролі не співпадають',
    );
  }
  return errors;
};

const ChangePasswordForm = ({ viewTypeButton, isUserEdit }) => {
  const [resultChangePassword, setResultChangePassword] = useState('');

  const userEdit = cx(styles.inputWrapper, {
    [styles.Edit]: isUserEdit,
  });

  const buttonUserEdit = cx(styles.formButtonWrapper, {
    [styles.buttonEdit]: isUserEdit,
  });

  const onSubmit = (values) => {
    changeUserPassword(
      {},
      {
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_new_password: values.confirm_new_password,
      },
    ).then((response) => {
      if (response.status) {
        setResultChangePassword(parseText(cookies, 'Пароль изменен успешно', 'Пароль змінений успішно'));
      } else {
        setResultChangePassword(parseText(cookies, 'Пароль не изменен', 'Пароль не змінений'));
      }
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validateForm}
      render={({
        handleSubmit, invalid, submitting, form,
      }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field
            name="old_password"
            validate={composeValidators(required, passwordValidation)}
          >
            {renderInput({
              placeholder: 'Старый пароль',
              placeholderUa: 'Старий пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: userEdit,
              classNameWrapperForInput: styles.input,
            })}
          </Field>
          <Field
            name="new_password"
            validate={composeValidators(required, passwordValidation)}
          >
            {renderInput({
              placeholder: 'Новый пароль',
              placeholderUa: 'Новий пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: userEdit,
              classNameWrapperForInput: styles.input,
            })}
          </Field>
          <Field name="confirm_new_password" validate={required}>
            {renderInput({
              placeholder: 'Повторите новый пароль',
              placeholderUa: 'Повторіть новий пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: userEdit,
              classNameWrapperForInput: styles.input,
            })}
          </Field>
          <Button
            buttonType="submit"
            title="Обновить пароль"
            titleUa="Оновити пароль"
            viewType={viewTypeButton}
            classNameWrapper={buttonUserEdit}
            disabled={invalid || submitting}
          />
          {resultChangePassword ? (
            <p className={styles.resultFromChange}>{resultChangePassword}</p>
          ) : null}
        </form>
      )}
    />
  );
};

export default ChangePasswordForm;
