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
    document.querySelector('body').style.position = 'relative';
    document.querySelector('body').style.height = '100%';
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('html').style.position = 'relative';
    document.querySelector('html').style.height = '100%';
  } else {
    document.querySelector('body').style.overflow = 'initial';
    document.querySelector('html').style.overflow = 'initial';
  }

  return (
    <aside className={classNameForSideBar}>
      {isOpenSideBar && (<div className={styles.bg} />)}
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
              router.push(
                {
                  pathname,
                  query: router.query,
                },
                `${pathname}/${createCleanUrl(cookies).join('/')}`,
              );
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
          router.push(
            {
              pathname,
              query: router.query,
            },
            `${pathname}/${createCleanUrl(cookies).join('/')}`,
          );
        }}
      >
        Показать
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
