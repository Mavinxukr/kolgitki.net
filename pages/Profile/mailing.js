import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileMailing from '../../components/Profile/ProfileMailing/ProfileMailing';

const Mailing = () => (
  <NavPanel arrOfNavItems={arrOfNavItems}>
    <ProfileMailing />
  </NavPanel>
);

export default Mailing;
