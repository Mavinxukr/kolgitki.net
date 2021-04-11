import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './MobileSideBar.scss';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import IconExit from '../../public/svg/Group631.svg';

const MobileSideBar = ({
  setIsOpenSideBar,
  getProductHandle,
  clearFilter,
  children,
  isOpenSideBar,
  title
}) => {
  const classNameForSideBar = cx(styles.sideBar, {
    [styles.openSideBar]: isOpenSideBar
  });

  // if (isOpenSideBar) {
  //   document.querySelector('body').style.overflow = 'hidden';
  //   document.querySelector('body').style.position = 'relative';
  //   document.querySelector('body').style.height = '100%';
  //   document.querySelector('html').style.overflow = 'hidden';
  //   document.querySelector('html').style.position = 'relative';
  //   document.querySelector('html').style.height = '100%';
  // } else {
  //   document.querySelector('body').style.overflow = 'initial';
  //   document.querySelector('html').style.overflow = 'initial';
  // }

  return (
    <aside className={classNameForSideBar}>
      {isOpenSideBar && <div className={styles.bg} />}
      <div className={styles.sideBarHeader}>
        <button
          className={styles.buttonExit}
          type="button"
          onClick={() => setIsOpenSideBar(false)}
        >
          <IconExit className={styles.iconExit} />
        </button>
        <p className={styles.filterTitle}>{title}</p>
        {title === parseText(cookies, 'Фильтры', 'Фільтри') && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              // setIsOpenSideBar(false);
              clearFilter();
            }}
          >
            {parseText(cookies, 'Очистить все', 'Очистити всі')}
          </button>
        )}
      </div>
      <div className={styles.sideBarContent}>{children}</div>
      {title === parseText(cookies, 'Фильтры', 'Фільтри') && (
        <button
          type="button"
          className={styles.showButton}
          onClick={() => {
            setIsOpenSideBar(false);
            getProductHandle();
          }}
        >
          Показать
        </button>
      )}
    </aside>
  );
};

MobileSideBar.propTypes = {
  router: PropTypes.object,
  setIsOpenSideBar: PropTypes.func,
  children: PropTypes.node,
  pathname: PropTypes.string,
  productsLength: PropTypes.number,
  isOpenSideBar: PropTypes.bool,
  title: PropTypes.string
};

export default MobileSideBar;
