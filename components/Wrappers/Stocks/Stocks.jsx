import React from 'react';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Categories from '../../Categories/Categories';
import StocksCard from '../../StocksCard/StocksCard';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import styles from './Stocks.scss';
import { dataCategories, stocks, closeStocks } from './data';

const Stocks = () => (
  <MainLayout>
    <div className={styles.container}>
      <BreadCrumbs items={['Главная', 'Акции']} />
      <div className={styles.row}>
        <div className={styles.leftBlock}>
          <Categories arrSubCategories={dataCategories} />
        </div>
        <div className={styles.rightBlock}>
          <h3 className={styles.title}>Акции</h3>
          <div className={styles.Cards}>
            {stocks.map(item => (
              <StocksCard key={item.id} item={item} />
            ))}
          </div>
          <h3 className={styles.title}>Архив акций</h3>
          <div className={styles.Cards}>
            {closeStocks.map(item => (
              <StocksCard key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.pagination}>
            <Pagination />
            <Button
              buttonType="button"
              title="Показать ещё +25"
              viewType="pagination"
              width="246px"
            />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default Stocks;
