import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Checkbox.scss';

const Checkbox = ({
  title, checked, onChange, classNameWrapper, name,
}) => {
  const onChangeCallback = ev => onChange(!checked, ev);

  return (
    <div className={cx(styles.checkboxWrapper, classNameWrapper)}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        id={name}
        className={styles.field}
        onChange={onChangeCallback}
      />
      <label htmlFor={name} className={styles.label}>
        {title}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  classNameWrapper: PropTypes.string,
};

export default Checkbox;
