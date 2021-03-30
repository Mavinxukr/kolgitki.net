import React from 'react';
import styles from './Spinner.scss';
export const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
