import React, { useState } from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileWholesaleData from '../../components/ProfileWholesale/ProfileWholesaleData/ProfileWholesaleData';
import ProfileWholesaleDataEdit from '../../components/ProfileWholesale/ProfileWholesaleDataEdit/ProfileWholesaleDataEdit';

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <NavPanel
      routerValues={['Главная', 'Личный кабинет (опт)', 'Мои данные']}
      mainRoute="ProfileWholesale"
      arrOfNavItems={arrOfNavItems}
    >
      {editOpen ? (
        <ProfileWholesaleDataEdit />
      ) : (
        <ProfileWholesaleData changeEditValue={setEditOpen} />
      )}
    </NavPanel>
  );
};

export default Data;
