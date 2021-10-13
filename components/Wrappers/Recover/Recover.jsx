import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './Recover.scss';
import Button from '../../Layout/Button/Button';
import MailReady from '../MailReady/MailReady';
import IconExit from '../../../public/svg/Group795.svg';
import { forgetPassword } from '../../../services/profile/userData';
import { emailValidation } from '../../../utils/validation';
import { renderInput } from '../../../utils/renderInputs';

const Recover = ({ closePopup, openPopup }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const onSubmit = values => {
    setDisabled(true);
    forgetPassword({}, values)
      .then(response => {
        console.log(response);
        if (response.status) {
          openPopup(<MailReady closePopup={closePopup} />);
        } else {
          setErrorMessage(
            parseText(
              cookies,
              'пользователь не найден',
              'користувача не знайдено'
            )
          );
        }
      })

      .finally(() => setDisabled(false));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, invalid }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>
            {parseText(cookies, 'Восстановление пароля', 'Відновлення пароля')}
          </h3>
          <Field
            type="email"
            name="email"
            validate={emailValidation}
            render={renderInput({
              placeholder: 'Ваш E-mail',
              placeholderUa: 'Ваш E-mail',
              viewTypeForm: 'userForm',
              classNameWrapper: styles.inputWrapper
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
            disabled={disabled || invalid || submitting}
          />
          <button
            onClick={() => closePopup()}
            type="button"
            className={styles.closeButton}
          >
            <IconExit />
          </button>
        </form>
      )}
    />
  );
};

export default Recover;
