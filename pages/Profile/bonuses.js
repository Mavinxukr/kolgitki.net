import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import BonusesWrapper from '../../components/Wrappers/Profile/Bonuses/Bonuses';
import { getBonuses } from '../../redux/actions/bonuses';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false }
);

const Bonuses = () => (
  <DynamicComponentWithNoSSRNavPanel
    routerValues={[
      {
        id: 1,
        name: 'Главная',
        nameUa: 'Головна',
        pathname: '/'
      },
      {
        id: 2,
        name: 'Личный кабинет',
        nameUa: 'Особистий кабінет',
        pathname: 'Profile/bonuses'
      },
      {
        id: 3,
        name: 'Бонусы',
        nameUa: 'Бонуси'
      }
    ]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <BonusesWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

Bonuses.getInitialProps = async ({ store }) => {
  store.dispatch(getBonuses({}));
};

export default Bonuses;
