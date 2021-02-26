import React from 'react';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import FiltersItem from './FiltersItem/FiltersItem';
import styles from './FiltersList.scss';

//the component accepts an object of all filters (except for categories) [installedFilters] and the method to clean up this object [clearFilters]
const FiltersList = ({ installedFilters, clearFilters, removeOneFilter }) => {
  return (
    <div className={styles.indicatorsButtons}>
      {Object.keys(installedFilters).length > 0 && (
        <button
          className={styles.indicatorsDeleteButton}
          onClick={() => {
            clearFilters(installedFilters);
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
  );
};

export default FiltersList;
