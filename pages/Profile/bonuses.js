import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileBonuses from '../../components/Profile/ProfileBonuses/ProfileBonuses';

const Bonuses = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет', '/ Бонусы']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileBonuses />
  </NavPanel>
);

export default Bonuses;
