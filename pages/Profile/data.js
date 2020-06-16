import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import DataWrapper from '../../components/Wrappers/UserData/UserData';
import DataEdit from '../../components/Wrappers/UserDataEdit/UserDataEdit';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false },
);

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <DynamicComponentWithNoSSRNavPanel
      routerValues={[{
        id: 1,
        name: 'Главная',
        nameUa: 'Головна',
        pathname: '/',
      },
      {
        id: 2,
        name: 'Личный кабинет',
        nameUa: 'Особистий кабінет',
        pathname: '/Profile/data',
      },
      {
        id: 3,
        name: 'Мои данные',
        nameUa: 'Мої дані',
      }]}
      mainRoute="Profile"
      arrOfNavItems={arrOfNavItems}
      isLogout
    >
      {editOpen ? (
        <DataEdit changeEditValue={setEditOpen} />
      ) : (
        <DataWrapper changeEditValue={setEditOpen} />
      )}
    </DynamicComponentWithNoSSRNavPanel>
  );
};

export default Data;
