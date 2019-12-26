import React from 'react';
import styles from './Form.scss';
import IconExit from '../../../assets/svg/Group 795.svg';

const Form = ({ children }) => (
  <div className={styles.formWrapper}>
    <form className={styles.form}>
      { children }
      <button type="button" className={styles.closeButton}>
        <IconExit />
      </button>
    </form>
  </div>
);

export default Form;
