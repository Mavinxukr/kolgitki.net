import React from 'react';
import styles from './ConfirmEmail.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import IconExit from '../../../assets/svg/Group 795.svg';

const ConfirmEmail = () => (
  <FormWrapper>
    <div className={styles.confirmEmailWrapper}>
      <h4>Регистрация прошла успешно</h4>
      <ButtonRoute classNameWrapper={styles.routeWrapper} />
      <button type="button" className={styles.closeButton}>
        <IconExit />
      </button>
    </div>
  </FormWrapper>
);

export default ConfirmEmail;
