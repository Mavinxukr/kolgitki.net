import React from 'react';
import Styles from './ProfileNav.module.scss';

const ProfileNav = () => (
  <nav className={Styles.ProfileNav}>
    <button className={Styles.ProfileNav__Switcher} type="button">Заказы</button>
    <button className={Styles.ProfileNav__Switcher} type="button">Избранные</button>
    <button className={Styles.ProfileNav__Switcher} type="button">Бонусы</button>
    <button className={Styles.ProfileNav__Switcher} type="button">Просмотренные</button>
    <button className={Styles.ProfileNav__Switcher} type="button">Рассылки</button>
    <button className={Styles.ProfileNav__Switcher} type="button">Мои данные</button>
    <button className={Styles.ProfileNav__ButtonExit} type="button">Выйти</button>
  </nav>
);

export default ProfileNav;
