import React from 'react';
import styles from './Checkbox.scss';

const Checkbox = ({ id, title, fontSize }) => (
  <>
    <input type="checkbox" id={id} className={styles.field} />
    <label style={{ fontSize }} htmlFor={id} className={styles.label}>
      {title}
    </label>
  </>
);

export default Checkbox;
