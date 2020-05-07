import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './FilterPrice.scss';

const FilterPrice = ({ classNameWrapper }) => {
  const [inputFromValue, setInputFromValue] = useState('');
  const [inputToValue, setInputToValue] = useState('');

  return (
    <div className={cx(styles.wrapper, classNameWrapper)}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <span className={styles.boundaryTextFrom}>от</span>
          <input
            type="text"
            className={styles.input}
            value={inputFromValue}
            onChange={e => setInputFromValue(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.boundaryTextTo}>до</span>
          <input
            type="text"
            className={styles.input}
            value={inputToValue}
            onChange={e => setInputToValue(e.target.value)}
          />
        </div>
      </div>
      <button type="button" className={styles.button}>Применить</button>
    </div>
  );
};

FilterPrice.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default FilterPrice;
