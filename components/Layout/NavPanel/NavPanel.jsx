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
import IconArrow from '../../../public/svg/Path10.svg';

const NavPanel = ({
  arrOfNavItems,
  routerValues,
  children,
  mainRoute,
  isLogout,
  isMobileScreen,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Global>
      <div className={styles.content}>
        {!isMobileScreen && (
          <>
            <BreadCrumbs items={routerValues} />
            <div className={styles.navPanel}>
              <nav className={styles.nav}>
                {arrOfNavItems.map((item) => {
                  const changeClassName = cx(styles.switcher, {
                    [styles.active]: router.route.split('/')[2] === item.routeValue,
                  });

                  return (
                    <Link
                      href={`/${mainRoute}/${item.routeValue}`}
                      key={item.id}
                      prefetch={false}
                    >
                      <a className={changeClassName}>
                        <span className={styles.text}>{item.title}</span>
                      </a>
                    </Link>
                  );
                })}
                {isLogout && (
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
                )}
              </nav>
              <div className={styles.contentChild}>{children}</div>
            </div>
          </>
        ) || (
          <>
            <div
              className={styles.navPanelMobile}
              uk-slider="autoplay:false;finite:true;"
            >
              <ul className="uk-slider-items uk-grid">
                {arrOfNavItems.map((item) => {
                  const changeClassNameMobile = cx(styles.linkMobile, {
                    [styles.linkMobileActive]: router.route.split('/')[2] === item.routeValue,
                  });

                  return (
                    <li key={item.id} className={styles.navPanelItemMobile}>
                      <Link
                        href={`/${mainRoute}/${item.routeValue}`}
                        prefetch={false}
                      >
                        <a className={changeClassNameMobile}>{item.title}</a>
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
                <li />
                <li />
              </ul>
              <button type="button" uk-slider-item="previous" className={styles.arrowLeft}>
                <IconArrow />
              </button>
              <button type="button" uk-slider-item="next" className={styles.arrowRight}>
                <IconArrow />
              </button>
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
  isMobileScreen: PropTypes.bool,
};

export default withResponse(NavPanel);
