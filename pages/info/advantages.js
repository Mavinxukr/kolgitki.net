import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import AdvantagesWrapper from '../../components/Wrappers/Info/Advantages/Advantages';
import { getAdvantages } from '../../services/Info/advantages';

const Advantages = ({ advantages }) => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      nameUa: 'Головна',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Наши преимущества',
      nameUa: 'Наші переваги',
    }]}
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
