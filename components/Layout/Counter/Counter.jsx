import React from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.scss';

const Counter = ({
  classNameForCounter,
  count,
  amountOfProduct,
  setAmountOfProduct,
  updateCount,
  isCart,
}) => (
  <div className={`${classNameForCounter} ${styles.counterProducts}`}>
    <button
      onClick={() => {
        setAmountOfProduct(amountOfProduct - 1);
        if (updateCount) {
          updateCount(amountOfProduct - 1);
        }
      }}
      className={styles.buttonChangeCount}
      type="button"
      disabled={
        (isCart && amountOfProduct === 1)
        || amountOfProduct === 0
        || !count
      }
    >
      -
    </button>
    <p className={styles.countProductIndicator}>{amountOfProduct}</p>
    <button
      onClick={() => {
        setAmountOfProduct(amountOfProduct + 1);
        if (updateCount) {
          updateCount(amountOfProduct + 1);
        }
      }}
      className={styles.buttonChangeCount}
      type="button"
      disabled={amountOfProduct === count || !count}
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
  updateCount: PropTypes.func,
  isCart: PropTypes.bool,
};

export default Counter;
