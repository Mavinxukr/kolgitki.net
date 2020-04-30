import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import MailingWrapper from '../../components/Wrappers/Profile/Mailing/Mailing';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false },
);

const Mailing = () => (
  <DynamicComponentWithNoSSRNavPanel
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
    isLogout
  >
    <MailingWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default Mailing;
