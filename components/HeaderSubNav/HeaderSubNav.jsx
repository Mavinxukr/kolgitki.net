import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './HeaderSubNav.scss';

const HeaderSubNav = ({ subNav, classNameWrapper }) => (
  <>
    {subNav && (
      <div className={cx(styles.menu, classNameWrapper)}>
        <ul className={styles.mainProductsList}>
          {subNav.subcategory.map(item => (
            <li className={styles.mainProductsItem} key={item.id}>
              <a className={styles.mainProductsLink} href="/">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

HeaderSubNav.propTypes = {
  subNav: PropTypes.shape({
    subcategory: PropTypes.arrayOf(PropTypes.object),
  }),
  classNameWrapper: PropTypes.string,
};

export default HeaderSubNav;
