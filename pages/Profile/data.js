import React, { useState } from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DataWrapper from '../../components/Wrappers/UserData/UserData';
import DataEdit from '../../components/Wrappers/UserDataEdit/UserDataEdit';

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <NavPanel
      routerValues={[{
        id: 1,
        name: 'Главная',
        pathname: '/',
      },
      {
        id: 2,
        name: 'Личный кабинет',
        pathname: '/Profile/data',
      },
      {
        id: 3,
        name: 'Мои данные',
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
    </NavPanel>
  );
};

export default Data;
