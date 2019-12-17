import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileOrder from '../../components/Profile/ProfileOrder/ProfileOrder';

const Orders = () => (
  <NavPanel arrOfNavItems={arrOfNavItems}>
    <ProfileOrder />
  </NavPanel>
);

export default Orders;
