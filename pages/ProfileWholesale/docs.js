import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItemss } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import DocsWrapper from '../../components/Wrappers/ProfileWholesale/Docs/Docs';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false }
);

const Docs = () => (
  <DynamicComponentWithNoSSRNavPanel
    routerValues={[
      {
        id: 1,
        name: 'Главная',
        nameUa: 'Головна',
        pathname: '/'
      },
      {
        id: 2,
        name: 'Личный кабинет (опт)',
        nameUa: 'Особистий кабінет (опт)',
        pathname: 'ProfileWholesale/docs'
      },
      {
        id: 3,
        name: 'Документы',
        nameUa: 'Документи'
      }
    ]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItemss}
    isLogout
  >
    <DocsWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default Docs;
