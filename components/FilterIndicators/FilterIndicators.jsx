import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import {
  createCleanUrl,
  setFiltersInCookies,
  getArrOfFilters,
  parseText,
} from '../../utils/helpers';
import { arrSelect } from '../../utils/fakeFetch/arrSelect';
import { cookies } from '../../utils/getCookies';
import styles from './FilterIndicators.scss';

const getFilteredArr = (item, cookie) => {
  const filters = cookie.get('filters');
  return _.mapValues(filters, (value) => {
    if (Array.isArray(value)) {
      return value.filter(
        itemChild => itemChild.name !== item.name,
      );
    }
    return value;
  });
};

const FilterIndicators = ({
  buttonValue,
  buttonValueUa,
  classNameWrapper,
  router,
  pathname,
}) => {
  const [activeFilters, setActiveFilters] = useState(getArrOfFilters(arrSelect, cookies));
  const [, forceUpdate] = useState();
  useEffect(() => {
    setActiveFilters(getArrOfFilters(arrSelect, cookies));
  }, [getArrOfFilters(arrSelect, cookies).length]);

  return (
    <>
      {router.asPath.indexOf('/Products') === 0 && (
      <div
        className={cx(styles.indicators, classNameWrapper, {
          [styles.opacity]: activeFilters.length < 1,
        })}
      >
        {activeFilters.length > 0 && (
        <div className={styles.indicatorsButtons}>
          {activeFilters.length > 0 && (
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
                `${pathname}/${createCleanUrl(cookies).join('/')}`,
              );
            }}
          >
            {parseText(cookies, buttonValue, buttonValueUa)}
          </button>
          )}
          {activeFilters.map(item => (
            <div className={styles.indicatorsItem} key={item.nameSpec || item.name}>
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
                    `${pathname}/${createCleanUrl(cookies).join('/')}`,
                  );
                }}
                type="button"
              />
            </div>
          ))}
        </div>
        )}
      </div>
      )}
    </>
  );
};

FilterIndicators.propTypes = {
  buttonValue: PropTypes.string,
  buttonValueUa: PropTypes.string,
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
};

export default FilterIndicators;
