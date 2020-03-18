import React from 'react';
import Link from 'next/link';
import styles from './MailReady.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import IconExit from '../../../public/svg/Group795.svg';

const MailReady = () => (
  <FormWrapper>
    <div className={styles.content}>
      <h3>Почти готово</h3>
      <p className={styles.text}>
        Мы отправили Вам на почту ссылку для восстановления пароля.
        Перейдите по ней, чтобы создать новый пароль. Возможно, она в папке СПАМ
      </p>
      <Link href="/">
        <a className={styles.closeButton}>
          <IconExit />
        </a>
      </Link>
    </div>
  </FormWrapper>
);

export default MailReady;
