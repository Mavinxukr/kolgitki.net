import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItemss } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import DataWrapper from '../../components/Wrappers/ProfileWholesale/Data/Data';
import DataEdit from '../../components/Wrappers/UserDataEdit/UserDataEdit';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false }
);

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <DynamicComponentWithNoSSRNavPanel
      routerValues={[
        {
          id: 1,
          name: 'Главная',
          nameUa: 'Головна',
          pathname: '/'
        },
        {
          id: 2,
          name: 'Личный кабинет (опт)',
          nameUa: 'Особистий кабінет (опт)',
          pathname: 'ProfileWholesale/seen'
        },
        {
          id: 3,
          name: 'Мои данные',
          nameUa: 'Моі дані'
        }
      ]}
      mainRoute="ProfileWholesale"
      arrOfNavItems={arrOfNavItemss}
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
