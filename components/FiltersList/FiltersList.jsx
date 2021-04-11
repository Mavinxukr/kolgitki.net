import React from 'react';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import FiltersItem from './FiltersItem/FiltersItem';
import styles from './FiltersList.scss';

const FiltersList = ({
  installedFilters,
  clearFilters,
  getProductHandle,
  removeOneFilter
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters_list}>
        {Object.keys(installedFilters).length > 0 && (
          <button
            className={styles.indicatorsDeleteButton}
            onClick={() => {
              clearFilters(Object.keys(installedFilters));
            }}
          >
            {parseText(cookies, 'Удалить фильтры', 'Видалити фільтри')}
          </button>
        )}
        {Object.keys(installedFilters).map(filter => {
          return JSON.parse(installedFilters[filter]).map((item, index) => {
            return (
              <FiltersItem
                key={index}
                item={item}
                removeOneFilter={() => {
                  removeOneFilter(filter, item);
                }}
              />
            );
          });
        })}
      </div>
      {Object.keys(installedFilters).length > 0 && (
        <div className={styles.filters_button_block}>
          <a onClick={getProductHandle} className={styles.filters_button_apply}>
            {parseText(cookies, 'Применить', 'Застосувати')}
          </a>
        </div>
      )}
    </div>
  );
};

export default FiltersList;
