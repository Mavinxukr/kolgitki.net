import React from 'react';
import styles from './Select.scss';

const Select = ({ title, width }) => (
  <div className={styles.selectorItem} style={width}>
    {title}
  </div>
);

export default Select;
