import React from 'react';
import styles from './RadioButton.scss';

const RadioButton = ({ name, title, id }) => (
  <>
    <input className={styles.field} type="radio" name={name} id={id} />
    <label htmlFor={id} className={styles.controller}>
      <span className={styles.controllerBlock} />
      {title}
    </label>
  </>
);

export default RadioButton;
