import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import OrdersWrapper from '../../components/Wrappers/Profile/Orders/Orders';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false }
);

const Orders = () => (
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
        pathname: 'Profile/orders'
      },
      {
        id: 3,
        name: 'Заказы',
        nameUa: 'Замовлення'
      }
    ]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <OrdersWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default Orders;
