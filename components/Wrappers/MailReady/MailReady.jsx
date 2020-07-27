import React from 'react';
import styles from './MailReady.scss';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import IconExit from '../../../public/svg/Group795.svg';

const MailReady = ({ closePopup }) => (
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
    <button
      type="button"
      onClick={() => closePopup()}
      className={styles.closeButton}
    >
      <IconExit />
    </button>
  </div>
);

export default MailReady;
