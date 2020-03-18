import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import DeliveryWrapper from '../../components/Wrappers/Info/Delivery/Delivery';
import { getDeliveryData } from '../../services/Info/delivery';

const Delivery = ({ deliveryData }) => (
  <NavPanel
    routerValues={['Главная', 'Доставка и оплата']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <DeliveryWrapper deliveryData={deliveryData} />
  </NavPanel>
);

Delivery.getInitialProps = async () => {
  const deliveryData = await getDeliveryData({});

  return {
    deliveryData: deliveryData.data,
  };
};

export default Delivery;
