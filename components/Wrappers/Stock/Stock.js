import React from 'react';
import styles from './Stock.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import StockVideo from '../../StockVideo/StockVideo';
import StockTimer from '../../StockTimer/StockTimer';
import ProductsComponent from '../ProductsComponent/ProductsComponent';
import { data } from './data';

const Stock = () => (
  <MainLayout>
    <BreadCrumbs value={['Главная', '/ Акции', '/ 5 Пар Колготок']} />
    <StockVideo />
    <StockTimer />
    <div className={styles.text}>
      <h2>Условия акции</h2>
      <p className={styles.desc}>
          Поддерживать высокие ожидания для студентов с ограниченными
          возможностями. Опрошенные признали, что не каждый учащийся с
          ограниченными возможностями может достичь высоких стандартов, но они
          порекомендовали придерживаться высоких ожиданий и поддерживать
          давление на систему, чтобы обеспечить обучение на более высоком
          уровне.
      </p>
    </div>
    <div className={styles.productsWrapper}>
      <p className={styles.countProducts}>54 товара</p>
      <ProductsComponent products={data} />
    </div>
  </MainLayout>
);

export default Stock;
