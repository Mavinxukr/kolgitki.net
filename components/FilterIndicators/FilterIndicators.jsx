import React from 'react';
import styles from './FilterIndicators.scss';

const FilterIndicators = ({ buttonValue, countOfProducts }) => (
  <div className={styles.indicators}>
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

export default FilterIndicators;
