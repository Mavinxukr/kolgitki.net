import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DocsDownloadWrapper from '../../components/Wrappers/ProfileWholesale/DownloadDocs/DownloadDocs';

const LoadDocs = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет (опт)', '/ Скачать документы']}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <DocsDownloadWrapper />
  </NavPanel>
);

export default LoadDocs;
