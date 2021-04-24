import { object } from 'prop-types';
import React from 'react';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import FiltersItem from './FiltersItem/FiltersItem';
import styles from './FiltersList.scss';

const FiltersList = ({
  installedFilters,
  clearFilters,
  updateProducts,
  removeOneFilter,
  isGifts
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters_list}>
        {Object.keys(installedFilters).length > 0 && (
          <button
            className={styles.indicatorsDeleteButton}
            onClick={() => {
              clearFilters();
            }}
          >
            {parseText(cookies, 'Удалить фильтры', 'Видалити фільтри')}
          </button>
        )}
        {Object.keys(installedFilters).map(filter => {
          return installedFilters[filter].split('|').map((item, index) => {
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
      {!isGifts && Object.keys(installedFilters).length > 0 && (
        <div className={styles.filters_button_block}>
          <a
            onClick={() => updateProducts(installedFilters)}
            className={styles.filters_button_apply}
          >
            {parseText(cookies, 'Применить', 'Застосувати')}
          </a>
        </div>
      )}
    </div>
  );
};

export default FiltersList;
