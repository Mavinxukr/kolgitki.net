import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './SideBarFilter.scss';
import { cookies } from '../../utils/getCookies';
import { createCleanUrl, setFiltersInCookies } from '../../utils/helpers';
import IconExit from '../../public/svg/Group631.svg';

const arrSelect = ['attribute', 'sizes', 'brands', 'colors', 'tags'];

const SideBarFilter = ({
  router,
  setIsOpenSideBar,
  children,
  pathname,
  productsLength,
  isOpenSideBar,
  title,
}) => {
  const classNameForSideBar = cx(styles.sideBar, {
    [styles.openSideBar]: isOpenSideBar,
  });

  if (isOpenSideBar) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflow = 'initial';
  }

  return (
    <aside className={classNameForSideBar}>
      <div className={styles.sideBarHeader}>
        <button
          className={styles.buttonExit}
          type="button"
          onClick={() => setIsOpenSideBar(false)}
        >
          <IconExit className={styles.iconExit} />
        </button>
        <p className={styles.filterTitle}>{title}</p>
        {title === 'Фильтры' && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              const filters = cookies.get('filters');
              arrSelect.forEach(item => delete filters[item]);
              setFiltersInCookies(cookies, filters);
              router.push({
                pathname,
                query: router.query,
              }, `${pathname}/${createCleanUrl(cookies).join('/')}`);
            }}
          >
            Очистить все
          </button>
        )}
      </div>
      <div className={styles.sideBarContent}>{children}</div>
      <button
        type="button"
        className={styles.showButton}
        onClick={() => {
          setIsOpenSideBar(false);
          router.push({
            pathname,
            query: router.query,
          }, `${pathname}/${createCleanUrl(cookies).join('/')}`);
        }}
      >
        Показать {productsLength} товара(ов)
      </button>
    </aside>
  );
};

SideBarFilter.propTypes = {
  router: PropTypes.object,
  setIsOpenSideBar: PropTypes.func,
  children: PropTypes.node,
  pathname: PropTypes.string,
  productsLength: PropTypes.number,
  isOpenSideBar: PropTypes.bool,
  title: PropTypes.string,
};

export default SideBarFilter;
