import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './InputFormWrapper.scss';
import Input from '../Layout/Input/Input';

const InputFormWrapper = ({
  inputProps,
  meta,
  placeholder,
  type,
  message,
  classNameWrapperForInput,
  viewTypeForm,
}) => (
  <div className={styles.wrapper}>
    <Input
      placeholder={placeholder}
      type={type}
      viewType={viewTypeForm}
      addInputProps={inputProps}
      classNameWrapper={cx(styles.inputWrapper, classNameWrapperForInput)}
    />
    {message ? (
      <p>email уже занят</p>
    ) : (
      meta.touched && meta.error && <p>{meta.error}</p>
    )}
  </div>
);

InputFormWrapper.propTypes = {
  inputProps: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, null]),
  classNameWrapperForInput: PropTypes.string,
  viewTypeForm: PropTypes.string,
};

export default InputFormWrapper;
