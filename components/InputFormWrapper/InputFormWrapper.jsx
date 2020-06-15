import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '../Input/Input';
import styles from './InputFormWrapper.scss';

const InputFormWrapper = ({
  inputProps,
  meta,
  placeholder,
  placeholderUa,
  type,
  message,
  classNameWrapper,
  classNameWrapperForInput,
  viewTypeForm,
}) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    <Input
      placeholder={placeholder}
      placeholderUa={placeholderUa}
      type={type}
      viewType={viewTypeForm}
      addInputProps={inputProps}
      classNameWrapper={cx(styles.inputWrapper, classNameWrapperForInput, {
        [styles.error]: meta.touched && meta.error,
      })}
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
  placeholderUa: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  classNameWrapperForInput: PropTypes.string,
  viewTypeForm: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

export default InputFormWrapper;
