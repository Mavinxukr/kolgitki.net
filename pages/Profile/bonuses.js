import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import BonusesWrapper from '../../components/Wrappers/Profile/Bonuses/Bonuses';
import { getBonuses } from '../../redux/actions/bonuses';

const Bonuses = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет', 'Бонусы']}
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
