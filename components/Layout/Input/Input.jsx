import React from 'react';
import cx from 'classnames';
import styles from './Input.scss';

const Input = ({ placeholder, type, viewType }) => {
  const classNameForInput = cx(styles.input, {
    [styles.inputUserForm]: viewType === 'userForm',
    [styles.inputForInfo]: viewType === 'info',
  });

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classNameForInput}
    />
  );
};

export default Input;
