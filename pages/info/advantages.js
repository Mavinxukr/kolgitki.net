import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import AdvantagesWrapper from '../../components/Wrappers/Info/Advantages/Advantages';

const Advantages = () => (
  <NavPanel
    routerValues={['Главная', 'Наши преимущества']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <AdvantagesWrapper />
  </NavPanel>
);

export default Advantages;
