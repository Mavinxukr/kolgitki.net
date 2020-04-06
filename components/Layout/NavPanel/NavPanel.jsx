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

const NavPanel = ({
  arrOfNavItems, routerValues, children, mainRoute, isLogout,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const changeClassName = item => cx(styles.switcher, {
    [styles.active]: router.route.split('/')[2] === item.routeValue,
  });

  return (
    <Global>
      <div className={styles.content}>
        <BreadCrumbs items={routerValues} />
        <div className={styles.navPanel}>
          <nav className={styles.nav}>
            {arrOfNavItems.map(item => (
              <Link href={`/${mainRoute}/${item.routeValue}`} key={item.id}>
                <a className={changeClassName(item)}>
                  <span className={styles.text}>{item.title}</span>
                </a>
              </Link>
            ))}
            {isLogout && (
              <button
                className={styles.buttonExit}
                type="button"
                onClick={() => {
                  dispatch(logoutCurrentUser({}));
                  setTimeout(() => router.push('/'), 800);
                }}
              >Выйти
              </button>
            )}
          </nav>
          <div className={styles.contentChild}>{children}</div>
        </div>
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
};

export default NavPanel;
