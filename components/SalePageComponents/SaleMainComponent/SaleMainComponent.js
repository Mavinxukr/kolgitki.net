import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import SaleMethodOrder from '../SaleMethodOrder/SaleMethodOrder';
import SaleInfo from '../SaleInfo/SaleInfo';
import SaleDelivery from '../SaleDelivery/SaleDelivery';
import SalePayment from '../SalePayment/SalePayment';
import SaleConfirm from '../SaleConfirm/SaleConfirm';
import Styles from './SaleMainComponent.module.scss';

const SalePageComponents = () => (
  <MainLayout>
    <div className={Styles.SalePageComponents}>
      <SaleMethodOrder />
      <SaleInfo />
      <SaleDelivery />
      <SalePayment />
      <SaleConfirm />
    </div>
  </MainLayout>
);

export default SalePageComponents;
