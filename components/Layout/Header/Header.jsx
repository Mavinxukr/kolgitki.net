import React from 'react';
import Link from 'next/link';
import styles from './Header.scss';
import IconLocation from '../../../assets/svg/location.svg';
import IconSearch from '../../../assets/svg/search.svg';
import IconLike from '../../../assets/svg/like.svg';
import IconUser from '../../../assets/svg/user.svg';
import IconCart from '../../../assets/svg/cart.svg';

const Header = () => (
  <header className={styles.header}>
    <img src="/images/logo_cut.png" className={styles.logo} alt="logo" />
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link href="/sale">
            <a className={styles.navLink}>Sale</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/">
            Новинки
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/">
            Женщинам
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/">
            Мужчинам
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/">
            Детям
          </a>
        </li>
      </ul>
    </nav>
    <div className={styles.icons}>
      <a href="/" className={styles.iconLink}>
        <IconLocation className={styles.icon} />
      </a>
      <a href="/" className={styles.iconLink}>
        <IconSearch className={styles.icon} />
      </a>
      <a href="/" className={styles.iconLink}>
        <IconLike className={styles.icon} />
      </a>
      <Link href="/Profile/data">
        <a className={styles.iconLink}>
          <IconUser className={styles.icon} />
        </a>
      </Link>
      <Link href="/cart">
        <a className={styles.iconLink}>
          <IconCart className={styles.icon} />
        </a>
      </Link>
    </div>
  </header>
);

export default Header;
