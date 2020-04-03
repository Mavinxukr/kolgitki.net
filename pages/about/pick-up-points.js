import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import PIckUpPointsWrapper from '../../components/Wrappers/About/PIckUpPoints/PIckUpPoints';

const PIckUpPoints = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Точки самовывоза',
    }]}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <PIckUpPointsWrapper />
  </NavPanel>
);

export default PIckUpPoints;
