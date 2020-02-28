import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import CareersWrapper from '../../components/Wrappers/About/Careers/Careers';

const Careers = () => (
  <NavPanel
    routerValues={['Главная', 'Вакансии']}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <CareersWrapper />
  </NavPanel>
);

export default Careers;
