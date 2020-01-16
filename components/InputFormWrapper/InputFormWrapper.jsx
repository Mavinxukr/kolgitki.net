import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputFormWrapper.scss';
import ErrorValidation from '../ErrorValidation/ErrorValidation';
import Input from '../Layout/Input/Input';

const InputFormWrapper = ({
  inputProps,
  meta,
  placeholder,
  type,
  message,
}) => (
  <div className={styles.wrapper}>
    {message ? (
      <ErrorValidation errorMessage="E-mail уже занят" />
    ) : (
      meta.touched
        && meta.error && <ErrorValidation errorMessage={meta.error} />
    )}
    <Input
      placeholder={placeholder}
      type={type}
      viewType="userForm"
      addInputProps={inputProps}
      classNameWrapper={styles.inputWrapper}
    />
  </div>
);

InputFormWrapper.propTypes = {
  inputProps: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.oneOf([PropTypes.string, null]),
};

export default InputFormWrapper;
