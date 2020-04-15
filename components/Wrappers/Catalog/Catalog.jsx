import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { getAllCategories, getAllFilters } from '../../../services/home';

const findCategoryName = (categories, categoryId) => {
  let finalItem;
  if (categories.length) {
    categories.forEach((item) => {
      if (item.id === +categoryId) {
        finalItem = item;
      }
      const newItem = findCategoryName(item.subcategory, categoryId);
      if (newItem) {
        finalItem = newItem;
      }
    });
  }
  return finalItem;
};

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogProducts({}, createBodyForRequestCatalog(router.query)));
    getAllCategories({}).then(response => setCategories(response.data));
    getAllFilters({
      category_id: router.query.categories || 0,
    }).then(response => setFilters(response.data));
  }, []);

  useEffect(() => {
    dispatch(getCatalogProducts({}, createBodyForRequestCatalog(router.query)));
    getAllFilters({
      category_id: router.query.categories || 0,
    }).then(response => setFilters(response.data));
  }, [router.query]);

  if (!isDataReceived || !filters || categories.length === 0) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.catalog}>
        <div className={styles.header}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                pathname: '/',
              },
              {
                id: 2,
                name:
                  (findCategoryName(categories, router.query.categories)
                    && findCategoryName(categories, router.query.categories)
                      .name)
                  || 'Категории',
              },
            ]}
          />
          <FilterIndicators
            classNameWrapper={styles.filterIndicatorsWrapper}
            buttonValue="Удалить фильтры"
            router={router}
            pathname="/Products"
          />
          <p>{catalog.data.length} товара</p>
        </div>
        <Products
          products={catalog}
          classNameWrapper={styles.productsWrapper}
          router={router}
          pathname="/Products"
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...createBodyForRequestCatalog(router.query),
                  page: catalog.current_page + 1 || 1,
                },
                true,
              ),
            );
          }}
          categories={categories}
          filters={filters}
        />
      </div>
    </MainLayout>
  );
};

export default Catalog;
