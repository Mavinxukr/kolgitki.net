import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import OrdersWrapper from '../../components/Wrappers/Profile/Orders/Orders';

const Orders = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет', 'Заказы']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <OrdersWrapper />
  </NavPanel>
);

export default Orders;
