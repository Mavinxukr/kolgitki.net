import React, { useState } from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DataWrapper from '../../components/Wrappers/UserData/UserData';
import DataEdit from '../../components/Wrappers/UserDataEdit/UserDataEdit';

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <NavPanel
      routerValues={['Главная', 'Личный кабинет', 'Мои данные']}
      mainRoute="Profile"
      arrOfNavItems={arrOfNavItems}
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
