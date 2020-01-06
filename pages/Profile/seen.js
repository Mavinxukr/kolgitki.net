import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileViewed from '../../components/Profile/ProfileViewed/ProfileViewed';

const Seen = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет', '/ Просмотренные']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileViewed />
  </NavPanel>
);

export default Seen;
