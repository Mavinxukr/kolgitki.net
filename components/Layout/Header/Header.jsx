import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { isAuthSelector, userDataSelector } from '../../../utils/selectors';
import styles from './Header.scss';
import IconLocation from '../../../public/svg/location.svg';
import IconSearch from '../../../public/svg/search.svg';
import IconLike from '../../../public/svg/like.svg';
import IconUser from '../../../public/svg/user.svg';
import IconCart from '../../../public/svg/cart.svg';

const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  return (
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
        <Link
          href={
            (isAuth && userData.role.id === 3 && '/ProfileWholesale/data')
            || (isAuth && userData.role.id === 2 && '/Profile/data')
            || '/login'
          }
        >
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
};

export default Header;
