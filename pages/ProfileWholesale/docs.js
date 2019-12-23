import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileWholesaleDocs from '../../components/ProfileWholesale/ProfileWholesaleDocs/ProfileWholesaleDocs';

const Docs = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет (опт)', '/ Документы']}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileWholesaleDocs />
  </NavPanel>
);

export default Docs;
