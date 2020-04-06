import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DocsWrapper from '../../components/Wrappers/ProfileWholesale/Docs/Docs';

const Docs = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет (опт)',
      pathname: '/ProfileWholesale/docs',
    },
    {
      id: 3,
      name: 'Документы',
    }]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <DocsWrapper />
  </NavPanel>
);

export default Docs;
