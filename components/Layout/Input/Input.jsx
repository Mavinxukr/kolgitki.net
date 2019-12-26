import React from 'react';
import styles from './Input.scss';

const Input = ({ placeholder }) => (
  <input type="text" placeholder={placeholder} className={styles.input} />
);

export default Input;
