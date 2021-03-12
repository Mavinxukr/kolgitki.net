import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItemss } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import OrdersWrapper from '../../components/Wrappers/ProfileWholesale/OrdersWholesale/OrdersWholesale';

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
        name: 'Личный кабинет (опт)',
        nameUa: 'Особистий кабінет (опт)',
        pathname: 'ProfileWholesale/orders'
      },
      {
        id: 3,
        name: 'Заказы',
        nameUa: 'Замовлення'
      }
    ]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItemss}
    isLogout
  >
    <OrdersWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default Orders;
