import React from 'react';
import Link from 'next/link';
import styles from './ConfirmEmail.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import IconExit from '../../../public/svg/Group795.svg';

const ConfirmEmail = () => (
  <FormWrapper>
    <div className={styles.confirmEmailWrapper}>
      <h4>Регистрация прошла успешно</h4>
      <ButtonRoute classNameWrapper={styles.routeWrapper} />
      <Link href="/">
        <a className={styles.closeButton}>
          <IconExit />
        </a>
      </Link>
    </div>
  </FormWrapper>
);

export default ConfirmEmail;
