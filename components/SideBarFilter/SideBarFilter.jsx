import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './SideBarFilter.scss';
import IconExit from '../../public/svg/Group631.svg';

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
              delete router.query.colors;
              delete router.query.sizes;
              delete router.query.brands;
              delete router.query.attribute;
              delete router.query.tags;
              router.push({
                pathname,
                query: {
                  ...router.query,
                },
              });
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
        onClick={() => setIsOpenSideBar(false)}
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
