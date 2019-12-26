import React from 'react';
import styles from './ButtonForm.scss';

const ButtonForm = ({ title }) => (
  <button type="submit" className={styles.button}>{title}</button>
);

export default ButtonForm;
