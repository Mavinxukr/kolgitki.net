import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DeliveryWrapper from '../../components/Wrappers/Info/Delivery/Delivery';

const Delivery = () => (
  <NavPanel
    routerValues={['Главная', 'Доставка и оплата']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <DeliveryWrapper />
  </NavPanel>
);

export default Delivery;
