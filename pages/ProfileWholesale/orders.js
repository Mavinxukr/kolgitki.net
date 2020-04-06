import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import OrdersWrapper from '../../components/Wrappers/ProfileWholesale/OrdersWholesale/OrdersWholesale';

const Orders = () => (
  <NavPanel
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
  </NavPanel>
);

export default Orders;
