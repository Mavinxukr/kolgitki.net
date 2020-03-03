import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import PIckUpPointsWrapper from '../../components/Wrappers/About/PIckUpPoints/PIckUpPoints';

const PIckUpPoints = () => (
  <NavPanel
    routerValues={['Главная', 'Точки самовывоза']}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <PIckUpPointsWrapper />
  </NavPanel>
);

export default PIckUpPoints;
