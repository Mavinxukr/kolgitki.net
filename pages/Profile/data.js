import React, { useState } from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileData from '../../components/Profile/ProfileData/ProfileData';
import ProfileDataEdit from '../../components/Profile/ProfileDataEdit/ProfileDataEdit';

const Data = () => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <NavPanel arrOfNavItems={arrOfNavItems}>
      {editOpen ? (
        <ProfileDataEdit />
      ) : (
        <ProfileData changeEditValue={setEditOpen} />
      )}
    </NavPanel>
  );
};

export default Data;
