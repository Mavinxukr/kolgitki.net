import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import OrdersWrapper from '../../components/Wrappers/Profile/Orders/Orders';

const Orders = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет',
      pathname: '/Profile/orders',
    },
    {
      id: 3,
      name: 'Заказы',
    }]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <OrdersWrapper />
  </NavPanel>
);

export default Orders;
