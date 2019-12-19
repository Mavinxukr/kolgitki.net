import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileWholesaleDocsLoad from '../../components/ProfileWholesale/ProfileWholesaleDocsLoad/ProfileWholesaleDocsLoad';

const LoadDocs = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет (опт)', '/ Скачать документы']}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileWholesaleDocsLoad />
  </NavPanel>
);

export default LoadDocs;
