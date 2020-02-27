import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FilterIndicators.scss';

const FilterIndicators = ({
  buttonValue,
  countOfProducts,
  classNameWrapper,
}) => (
  <div className={cx(styles.indicators, classNameWrapper)}>
    <div className={styles.indicatorsButtons}>
      <button className={styles.indicatorsDeleteButton} type="button">
        {buttonValue}
      </button>
      <button className={styles.indicatorsButtonItem} type="button">
        2
      </button>
    </div>
    <p className={styles.indicatorsCounter}>{countOfProducts}</p>
  </div>
);

FilterIndicators.propTypes = {
  buttonValue: PropTypes.string,
  countOfProducts: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

export default FilterIndicators;
