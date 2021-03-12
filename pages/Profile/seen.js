import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import Viewed from '../../components/Wrappers/Profile/Viewed/Viewed';
import { getViewedProducts } from '../../services/product';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false }
);

const Seen = ({ viewedProducts }) => (
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
        pathname: 'Profile/seen'
      },
      {
        id: 3,
        name: 'Просмотренные',
        nameUa: 'Переглянуті'
      }
    ]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <Viewed viewedProducts={viewedProducts} />
  </DynamicComponentWithNoSSRNavPanel>
);

Seen.getInitialProps = async () => {
  const viewedProducts = await getViewedProducts({});

  return {
    viewedProducts: viewedProducts.data
  };
};

export default Seen;
