import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import RecoveryWrapper from '../../components/Wrappers/Info/Recovery/Recovery';

const Recovery = () => (
  <NavPanel
    routerValues={['Главная', 'Возврат / Обмен']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <RecoveryWrapper />
  </NavPanel>
);

export default Recovery;
