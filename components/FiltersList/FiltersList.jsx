import { object } from 'prop-types';
import React from 'react';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import FiltersItem from './FiltersItem/FiltersItem';
import styles from './FiltersList.scss';

const FiltersList = React.memo(
  ({
    filters,
    loading,
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
            return installedFilters[filter].map(item => {
              let name = item.value || item.name;
              return (
                <FiltersItem
                  key={item.id}
                  item={name}
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
            <button
              disabled={loading}
              onClick={() => updateProducts()}
              className={styles.filters_button_apply}
            >
              {parseText(cookies, 'Применить', 'Застосувати')}
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default FiltersList;
