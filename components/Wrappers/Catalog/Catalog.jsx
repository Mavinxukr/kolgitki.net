import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../Products/Products';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import Loader from '../../Loader/Loader';
import {
  dataCatalogProductsSelector,
  isDataReceivedForCatalogProducts,
} from '../../../utils/selectors';
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import { createBodyForRequestCatalog } from '../../../utils/helpers';
import styles from './Catalog.scss';

const Catalog = () => {
  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCatalogProducts(
        {},
        createBodyForRequestCatalog(router.query),
      ),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getCatalogProducts(
        {},
        createBodyForRequestCatalog(router.query),
      ),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.catalog}>
        <div className={styles.header}>
          <BreadCrumbs items={['Главная', 'Категории']} />
          <FilterIndicators
            classNameWrapper={styles.filterIndicatorsWrapper}
            buttonValue="Удалить фильтры"
            router={router}
            pathname="/Products"
          />
          <p>{catalog.length} товара</p>
        </div>
        <Products
          products={catalog}
          classNameWrapper={styles.productsWrapper}
          router={router}
          pathname="/Products"
        />
      </div>
    </MainLayout>
  );
};

export default Catalog;
