import React from 'react';
import Styles from './Header.module.scss';
import IconLocation from '../../../assets/svg/location.svg';
import IconSearch from '../../../assets/svg/search.svg';
import IconLike from '../../../assets/svg/like.svg';
import IconUser from '../../../assets/svg/user.svg';
import IconCart from '../../../assets/svg/cart.svg';

const Header = () => (
  <header className={Styles.Header}>
    <img src="/images/logo_cut.png" className={Styles.Header__Logo} alt="logo" />
    <nav className={Styles.Header__Nav}>
      <ul className={Styles.Header__NavItems}>
        <li className={Styles.Header__NavItem}>
          <a className={Styles.Header__NavLink} href="/">Sale</a>
        </li>
        <li className={Styles.Header__NavItem}>
          <a className={Styles.Header__NavLink} href="/">Новинки</a>
        </li>
        <li className={Styles.Header__NavItem}>
          <a className={Styles.Header__NavLink} href="/">Женщинам</a>
        </li>
        <li className={Styles.Header__NavItem}>
          <a className={Styles.Header__NavLink} href="/">Мужчинам</a>
        </li>
        <li className={Styles.Header__NavItem}>
          <a className={Styles.Header__NavLink} href="/">Детям</a>
        </li>
      </ul>
    </nav>
    <div className={Styles.Header__Icons}>
      <a href="/" className={Styles.Header__IconLink}>
        <IconLocation className={Styles.Header__Icon} />
      </a>
      <a href="/" className={Styles.Header__IconLink}>
        <IconSearch className={Styles.Header__Icon} />
      </a>
      <a href="/" className={Styles.Header__IconLink}>
        <IconLike className={Styles.Header__Icon} />
      </a>
      <a href="/" className={Styles.Header__IconLink}>
        <IconUser className={Styles.Header__Icon} />
      </a>
      <a href="/" className={Styles.Header__IconLink}>
        <IconCart className={Styles.Header__Icon} />
      </a>
    </div>
  </header>
);

export default Header;
