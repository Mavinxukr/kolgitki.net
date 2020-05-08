import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './FilterPrice.scss';

const checkValueOnNumber = (setInputValue, value, e) => {
  if (!/\d+$/g.test(e.target.value) && e.target.value.length) {
    return;
  }
  setInputValue(e.target.value);
};

const FilterPrice = ({ classNameWrapper, router, pathname }) => {
  const [inputFromValue, setInputFromValue] = useState(
    router.query.price_min || '',
  );
  const [inputToValue, setInputToValue] = useState(
    router.query.price_max || '',
  );

  return (
    <form
      className={cx(styles.wrapper, classNameWrapper)}
      onSubmit={(e) => {
        e.preventDefault();
        const priceMaxObj =
          (inputToValue.length && { price_max: inputToValue }) || {};
        if (router.query.price_max && !inputToValue.length) {
          delete router.query.price_max;
        }
        router.push({
          pathname,
          query: {
            ...router.query,
            price_min: (inputFromValue.length && inputFromValue) || 0,
            ...priceMaxObj,
          },
        });
      }}
    >
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <span className={styles.boundaryTextFrom}>от</span>
          <input
            type="text"
            className={styles.input}
            value={inputFromValue}
            onChange={e => checkValueOnNumber(setInputFromValue, inputFromValue, e)
            }
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.boundaryTextTo}>до</span>
          <input
            type="text"
            className={styles.input}
            value={inputToValue}
            onChange={e => checkValueOnNumber(setInputToValue, inputToValue, e)}
          />
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Применить
      </button>
    </form>
  );
};

FilterPrice.propTypes = {
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
};

export default FilterPrice;
