import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Field } from 'react-final-form';
import Link from 'next/link';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './Recover.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import Button from '../../Layout/Button/Button';
import IconExit from '../../../public/svg/Group795.svg';
import { forgetPassword } from '../../../services/profile/userData';
import { emailValidation } from '../../../utils/validation';
import { renderInput } from '../../../utils/renderInputs';

const Recover = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const onSubmit = (values) => {
    forgetPassword({}, values).then((response) => {
      if (response.status) {
        router.push('/main-ready');
      } else {
        setErrorMessage(
          parseText(
            cookies,
            'пользователь не найден',
            'користувача не знайдено',
          ),
        );
      }
    });
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title}>
              {parseText(
                cookies,
                'Восстановление пароля',
                'Відновлення пароля',
              )}
            </h3>
            <Field
              type="email"
              name="email"
              validate={emailValidation}
              render={renderInput({
                placeholder: 'Ваш E-mail',
                placeholderUa: 'Ваш E-mail',
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
              titleUa="Відновити пароль"
              disabled={invalid || submitting}
            />
            <Link href="/" prefetch={false}>
              <a className={styles.closeButton}>
                <IconExit />
              </a>
            </Link>
          </form>
        )}
      />
    </FormWrapper>
  );
};

export default Recover;
