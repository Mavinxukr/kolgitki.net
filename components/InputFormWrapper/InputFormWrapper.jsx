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
  onBlurCustom,
}) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    <Input
      placeholder={placeholder}
      placeholderUa={placeholderUa}
      type={number}
      viewType={viewTypeForm}
      addInputProps={inputProps}
      classNameWrapper={cx(styles.inputWrapper, classNameWrapperForInput, {
        [styles.error]: meta.touched && meta.error,
      })}
      isError={meta.touched && meta.error}
      onBlurCustom={onBlurCustom}
    />
    {message ? (
      <p>email уже занят</p>
    ) : (
        meta.touched && meta.error && (
          <p className={styles.errorText}>{meta.error}</p>
        )
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
  onBlurCustom: PropTypes.func,
};

export default InputFormWrapper;
