import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './RadioButton.scss';

const RadioButton = ({
  name,
  title,
  inputName,
  classNameWrapper,
  value,
  checked,
  onChange,
}) => (
  <div className={cx(styles.controllerWrapper, classNameWrapper)}>
    <input
      className={styles.field}
      type="radio"
      name={name}
      id={inputName}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={inputName} className={styles.controller}>
      <span className={styles.controllerBlock} />
      {title}
    </label>
  </div>
);

RadioButton.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  inputName: PropTypes.string,
  classNameWrapper: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioButton;
