import React, { useState } from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DataWrapper from '../../components/Wrappers/Profile/Data/Data';
import DataEdit from '../../components/Wrappers/Profile/DataEdit/DataEdit';

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <NavPanel
      routerValues={['Главная', 'Личный кабинет', 'Мои данные']}
      mainRoute="Profile"
      arrOfNavItems={arrOfNavItems}
    >
      {editOpen ? (
        <DataEdit />
      ) : (
        <DataWrapper changeEditValue={setEditOpen} />
      )}
    </NavPanel>
  );
};

export default Data;
