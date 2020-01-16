import React from 'react';
import styles from './ErrorValidation.scss';

const ErrorValidation = ({ errorMessage }) => (
  <div>
    <p className={styles.errorMessage}>{errorMessage}</p>
    <span className={styles.errorSquare} />
  </div>
);

export default ErrorValidation;
