import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import MailingWrapper from '../../components/Wrappers/Profile/Mailing/Mailing';

const Mailing = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет',
      pathname: '/Profile/mailing',
    },
    {
      id: 3,
      name: 'Рассылки',
    }]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <MailingWrapper />
  </NavPanel>
);

export default Mailing;
