import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import cx from 'classnames';
import styles from './ChangePasswordForm.scss';
import { composeValidators, passwordValidation, required } from '../../utils/validation';
import { renderInput } from '../../utils/renderInputs';
import Button from '../Layout/Button/Button';
import { changeUserPassword } from '../../services/profile/userData';

const validateForm = (values) => {
  const errors = {};
  if (values.confirm_new_password !== values.new_password) {
    errors.confirm_new_password = 'Пароли не совпадают';
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
        setResultChangePassword('Пароль изменен успешно');
      } else {
        setResultChangePassword('Пароль не изменен');
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
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <Field
            name="old_password"
            validate={composeValidators(required, passwordValidation)}
          >
            {renderInput({
              placeholder: 'Старый пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: userEdit,
            })}
          </Field>
          <Field
            name="new_password"
            validate={composeValidators(required, passwordValidation)}
          >
            {renderInput({
              placeholder: 'Новый пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: userEdit,
            })}
          </Field>
          <Field name="confirm_new_password" validate={required}>
            {renderInput({
              placeholder: 'Повторите новый пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: userEdit,
            })}
          </Field>
          <Button
            buttonType="submit"
            title="Обновить пароль"
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
