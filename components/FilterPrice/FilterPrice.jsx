import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { createCleanUrl, setFiltersInCookies, parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './FilterPrice.scss';

const checkValueOnNumber = (setInputValue, value, e) => {
  if (!/\d+$/g.test(e.target.value) && e.target.value.length) {
    return;
  }
  setInputValue(e.target.value);
};

const configParamsForPriceMax = (inputToValue, filters) => {
  if (filters && filters.price_max && !inputToValue.length) {
    delete filters.price_max;
  }

  if (inputToValue.length) {
    return {
      price_max: inputToValue,
    };
  }

  return {};
};

const FilterPrice = ({ classNameWrapper, router, pathname }) => {
  const [inputFromValue, setInputFromValue] = useState(
    cookies.get('filters') && cookies.get('filters').price_min || '',
  );
  const [inputToValue, setInputToValue] = useState(
    cookies.get('filters') && cookies.get('filters').price_max || '',
  );

  return (
    <form
      className={cx(styles.wrapper, classNameWrapper)}
      onSubmit={(e) => {
        e.preventDefault();
        const filters = cookies.get('filters');
        setFiltersInCookies(cookies, {
          ...filters,
          ...configParamsForPriceMax(inputToValue, filters),
          price_min: (inputFromValue.length && inputFromValue) || 0,
        });
        router.push({
          pathname,
          query: router.query,
        }, `${pathname}/${createCleanUrl(cookies)}`);
      }}
    >
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <span className={styles.boundaryTextFrom}>
            {parseText(cookies, 'от', 'від')}
          </span>
          <input
            type="text"
            className={styles.input}
            value={inputFromValue}
            onChange={e => checkValueOnNumber(setInputFromValue, inputFromValue, e)
            }
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.boundaryTextTo}>
            до
          </span>
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
