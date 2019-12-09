import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import SaleInfo from '../SaleInfo/SaleInfo';
import SaleDelivery from '../SaleDelivery/SaleDelivery';
import SalePayment from '../SalePayment/SalePayment';
import SaleTotalBlock from '../SaleTotalBlock/SaleTotalBlock';
import Styles from './SaleMainComponent.module.scss';

const SalePageComponents = () => (
  <MainLayout>
    <div className={Styles.SalePageComponents}>
      <div className={Styles.SalePageComponents__Wrapper}>
        <div className={Styles.SalePageComponents__Group}>
          <SaleInfo />
          <SaleDelivery />
          <SalePayment />
          <div className={Styles.SalePageComponents__SaleConfirm}>
            <h2 className={Styles.SalePageComponents__OrderTitle}>Комментарий к заказу</h2>
            <input type="text" placeholder="Ваши пожелания" className={Styles.SalePageComponents__OrderField} />
          </div>
        </div>
        <SaleTotalBlock />
      </div>
    </div>
  </MainLayout>
);

export default SalePageComponents;
