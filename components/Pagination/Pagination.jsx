import React from 'react';
import styles from './Pagination.scss';
import IconArrow from '../../assets/svg/Group 6212.svg';

const Pagination = () => (
  <div className={styles.pagination}>
    <button className={styles.paginationArrowButton} type="button">
      <IconArrow className={styles.paginationArrowLeft} />
    </button>
    <button
      className={`${styles.paginationPageButton} ${styles.paginationPageButtonFirst}`}
      type="button"
    >
      1
    </button>
    <button className={styles.paginationPageButton} type="button">
      2
    </button>
    <button className={styles.paginationPageButton} type="button">
      3
    </button>
    <button className={styles.paginationPageButton} type="button">
      4
    </button>
    <button className={styles.paginationPageButton} type="button">
      ...
    </button>
    <button
      className={`${styles.paginationPageButton} ${styles.paginationPageButtonLast}`}
      type="button"
    >
      8
    </button>
    <button className={styles.paginationArrowButton} type="button">
      <IconArrow className={styles.paginationArrowRight} />
    </button>
  </div>
);

export default Pagination;
