import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { useRouter } from 'next/router';
import styles from './NavPanel.scss';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Global from '../Global/Global';
import { logoutCurrentUser } from '../../../redux/actions/currentUser';
import { withResponse } from '../../hoc/withResponse';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import MobileNav from '../../MobileNav/MobileNav';

const NavPanel = ({
  arrOfNavItems,
  routerValues,
  children,
  mainRoute,
  isLogout,
  isDesktopScreen,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Global>
      <div className={styles.content}>
        {isDesktopScreen ? (
          <>
            <BreadCrumbs items={routerValues} />
            <div className={styles.navPanel}>
              <nav className={styles.nav}>
                {arrOfNavItems.map((item) => {
                  const changeClassName = cx(styles.switcher, {
                    [styles.active]:
                      router.route.split('/')[2] === item.routeValue,
                  });

                  return (
                    <Link
                      href={`/${mainRoute}/${item.routeValue}`}
                      key={item.id}
                      prefetch={false}
                    >
                      <a className={changeClassName}>
                        <span className={styles.text}>
                          {parseText(cookies, item.title, item.titleUa)}
                        </span>
                      </a>
                    </Link>
                  );
                })}
                {isLogout && (
                  <button
                    className={styles.buttonExit}
                    type="button"
                    onClick={() => dispatch(logoutCurrentUser({}, cookies))}
                  >
                    {parseText(cookies, 'Выйти', 'Вийти')}
                  </button>
                )}
              </nav>
              <div className={styles.contentChild}>{children}</div>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.navPanelMobile}
              uk-slider="autoplay:false;finite:true;"
            >
              <MobileNav
                isLogout={isLogout}
                dispatch={dispatch}
                router={router}
                arrOfNavItems={arrOfNavItems}
                mainRoute={mainRoute}
              />
            </div>
            <div className={styles.contentChildMobile}>{children}</div>
          </>
        )}
      </div>
    </Global>
  );
};

NavPanel.propTypes = {
  arrOfNavItems: PropTypes.arrayOf(PropTypes.object),
  routerValues: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  mainRoute: PropTypes.string,
  isLogout: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(NavPanel);
