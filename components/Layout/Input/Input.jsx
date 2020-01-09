import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const Input = ({
  placeholder, type, viewType, addClassNameForInput,
}) => {
  const classNameForInput = cx(styles.input, {
    [styles.inputUserForm]: viewType === 'userForm',
    [styles.inputForInfo]: viewType === 'info',
    [styles.footerInput]: viewType === 'footerInput',
  });

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${addClassNameForInput} ${classNameForInput}`}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  viewType: PropTypes.string,
  addClassNameForInput: PropTypes.string,
};

export default Input;
