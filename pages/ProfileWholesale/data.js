import React, { useState } from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DataWrapper from '../../components/Wrappers/ProfileWholesale/Data/Data';
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
        name: 'Личный кабинет (опт)',
        pathname: '/ProfileWholesale/seen',
      },
      {
        id: 3,
        name: 'Мои данные',
      }]}
      mainRoute="ProfileWholesale"
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
