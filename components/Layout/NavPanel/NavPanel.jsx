import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import styles from './NavPanel.scss';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Global from '../Global/Global';

const NavPanel = ({ arrOfNavItems, children }) => {
  const router = useRouter();

  const changeClassName = item => cx(styles.switcher, {
    [styles.active]: router.route.split('/')[2] === item.routeValue,
  });

  return (
    <Global>
      <div className={styles.content}>
        <BreadCrumbs />
        <div className={styles.navPanel}>
          <nav className={styles.nav}>
            {arrOfNavItems.map(item => (
              <Link href={`/Profile/${item.routeValue}`} key={item.id}>
                <a className={changeClassName(item)}>{item.title}</a>
              </Link>
            ))}
            <Link href="/">
              <a className={styles.buttonExit}>Выйти</a>
            </Link>
          </nav>
          <div className={styles.contentChild}>
            {children}
          </div>
        </div>
      </div>
    </Global>
  );
};

export default NavPanel;
