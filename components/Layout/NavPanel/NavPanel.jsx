import React from 'react';
import Link from 'next/link';
import styles from './NavPanel.scss';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import { useRouter } from 'next/router';
import Global from '../Global/Global';

const router = useRouter();

console.log(router);

const NavPanel = ({ arrOfNavItems, children }) => (
  <Global>
    <div className={styles.content}>
      <BreadCrumbs />
      <div className={styles.navPanel}>
        <nav className={styles.nav}>
          {arrOfNavItems.map(item => (
            <Link href={`/Profile/${item.routeValue}`} key={item.id}>
              <a className={styles.switcher}>
                {item.title}
              </a>
            </Link>
          ))}
          <Link href="/">
            <a className={styles.buttonExit}>
              Выйти
            </a>
          </Link>
        </nav>
        {children}
      </div>
    </div>
  </Global>
);

export default NavPanel;
