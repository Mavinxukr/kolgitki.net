import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import AdvantagesWrapper from '../../components/Wrappers/Info/Advantages/Advantages';
import { getAdvantages } from '../../services/Info/advantages';

const Advantages = ({ advantages }) => (
  <NavPanel
    routerValues={['Главная', 'Наши преимущества']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <AdvantagesWrapper advantages={advantages} />
  </NavPanel>
);

Advantages.getInitialProps = async () => {
  const advantages = await getAdvantages({});

  return {
    advantages: advantages.data,
  };
};

export default Advantages;
