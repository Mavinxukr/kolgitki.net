import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Input.scss';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';

const Input = ({
  placeholder,
  placeholderUa,
  type,
  viewType,
  classNameWrapper,
  addInputProps,
}) => {
  const classNameForInput = cx(styles.input, {
    [styles.inputUserForm]: viewType === 'userForm',
    [styles.inputForInfo]: viewType === 'info',
    [styles.footerInput]: viewType === 'footerInput',
    [styles.inputProfileForm]: viewType === 'profileForm',
  });

  return (
    <input
      type={type}
      placeholder={parseText(cookies, placeholder, placeholderUa)}
      className={cx(classNameWrapper, classNameForInput)}
      {...addInputProps}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  placeholderUa: PropTypes.string,
  type: PropTypes.string,
  viewType: PropTypes.string,
  classNameWrapper: PropTypes.string,
  addInputProps: PropTypes.object,
};

export default Input;
