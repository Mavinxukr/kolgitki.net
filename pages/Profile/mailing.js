import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileMailing from '../../components/Profile/ProfileMailing/ProfileMailing';

const Mailing = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет', '/ Рассылки']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileMailing />
  </NavPanel>
);

export default Mailing;
