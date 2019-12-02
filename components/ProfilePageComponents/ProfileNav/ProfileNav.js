import React, { useState } from 'react';
import ProfileBreadCrumbs from '../ProfileBreadCrumbs/ProfileBreadCrumbs';
import BonusComponent from '../BonusComponent/BonusComponent';
import ProfileViewed from '../ProfileViewed/ProfileViewed';
import ProfileMailing from '../ProfileMailing/ProfileMailing';
import ProfileOrder from '../ProfileOrder/ProfileOrder';
import ProfileData from '../ProfileData/ProfileData';
import ProfileDataEdit from '../ProfileDataEdit/ProfileDataEdit';
import Styles from './ProfileNav.module.scss';
import './ProfileNav.scss';

const ProfileNav = () => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <ProfileBreadCrumbs />
      <div className={Styles.ProfileNav__Content}>
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="order" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="favorites" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="bonus" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="seen" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="links" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="data" />
        <nav className={Styles.ProfileNav__Nav}>
          <label className={Styles.ProfileNav__Switcher} htmlFor="order" type="button">Заказы</label>
          <label className={Styles.ProfileNav__Switcher} htmlFor="favorites" type="button">Избранные</label>
          <label className={Styles.ProfileNav__Switcher} htmlFor="bonus" type="button">Бонусы</label>
          <label className={Styles.ProfileNav__Switcher} htmlFor="seen" type="button">Просмотренные</label>
          <label className={Styles.ProfileNav__Switcher} htmlFor="links" type="button">Рассылки</label>
          <label className={Styles.ProfileNav__Switcher} htmlFor="data" type="button">Мои данные</label>
          <button className={Styles.ProfileNav__ButtonExit} type="button">Выйти</button>
        </nav>
        <div id="order" className={Styles.ProfileNav__Item}>
          <ProfileOrder />
        </div>
        <div id="favorites" className={Styles.ProfileNav__Item}>
          <p>1</p>
        </div>
        <div id="bonus" className={Styles.ProfileNav__Item}>
          <BonusComponent />
        </div>
        <div id="seen" className={Styles.ProfileNav__Item}>
          <ProfileViewed />
        </div>
        <div id="links" className={Styles.ProfileNav__Item}>
          <ProfileMailing />
        </div>
        <div id="data" className={Styles.ProfileNav__Item}>
          {
            openEdit ? <ProfileDataEdit /> : <ProfileData changeEditValue={setOpenEdit} />
          }
        </div>
      </div>
    </>
  );
};

export default ProfileNav;
