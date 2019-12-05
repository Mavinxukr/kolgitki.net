import React, { useState } from 'react';
import Styles from './ProfileWholesaleNav.module.scss';
import ProfileWholesaleBreadCrumbs from '../ProfileWholesaleBreadCrumbs/ProfileWholesaleBreadCrumbs';
import ProfileWholesaleData from '../ProfileWholesaleData/ProfileWholesaleData';
import ProfileWholesaleDataEdit from '../ProfileWholesaleDataEdit/ProfileWholesaleDataEdit';
import ProfileWholesaleDocs from '../ProfileWholesaleDocs/ProfileWholesaleDocs';
import ProfileWholesaleDocsLoad from '../ProfileWholesaleDocsLoad/ProfileWholesaleDocsLoad';
import ProfileWholesaleOrders from '../ProfileWholesaleOrders/ProfileWholesaleOrders';
import './ProfileWholesaleNav.scss';

const ProfileWholesaleNav = () => {
  const [valueForCrumb, setValueForCrumb] = useState('Мои данные');
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <ProfileWholesaleBreadCrumbs valueForCrumb={valueForCrumb} />
      <div className={Styles.ProfileWholesaleNav__Content}>
        <input type="radio" className={Styles.ProfileWholesaleNav__Field} name="switcher" id="order" />
        <input type="radio" className={Styles.ProfileWholesaleNav__Field} name="switcher" id="doc" />
        <input type="radio" className={Styles.ProfileWholesaleNav__Field} name="switcher" id="download" />
        <input defaultChecked type="radio" className={Styles.ProfileWholesaleNav__Field} name="switcher" id="data" />
        <nav className={Styles.ProfileWholesaleNav__Nav}>
          <label onClick={e => setValueForCrumb(e.target.textContent)} className={Styles.ProfileWholesaleNav__Switcher} htmlFor="order">Заказы</label>
          <label onClick={e => setValueForCrumb(e.target.textContent)} className={Styles.ProfileWholesaleNav__Switcher} htmlFor="doc">Документы</label>
          <label onClick={e => setValueForCrumb(e.target.textContent)} className={Styles.ProfileWholesaleNav__Switcher} htmlFor="download">Скачать документы</label>
          <label onClick={e => setValueForCrumb(e.target.textContent)} className={Styles.ProfileWholesaleNav__Switcher} htmlFor="data">Мои данные</label>
          <a href="/" className={Styles.ProfileWholesaleNav__ButtonExit}>Выйти</a>
        </nav>
        <div id="order" className={Styles.ProfileWholesaleNav__Item}>
          <ProfileWholesaleOrders />
        </div>
        <div id="doc" className={Styles.ProfileWholesaleNav__Item}>
          <ProfileWholesaleDocs />
        </div>
        <div id="download" className={Styles.ProfileWholesaleNav__Item}>
          <ProfileWholesaleDocsLoad />
        </div>
        <div id="data" className={Styles.ProfileWholesaleNav__Item}>
          {
            openEdit ? <ProfileWholesaleDataEdit /> : <ProfileWholesaleData changeEditValue={setOpenEdit} />
          }
        </div>
      </div>
    </>
  );
};

export default ProfileWholesaleNav;
