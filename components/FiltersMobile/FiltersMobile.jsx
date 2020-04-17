import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import IconExit from '../../public/svg/Group631.svg';
import styles from './FiltersMobile.scss';

const FiltersMobile = ({
  router, pathname, classNameWrapper, productsLength,
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const classNameForSideBar = cx(styles.sideBar, {
    [styles.openSideBar]: isOpenSideBar,
  });

  return (
    <>
      <button
        onClick={() => setIsOpenSideBar(true)}
        className={cx(styles.button, classNameWrapper)}
        type="button"
      >
        Фильтры <span className={styles.filtersCounter}>3</span>
      </button>
      <aside className={classNameForSideBar}>
        <div className={styles.sideBarHeader}>
          <button
            className={styles.buttonExit}
            type="button"
            onClick={() => setIsOpenSideBar(false)}
          >
            <IconExit className={styles.iconExit} />
          </button>
          <p className={styles.filterTitle}>Фильтры</p>
          <button type="button" className={styles.clearButton}>
            Очистить все
          </button>
        </div>
        <div className={styles.sideBarContent}>
          <Sort router={router} pathname={pathname} />
          {/* <Filter /> */}
          {/* <Filter /> */}
          {/* <Filter /> */}
          {/* <Filter /> */}
          {/* <Filter /> */}
        </div>
        <button
          type="button"
          className={styles.showButton}
          onClick={() => setIsOpenSideBar(false)}
        >
          Показать {productsLength} товара(ов)
        </button>
      </aside>
    </>
  );
};

FiltersMobile.propTypes = {
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  productsLength: PropTypes.number,
};

export default FiltersMobile;
