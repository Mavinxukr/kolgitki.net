import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './Checkbox.scss';

const Checkbox = ({
  title,
  titleUa,
  checked,
  onChange,
  classNameWrapper,
  name,
  classNameWrapperForLabel,
  classNameWrapperForLabelBefore,
}) => {

  const onChangeCallback = ev => onChange(!checked, ev);

  const classNameForLabel = cx(cx(styles.label, classNameWrapperForLabel), {
    [classNameWrapperForLabelBefore]: checked,
  });

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
      <label
        htmlFor={name}
        className={classNameForLabel}
      >
        {parseText(cookies, title, titleUa)}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  titleUa: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  classNameWrapper: PropTypes.string,
  classNameWrapperForLabel: PropTypes.string,
  classNameWrapperForLabelBefore: PropTypes.string,
};

export default Checkbox;
