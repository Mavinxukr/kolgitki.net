import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Field } from 'react-final-form';
import styles from './Recover.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import Button from '../../Layout/Button/Button';
import IconExit from '../../../public/svg/Group795.svg';
import { forgetPassword } from '../../../services/profile/userData';
import {
  composeValidators,
  emailValidation,
  required,
} from '../../../utils/validation';
import { renderInput } from '../../../utils/renderInputs';

const Recover = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const onSubmit = (values) => {
    forgetPassword({}, values).then((response) => {
      if (response.status) {
        router.push('/main-ready');
      } else {
        setErrorMessage('пользователь не найден');
      }
    });
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Восстановление пароля</h3>
            <Field
              type="email"
              name="email"
              validate={composeValidators(required, emailValidation)}
              render={renderInput({
                placeholder: 'E-mail',
                viewTypeForm: 'userForm',
                classNameWrapper: styles.inputWrapper,
              })}
            />
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <Button
              width="100%"
              buttonType="submit"
              viewType="red"
              title="Восстановить пароль"
              disabled={invalid || submitting}
            />
            <button type="button" className={styles.closeButton}>
              <IconExit />
            </button>
          </form>
        )}
      />
    </FormWrapper>
  );
};

export default Recover;
