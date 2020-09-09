import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './MobileNav.scss';
import { logoutCurrentUser } from '../../redux/actions/currentUser';
import { cookies } from '../../utils/getCookies';
import { setFiltersInCookies, parseText } from '../../utils/helpers';
import IconArrow from '../../public/svg/Path10.svg';

const MobileNav = ({
  arrOfNavItems,
  router,
  mainRoute,
  isLogout,
  dispatch,
}) => {
  console.log(arrOfNavItems);

  return (
    <>
      <ul className="uk-slider-items uk-grid">
        {arrOfNavItems.map((item, index) => {
          const filters = cookies.get('filters');
          const changeClassNameMobile = cx(styles.linkMobile, {
            [styles.linkMobileActive]:
              (filters
                && !item.routeValue
                && filters.categories
                && filters.categories[0].id === item.id)
              || (!item.routeValue && index === 0)
              || (item.routeValue
                && router.route.split('/')[2] === item.routeValue),
          });

          return (
            <li key={item.id} className={styles.navPanelItemMobile}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.slug) {
                    setFiltersInCookies(cookies, {
                      categories: [
                        {
                          id: item.id,
                          name: item.slug,
                          categoryName: parseText(
                            cookies,
                            item.name,
                            item.name_ua,
                          ),
                        },
                      ],
                      page: 1,
                    });
                  }
                  if (item.routeValue === 'Blog') {
                    router.push({
                      pathname: `/${item.routeValue}`,
                      query: router.query,
                    });
                  } else {
                    router.push({
                      pathname:
                        (item.routeValue
                          && `/${mainRoute}/${item.routeValue}`)
                        || mainRoute,
                      query: router.query,
                    });
                  }
                }}
                className={changeClassNameMobile}
              >
                {parseText(
                  cookies,
                  item.title || item.name,
                  item.titleUa || item.name_ua,
                )}
              </a>
            </li>
          );
        })}
        {isLogout && (
          <li className={styles.navPanelItemMobile}>
            <button
              className={styles.buttonExit}
              type="button"
              onClick={() => dispatch(logoutCurrentUser({}, cookies))}
            >
              {parseText(cookies, 'Выйти', 'Вийти')}
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
};

MobileNav.propTypes = {
  arrOfNavItems: PropTypes.arrayOf(
    PropTypes.shape({
      routeValue: PropTypes.string,
      title: PropTypes.string,
      titleUa: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      name_ua: PropTypes.string,
    }),
  ),
  router: PropTypes.object,
  mainRoute: PropTypes.string,
  isLogout: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default MobileNav;
