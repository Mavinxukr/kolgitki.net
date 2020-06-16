import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import DocsDownloadWrapper from '../../components/Wrappers/ProfileWholesale/DownloadDocs/DownloadDocs';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false },
);

const LoadDocs = () => (
  <DynamicComponentWithNoSSRNavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      nameUa: 'Головна',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет (опт)',
      nameUa: 'Особистий кабінет (опт)',
      pathname: '/ProfileWholesale/load-docs',
    },
    {
      id: 3,
      name: 'Скачать документы',
      nameUa: 'Завантажити документи',
    }]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <DocsDownloadWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default LoadDocs;
