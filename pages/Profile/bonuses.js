import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import BonusesWrapper from '../../components/Wrappers/Profile/Bonuses/Bonuses';
import { getBonuses } from '../../redux/actions/bonuses';

const Bonuses = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет',
      pathname: '/Profile/bonuses',
    },
    {
      id: 3,
      name: 'Бонусы',
    }]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <BonusesWrapper />
  </NavPanel>
);

Bonuses.getInitialProps = async ({ store }) => {
  store.dispatch(getBonuses({}));
};

export default Bonuses;
