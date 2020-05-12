import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
import { cookies } from '../../../utils/getCookies';
import styles from './Catalog.scss';
import { getAllCategories, getAllFilters } from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';

const findCategoryName = (categories, categoryId) => {
  let finalItem;
  if (categoryId && categoryId.length && categories.length) {
    categories.forEach((item) => {
      if (item.id === categoryId[0].id) {
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

const Catalog = ({ isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [selectCategoryName, setSelectCategoryName] = useState('');
  const [filters, setFilters] = useState(null);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateStorage = () => {
    const filtersCookies = cookies.get('filters');
    const foundCategoryName = findCategoryName(
      categories,
      filtersCookies && filtersCookies.categories,
    );
    dispatch(
      getCatalogProducts({}, createBodyForRequestCatalog(filtersCookies)),
    );
    getAllCategories({}).then(response => setCategories(response.data));
    getAllFilters({
      category_id:
        (filtersCookies
          && filtersCookies.categories
          && filtersCookies.categories[0].id)
        || 0,
    }).then(response => setFilters(response.data));
    setSelectCategoryName(
      (foundCategoryName && foundCategoryName.name) || 'Категории',
    );
  };

  useEffect(() => {
    handleUpdateStorage();

    return () => {
      cookies.remove('filters');
    };
  }, []);

  useEffect(() => {
    handleUpdateStorage();
  }, [router]);

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
                name: selectCategoryName,
              },
            ]}
          />
          {(isDesktopScreen && (
            <>
              <FilterIndicators
                classNameWrapper={styles.filterIndicatorsWrapper}
                buttonValue="Удалить фильтры"
                router={router}
                pathname="/Products"
              />
              <p>{catalog.data.length} товара</p>
            </>
          )) || (
            <p className={styles.titleCategory}>
              {selectCategoryName}
            </p>
          )}
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
                  ...createBodyForRequestCatalog(cookies.get('filters')),
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

Catalog.propTypes = {
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Catalog);
