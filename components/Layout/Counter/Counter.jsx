import React from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.scss';

const Counter = ({
  classNameForCounter,
  count,
  amountOfProduct,
  setAmountOfProduct,
}) => (
  <div className={`${classNameForCounter} ${styles.counterProducts}`}>
    <button
      onClick={() => setAmountOfProduct(amountOfProduct - 1)}
      className={styles.buttonChangeCount}
      type="button"
      disabled={amountOfProduct === 1}
    >
      -
    </button>
    <p className={styles.countProductIndicator}>{amountOfProduct}</p>
    <button
      onClick={() => setAmountOfProduct(amountOfProduct + 1)}
      className={styles.buttonChangeCount}
      type="button"
      disabled={amountOfProduct === count || count === null}
    >
      +
    </button>
  </div>
);

Counter.propTypes = {
  classNameForCounter: PropTypes.string,
  count: PropTypes.number,
  amountOfProduct: PropTypes.number,
  setAmountOfProduct: PropTypes.func,
};

export default Counter;
