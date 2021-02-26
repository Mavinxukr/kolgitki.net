import React from 'react';
import styles from './FiltersItem.scss';

const FiltersItem = ({ item, removeOneFilter }) => {
  return (
    <div className={styles.indicatorsItem}>
      {item}
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
