import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import ProfileBreadCrumbs from '../ProfileBreadCrumbs/ProfileBreadCrumbs';
import ProfileOrder from '../ProfileOrder/ProfileOrder';
import ProfileFavourite from '../ProfileFavourite/ProfileFavourite';
import BonusComponent from '../BonusComponent/BonusComponent';
import ProfileViewed from '../ProfileViewed/ProfileViewed';
import ProfileMailing from '../ProfileMailing/ProfileMailing';
import ProfileDataEdit from '../ProfileDataEdit/ProfileDataEdit';
import ProfileData from '../ProfileData/ProfileData';
import Styles from './MainProfillePageComponent.module.scss';
import './MainProfilePageComponent.scss';

const MainProfillePageComponent = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [valueForCrumb, setValueForCrumb] = useState('Мои данные');

  const onSetCrumb = e => setValueForCrumb(e.target.textContent);

  return (
    <MainLayout>
      <div className={Styles.MainProfillePageComponent__Content}>
        <ProfileBreadCrumbs valueForCrumb={valueForCrumb} />
        <div className={Styles.MainProfillePageComponent__NavPanel}>
          <input type="radio" className={Styles.MainProfillePageComponent__Field} name="switcher" id="order" />
          <input type="radio" className={Styles.MainProfillePageComponent__Field} name="switcher" id="favorites" />
          <input type="radio" className={Styles.MainProfillePageComponent__Field} name="switcher" id="bonus" />
          <input type="radio" className={Styles.MainProfillePageComponent__Field} name="switcher" id="seen" />
          <input type="radio" className={Styles.MainProfillePageComponent__Field} name="switcher" id="links" />
          <input defaultChecked type="radio" className={Styles.MainProfillePageComponent__Field} name="switcher" id="data" />
          <nav className={Styles.MainProfillePageComponent__Nav}>
            <label onClick={onSetCrumb} className={Styles.MainProfillePageComponent__Switcher} htmlFor="order">Заказы</label>
            <label onClick={onSetCrumb} className={Styles.MainProfillePageComponent__Switcher} htmlFor="favorites">Избранные</label>
            <label onClick={onSetCrumb} className={Styles.MainProfillePageComponent__Switcher} htmlFor="bonus">Бонусы</label>
            <label onClick={onSetCrumb} className={Styles.MainProfillePageComponent__Switcher} htmlFor="seen">Просмотренные</label>
            <label onClick={onSetCrumb} className={Styles.MainProfillePageComponent__Switcher} htmlFor="links">Рассылки</label>
            <label onClick={onSetCrumb} className={Styles.MainProfillePageComponent__Switcher} htmlFor="data">Мои данные</label>
            <Link href="/">
              <a className={Styles.MainProfillePageComponent__ButtonExit}>Выйти</a>
            </Link>
          </nav>
          <div id="order" className={Styles.MainProfillePageComponent__Item}>
            <ProfileOrder />
          </div>
          <div id="favorites" className={Styles.MainProfillePageComponent__Item}>
            <ProfileFavourite />
          </div>
          <div id="bonus" className={Styles.MainProfillePageComponent__Item}>
            <BonusComponent />
          </div>
          <div id="seen" className={Styles.MainProfillePageComponent__Item}>
            <ProfileViewed />
          </div>
          <div id="links" className={Styles.MainProfillePageComponent__Item}>
            <ProfileMailing />
          </div>
          <div id="data" className={Styles.MainProfillePageComponent__Item}>
            {
              openEdit ? <ProfileDataEdit /> : <ProfileData changeEditValue={setOpenEdit} />
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainProfillePageComponent;
