import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Input.scss';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import MaskIcon from '../../public/svg/exclamation-mark.svg';

const Input = ({
  placeholder,
  placeholderUa,
  type,
  viewType,
  classNameWrapper,
  addInputProps,
  isError,
  onBlurCustom,
}) => {
  const classNameForInput = cx(styles.input, {
    [styles.inputUserForm]: viewType === 'userForm',
    [styles.inputForInfo]: viewType === 'info',
    [styles.footerInput]: viewType === 'footerInput',
    [styles.inputProfileForm]: viewType === 'profileForm',
  });

  return (
    <div className={styles.inputWrapper}>
      <input
        id="input"
        type={type}
        placeholder={parseText(cookies, placeholder, placeholderUa)}
        className={cx(classNameWrapper, classNameForInput)}
        {...addInputProps}
        autoComplete="off"
        onBlur={(e) => {
          addInputProps.onBlur(e);
          if (onBlurCustom) {
            onBlurCustom();
          }
        }}
      />
      {isError && <MaskIcon className={styles.errorIcon} />}
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  placeholderUa: PropTypes.string,
  type: PropTypes.string,
  viewType: PropTypes.string,
  classNameWrapper: PropTypes.string,
  addInputProps: PropTypes.object,
  isError: PropTypes.bool,
  onBlurCustom: PropTypes.func,
};

export default Input;
