import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import AboutWrapper from '../../components/Wrappers/About/About/About';

const About = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет', 'Бонусы']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <AboutWrapper />
  </NavPanel>
);

export default About;
