import React from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.scss';

const Counter = ({
  classNameForCounter,
  count,
  amountOfProduct,
  setAmountOfProduct,
  updateCount,
  optProduct,
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
        optProduct
          ? amountOfProduct === 0 || !count
          : amountOfProduct === 1 || !count
      }
    >
      <p>-</p>
    </button>
    <input
      type="text"
      pattern="[0-9]"
      className={styles.countProductIndicator}
      value={amountOfProduct}
      onChange={(e) => {
        setAmountOfProduct(+e.target.value);
        if (updateCount) {
          updateCount(+e.target.value);
        }
        if (e.target.value > count) {
          setAmountOfProduct(+count);
        }
      }}
    />
    <button
      onClick={() => {
        setAmountOfProduct(amountOfProduct + 1);
        if (updateCount) {
          updateCount(amountOfProduct + 1);
        }
      }}
      className={styles.buttonChangeCount}
      type="button"
      disabled={amountOfProduct === count}
    >
      <p>+</p>
    </button>
  </div>
);

Counter.propTypes = {
  classNameForCounter: PropTypes.string,
  count: PropTypes.number,
  optProduct: PropTypes.bool,
  amountOfProduct: PropTypes.number,
  setAmountOfProduct: PropTypes.func,
  updateCount: PropTypes.func,
};

export default Counter;
