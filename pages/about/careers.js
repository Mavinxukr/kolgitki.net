import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import CareersWrapper from '../../components/Wrappers/About/Careers/Careers';
import { getVacancies } from '../../services/About/careers';

const Careers = ({ vacancies }) => (
  <NavPanel
    routerValues={['Главная', 'Вакансии']}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <CareersWrapper vacancies={vacancies} />
  </NavPanel>
);

Careers.getInitialProps = async () => {
  const vacancies = await getVacancies({});

  return {
    vacancies: vacancies.data,
  };
};

export default Careers;
