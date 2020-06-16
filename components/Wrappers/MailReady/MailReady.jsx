import React from 'react';
import Link from 'next/link';
import styles from './MailReady.scss';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import IconExit from '../../../public/svg/Group795.svg';

const MailReady = () => (
  <FormWrapper>
    <div className={styles.content}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Почти готово', 'Майже готово')}
      </h3>
      <p className={styles.text}>
        {parseText(
          cookies,
          'Мы отправили Вам на почту ссылку для восстановления пароля. Перейдите по ней, чтобы создать новый пароль. Возможно, она в папке СПАМ',
          'Ми відправили Вам на пошту посилання для відновлення пароля. Перейдіть по ній, щоб створити новий пароль. Можливо, вона в папці СПАМ',
        )}
      </p>
      <Link href="/" prefetch={false}>
        <a className={styles.closeButton}>
          <IconExit />
        </a>
      </Link>
    </div>
  </FormWrapper>
);

export default MailReady;
