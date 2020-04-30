import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './MobileNav.scss';
import { logoutCurrentUser } from '../../redux/actions/currentUser';
import IconArrow from '../../public/svg/Path10.svg';

const MobileNav = ({
  arrOfNavItems,
  router,
  mainRoute,
  isLogout,
  dispatch,
}) => (
  <>
    <ul className="uk-slider-items uk-grid">
      {arrOfNavItems.map((item) => {
        const changeClassNameMobile = cx(styles.linkMobile, {
          [styles.linkMobileActive]:
          item.routeValue && router.route.split('/')[2] === item.routeValue
            || +router.query.categories === item.id,
        });

        return (
          <li key={item.id} className={styles.navPanelItemMobile}>
            <Link
              href={item.routeValue && `/${mainRoute}/${item.routeValue}` || {
                pathname: mainRoute,
                query: {
                  ...router.query,
                  categories: [item.id],
                  page: 1,
                },
              }}
              prefetch={false}
            >
              <a className={changeClassNameMobile}>{item.title || item.name}</a>
            </Link>
          </li>
        );
      })}
      {isLogout && (
        <li className={styles.navPanelItemMobile}>
          <button
            className={styles.buttonExit}
            type="button"
            onClick={() => {
              dispatch(logoutCurrentUser({}));
              setTimeout(() => router.push('/'), 800);
            }}
          >
            Выйти
          </button>
        </li>
      )}
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
    <button
      type="button"
      uk-slider-item="previous"
      className={styles.arrowLeft}
    >
      <IconArrow />
    </button>
    <button type="button" uk-slider-item="next" className={styles.arrowRight}>
      <IconArrow />
    </button>
  </>
);

MobileNav.propTypes = {
  arrOfNavItems: PropTypes.arrayOf(PropTypes.shape({
    routeValue: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
  })),
  router: PropTypes.object,
  mainRoute: PropTypes.string,
  isLogout: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default MobileNav;
