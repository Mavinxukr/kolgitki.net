import React from 'react';
import styles from './MailReady.scss';
import FormWrapper from '../../Layout/Form/FormWrapper';

const MailReady = () => (
  <FormWrapper>
    <h3>Почти готово</h3>
    <p className={styles.text}>
      Мы отправили Вам на почту ссылку для восстановления пароля.
      Перейдите по ней, чтобы создать новый пароль. Возможно, она в папке СПАМ
    </p>
  </FormWrapper>
);

export default MailReady;
