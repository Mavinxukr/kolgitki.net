import React from 'react';
import styles from './Sort.scss';

const Sort = () => (
  <div className={styles.sort}>
    <p className={styles.sortDesc}>Сперва:</p>
    <input className={styles.field} type="checkbox" id="first" />
    <label className={styles.sortController} htmlFor="first">
      Популярные
    </label>
  </div>
);

export default Sort;
