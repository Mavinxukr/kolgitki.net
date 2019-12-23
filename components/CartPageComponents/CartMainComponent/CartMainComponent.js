import React from 'react';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Cart from '../Cart/Cart';

const CartMainComponent = () => (
  <MainLayout>
    <BreadCrumbs />
    <Cart />
  </MainLayout>
);

export default CartMainComponent;
