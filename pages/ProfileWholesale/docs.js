import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DocsWrapper from '../../components/Wrappers/ProfileWholesale/Docs/Docs';

const Docs = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет (опт)', 'Документы']}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <DocsWrapper />
  </NavPanel>
);

export default Docs;
