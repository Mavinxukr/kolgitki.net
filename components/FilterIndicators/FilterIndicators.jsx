import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import {
  createCleanUrl,
  setFiltersInCookies,
  getArrOfFilters,
} from '../../utils/helpers';
import { arrSelect } from '../../utils/fakeFetch/arrSelect';
import { cookies } from '../../utils/getCookies';
import styles from './FilterIndicators.scss';

const getFilteredArr = (item, cookie) => {
  const filters = cookie.get('filters');
  return _.mapValues(filters, (value) => {
    if (Array.isArray(value)) {
      return value.filter(
        itemChild => itemChild.id !== item.id && itemChild.name !== item.name,
      );
    }
    return value;
  });
};

const FilterIndicators = ({
  buttonValue,
  classNameWrapper,
  router,
  pathname,
}) => (
  <div className={cx(styles.indicators, classNameWrapper)}>
    <div className={styles.indicatorsButtons}>
      <button
        className={styles.indicatorsDeleteButton}
        type="button"
        onClick={() => {
          const filters = cookies.get('filters');
          arrSelect.forEach(item => delete filters[item]);
          setFiltersInCookies(cookies, filters);
          router.push(
            {
              pathname,
              query: router.query,
            },
            `${pathname}_${createCleanUrl(cookies).join('_')}`,
          );
        }}
      >
        {buttonValue}
      </button>
      {cookies.get('filters')
        && getArrOfFilters(arrSelect, cookies).map(item => (
          <div className={styles.indicatorsItem} key={item.id}>
            {item.nameSpec || item.name}
            <button
              className={styles.indicatorsButtonItem}
              onClick={() => {
                setFiltersInCookies(cookies, getFilteredArr(item, cookies));
                router.push(
                  {
                    pathname,
                    query: router.query,
                  },
                  `${pathname}_${createCleanUrl(cookies).join('_')}`,
                );
              }}
              type="button"
            />
          </div>
        ))}
    </div>
  </div>
);

FilterIndicators.propTypes = {
  buttonValue: PropTypes.string,
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
};

export default FilterIndicators;
