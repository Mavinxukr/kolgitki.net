import React, { useState } from 'react';
import cx from 'classnames';
import styles from './SearchProducts.scss';
import Search from '../../Search/Search';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import ProductsComponent from '../Products/Products';
import { data } from './data';

const SearchProducts = () => {
  const [searchActive, setSearchActive] = useState(false);

  const classNameForProducts = cx(styles.products, {
    [styles.productsDisabled]: searchActive,
  });

  return (
    <MainLayout>
      <div className={styles.searchProducts}>
        <Search setSearchActive={setSearchActive} />
        <div className={styles.titleBlock}>
          <BreadCrumbs items={['Главная', 'Поиск']} />
          <p>Найдено 150 товаров</p>
        </div>
        <div className={classNameForProducts}>
          {/*<ProductsComponent products={data} />*/}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchProducts;
