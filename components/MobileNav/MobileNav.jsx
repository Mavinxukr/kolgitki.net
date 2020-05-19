import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './MobileNav.scss';
import { logoutCurrentUser } from '../../redux/actions/currentUser';
import { cookies } from '../../utils/getCookies';
import { setFiltersInCookies } from '../../utils/helpers';
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
        const filters = cookies.get('filters');
        const changeClassNameMobile = cx(styles.linkMobile, {
          [styles.linkMobileActive]:
          item.routeValue && router.route.split('/')[2] === item.routeValue
            || filters && filters.categories && filters.categories[0].id === item.id,
        });

        return (
          <li key={item.id} className={styles.navPanelItemMobile}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setFiltersInCookies(cookies, {
                  categories: [{
                    id: item.id,
                    name: item.name,
                  }],
                  page: 1,
                });
                router.push({
                  pathname: item.routeValue && `/${mainRoute}/${item.routeValue}` || mainRoute,
                  query: router.query,
                });
              }}
              className={changeClassNameMobile}
            >{item.title || item.name}
            </a>
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
