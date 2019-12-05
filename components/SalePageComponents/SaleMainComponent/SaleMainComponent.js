import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import SaleInfo from '../SaleInfo/SaleInfo';
import SaleDelivery from '../SaleDelivery/SaleDelivery';
import SalePayment from '../SalePayment/SalePayment';
import SaleConfirm from '../SaleConfirm/SaleConfirm';
import Styles from './SaleMainComponent.module.scss';

const SalePageComponents = () => (
  <MainLayout>
    <div className={Styles.SalePageComponents}>
      <SaleInfo />
      {/*<SaleDelivery />*/}
      {/*<SalePayment />*/}
      {/*<SaleConfirm />*/}
    </div>
  </MainLayout>
);

export default SalePageComponents;
