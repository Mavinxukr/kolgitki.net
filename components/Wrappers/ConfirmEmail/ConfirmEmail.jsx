import React from 'react';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './ConfirmEmail.scss';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import IconExit from '../../../public/svg/Group795.svg';

const ConfirmEmail = ({ closePopup }) => (
  <div className={styles.confirmEmailWrapper}>
    <h4 className={styles.title}>
      {parseText(
        cookies,
        'Регистрация прошла успешно',
        'Реєстрація пройшла успішно',
      )}
    </h4>
    <ButtonRoute classNameWrapper={styles.routeWrapper} onClick={closePopup} />
    <button
      className={styles.closeButton}
      type="button"
      onClick={() => closePopup()}
    >
      <IconExit />
    </button>
  </div>
);

export default ConfirmEmail;
