import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import BreadCrumbs from '../../UIComponents/BreadCrumbs/BreadCrumbs';
import Cart from '../Cart/Cart';

const CartMainComponent = () => (
  <MainLayout>
    <BreadCrumbs />
    <Cart />
  </MainLayout>
);

export default CartMainComponent;
