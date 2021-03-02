import React from 'react';
import styles from './FiltersItem.scss';

const FiltersItem = ({ item, removeOneFilter }) => {
  return (
    <div className={styles.indicatorsItem}>
      {item.value || item.name}
      <button
        className={styles.indicatorsButtonItem}
        onClick={() => {
          removeOneFilter();
        }}
      />
    </div>
  );
};

export default FiltersItem;
