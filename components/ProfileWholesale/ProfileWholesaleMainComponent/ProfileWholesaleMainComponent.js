import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import ProfileWholesaleBreadCrumbs from '../ProfileWholesaleBreadCrumbs/ProfileWholesaleBreadCrumbs';
import ProfileWholesaleOrders from '../ProfileWholesaleOrders/ProfileWholesaleOrders';
import ProfileWholesaleDocs from '../ProfileWholesaleDocs/ProfileWholesaleDocs';
import ProfileWholesaleDocsLoad from '../ProfileWholesaleDocsLoad/ProfileWholesaleDocsLoad';
import ProfileWholesaleDataEdit from '../ProfileWholesaleDataEdit/ProfileWholesaleDataEdit';
import ProfileWholesaleData from '../ProfileWholesaleData/ProfileWholesaleData';
import Styles from './ProfileWholesaleMainComponent.module.scss';
import './ProfileWholesaleMainComponent.scss';

const arrIdName = [
  {
    id: 1,
    name: 'orders',
    label: 'Заказы',
  },
  {
    id: 2,
    name: 'docs',
    label: 'Документы',
  },
  {
    id: 3,
    name: 'docsLoad',
    label: 'Скачать документы',
  },
  {
    id: 4,
    name: 'data',
    label: 'Мои данные',
  },
];

const ProfileWholesaleMainComponent = () => {
  const [valueForCrumb, setValueForCrumb] = useState('Мои данные');
  const [openEdit, setOpenEdit] = useState(false);

  const router = useRouter();

  const onSetCrumb = e => setValueForCrumb(e.target.textContent);

  return (
    <MainLayout>
      <div className={Styles.ProfileWholesaleMainComponent__Content}>
        <ProfileWholesaleBreadCrumbs valueForCrumb={valueForCrumb} />
        <div className={Styles.ProfileWholesaleMainComponent__NavPanel}>
          {
            arrIdName.map((item) => {
              if (item.name === router.query.id) {
                return <input defaultChecked key={item.id} type="radio" className={Styles.ProfileWholesaleMainComponent__Field} name="switcher" id={item.name} />;
              }
              return <input defaultChecked={false} key={item.id} type="radio" className={Styles.ProfileWholesaleMainComponent__Field} name="switcher" id={item.name} />;
            })
          }
          <nav className={Styles.ProfileWholesaleMainComponent__Nav}>
            {
              arrIdName.map(item => <label key={item.id} onClick={onSetCrumb} className={Styles.ProfileWholesaleMainComponent__Switcher} htmlFor={item.name}>{item.label}</label>)
            }
            <a href="/" className={Styles.ProfileWholesaleMainComponent__ButtonExit}>Выйти</a>
          </nav>
          <div id="orders" className={Styles.ProfileWholesaleMainComponent__Item}>
            <ProfileWholesaleOrders />
          </div>
          <div id="docs" className={Styles.ProfileWholesaleMainComponent__Item}>
            <ProfileWholesaleDocs />
          </div>
          <div id="docsLoad" className={Styles.ProfileWholesaleMainComponent__Item}>
            <ProfileWholesaleDocsLoad />
          </div>
          <div id="data" className={Styles.ProfileWholesaleMainComponent__Item}>
            {
              openEdit ? <ProfileWholesaleDataEdit /> : <ProfileWholesaleData changeEditValue={setOpenEdit} />
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileWholesaleMainComponent;
