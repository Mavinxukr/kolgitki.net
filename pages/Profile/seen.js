import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileViewed from '../../components/Profile/ProfileViewed/ProfileViewed';

const Seen = () => (
  <NavPanel arrOfNavItems={arrOfNavItems}>
    <ProfileViewed />
  </NavPanel>
);

export default Seen;
