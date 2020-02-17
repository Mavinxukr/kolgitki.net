import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
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

const ChangePasswordForm = ({ viewTypeButton }) => {
  const [resultChangePassword, setResultChangePassword] = useState('');

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
          onSubmit={(e) => {
            handleSubmit(e);
            form.reset();
          }}
        >
          <Field
            name="old_password"
            validate={composeValidators(required, passwordValidation)}
          >
            {renderInput({
              placeholder: 'Старый пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: styles.inputWrapper,
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
              classNameWrapper: styles.inputWrapper,
            })}
          </Field>
          <Field name="confirm_new_password" validate={required}>
            {renderInput({
              placeholder: 'Повторите новый пароль',
              type: 'password',
              viewTypeForm: 'profileForm',
              classNameWrapper: styles.inputWrapper,
            })}
          </Field>
          <Button
            buttonType="submit"
            title="Обновить пароль"
            viewType={viewTypeButton}
            classNameWrapper={styles.formButtonWrapper}
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
