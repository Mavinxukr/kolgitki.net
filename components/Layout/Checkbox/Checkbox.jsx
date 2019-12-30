import React from 'react';
import styles from './Checkbox.scss';

const Checkbox = ({ id, title }) => (
  <>
    <input type="checkbox" id={id} className={styles.field} />
    <label htmlFor={id} className={styles.label}>{title}</label>
  </>
);

export default Checkbox;
