import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DocsDownloadWrapper from '../../components/Wrappers/ProfileWholesale/DownloadDocs/DownloadDocs';

const LoadDocs = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет (опт)',
      pathname: '/ProfileWholesale/load-docs',
    },
    {
      id: 3,
      name: 'Скачать документы',
    }]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <DocsDownloadWrapper />
  </NavPanel>
);

export default LoadDocs;
