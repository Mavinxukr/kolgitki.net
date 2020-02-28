import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import TermsOfUseWrapper from '../../components/Wrappers/Info/TermsOfUse/TermsOfUse';

const TermsOfUse = () => (
  <NavPanel
    routerValues={['Главная', 'Пользовательское соглашение']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <TermsOfUseWrapper />
  </NavPanel>
);

export default TermsOfUse;
