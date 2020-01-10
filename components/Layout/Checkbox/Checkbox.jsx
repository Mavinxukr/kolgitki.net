import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.scss';

const Checkbox = ({
  id, title, checked, onClick, classNameForCheckbox,
}) => (
  <div className={`${styles.checkboxWrapper} ${classNameForCheckbox}`}>
    <input type="checkbox" checked={checked} id={id} className={styles.field} />
    <label htmlFor={id} className={styles.label} onClick={onClick(!checked)}>
      {title}
    </label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  classNameForCheckbox: PropTypes.string,
};

export default Checkbox;
