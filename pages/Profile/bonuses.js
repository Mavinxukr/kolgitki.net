import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileBonuses from '../../components/Profile/ProfileBonuses/ProfileBonuses';

const Bonuses = () => (
  <NavPanel arrOfNavItems={arrOfNavItems}>
    <ProfileBonuses />
  </NavPanel>
);

export default Bonuses;
