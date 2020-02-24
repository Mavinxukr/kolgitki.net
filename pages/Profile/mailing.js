import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import MailingWrapper from '../../components/Wrappers/Profile/Mailing/Mailing';

const Mailing = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет', 'Рассылки']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <MailingWrapper />
  </NavPanel>
);

export default Mailing;
