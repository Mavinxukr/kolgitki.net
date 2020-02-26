import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import OrdersWrapper from '../../components/Wrappers/ProfileWholesale/OrdersWholesale/OrdersWholesale';

const Orders = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет (опт)', 'Заказы']}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <OrdersWrapper />
  </NavPanel>
);

export default Orders;
