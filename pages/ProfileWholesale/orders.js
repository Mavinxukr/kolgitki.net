import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileWholesaleOrders from '../../components/ProfileWholesale/ProfileWholesaleOrders/ProfileWholesaleOrders';

const Orders = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет (опт)', '/ Заказы']}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileWholesaleOrders />
  </NavPanel>
);

export default Orders;
