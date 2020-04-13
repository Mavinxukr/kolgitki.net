import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import OrdersWrapper from '../../components/Wrappers/ProfileWholesale/OrdersWholesale/OrdersWholesale';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false },
);

const Orders = () => (
  <DynamicComponentWithNoSSRNavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет (опт)',
      pathname: '/ProfileWholesale/orders',
    },
    {
      id: 3,
      name: 'Заказы',
    }]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <OrdersWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default Orders;
