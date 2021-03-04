import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import styles from './Products.scss';

import Pagination from '../../Pagination/Pagination';
import { withResponse } from '../../hoc/withResponse';
import Button from '../../Layout/Button/Button';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';
import { cookies } from '../../../utils/getCookies';
import ProductForOpt from './ProductForOpt';
import { parseText } from '../../../utils/helpers';
import { userDataSelector } from '../../../utils/selectors';
import CategoriesList from '../../CategoriesList/CategoriesList';
import { ProductsContext } from '../../../context/ProductsContext';
import ProductSort from '../../ProductSort/ProductSort';
import ProductsFilters from './ProductsFilters/ProductsFilters';
import FiltersList from '../../FiltersList/FiltersList';
import Loader from '../../Loader/Loader';
import ProductLoader from '../../ProductLoader/ProductLoader';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false }
);

const Products = ({
  products,
  classNameWrapper,
  getProductHandle,
  pathname,
  action,
  filters,
  isDesktopScreen
}) => {
  const userData = useSelector(userDataSelector);
  const loading = useSelector(state => state.catalogProducts.isFetch);
  const [withPhoto, ShowWithPhoto] = useState(false);
  const {
    productsFilters,
    addProductsFilter,
    clearProductsFilters,
    setProductsSorting,
    removeProductsFilter,
    setPage
  } = useContext(ProductsContext);

  const removeUnnecessaryFilters = allFilters => {
    const filters = { ...allFilters };
    delete filters?.categories;
    delete filters?.sort_popular;
    delete filters?.sort_price;
    delete filters?.sort_date;
    delete filters?.page;
    return filters;
  };
  return (
    <div className={cx(styles.productsWrapper, classNameWrapper)}>
      {(isDesktopScreen && (
        <div className={styles.leftSide}>
          <CategoriesList
            usedCategories={null}
            filters={productsFilters}
            setCategoryInFilters={category => {
              addProductsFilter('categories', JSON.stringify([category]));
              addProductsFilter('page', 1);
            }}
            clearCategotyInFilters={() => {
              clearProductsFilters(['categories', 'page']);
            }}
            products={true}
          ></CategoriesList>
        </div>
      )) || (
        <>
          <div className={styles.sortWrapperMobile}>
            {/* <CategoriesMobile
                classNameWrapper={styles.categoriesMobileWrapper}
                pathname={pathname}
                router={router}
                productsLength={products?.data?.length}
                categories={categories}
              />
              <FiltersMobile
                pathname={pathname}
                router={router}
                classNameWrapper={styles.filtersMobileWrapper}
                productsLength={products?.data?.length}
                filters={filters}
              /> */}
          </div>
        </>
      )}
      <div className={styles.rightSide}>
        {isDesktopScreen && (
          <>
            <div className={styles.controllersWrapper}>
              <FiltersList
                getProductHandle={getProductHandle}
                clearFilters={clearProductsFilters}
                installedFilters={removeUnnecessaryFilters(productsFilters)}
                removeOneFilter={removeProductsFilter}
              ></FiltersList>
              <ProductsFilters
                installedFilters={productsFilters}
                setFilters={addProductsFilter}
                clearFilters={clearProductsFilters}
                allFiltersSizes={filters[3].sizes}
                allFilrersBrands={filters[0].brands}
                allFilrersColors={filters[0].colors}
                allFilrersMaterials={filters[1].attributes[0].value}
                allFilrersDensity={filters[1].attributes[1].value}
              ></ProductsFilters>
            </div>
            <ProductSort
              setSorting={setProductsSorting}
              installedFilters={productsFilters}
            ></ProductSort>
          </>
        )}
        {userData?.role?.id === 3 ? (
          <div className={styles.productBlock}>
            {loading ? (
              <ProductLoader></ProductLoader>
            ) : products?.data?.length > 0 ? (
              <>
                <div className={styles.relative}>
                  <button
                    type="button"
                    className={cx(styles.withPhoto, {
                      [styles.checked]: withPhoto
                    })}
                    onClick={() => ShowWithPhoto(!withPhoto)}
                  >
                    {parseText(cookies, 'Показать с фото', 'Показати з фото')}
                  </button>
                </div>
                <div uk-accordion="multiple: false">
                  {products?.data.map(item => (
                    <ProductForOpt
                      key={item.id + item.name}
                      item={item}
                      isToggled={false}
                      withPhoto={withPhoto}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className={styles.notFoundText}>
                {parseText(cookies, 'Ничего не найдено', 'Нiчого не знайдено')}
              </p>
            )}
          </div>
        ) : (
          <div className={styles.cards}>
            {loading ? (
              <ProductLoader></ProductLoader>
            ) : products?.data?.length > 0 ? (
              products?.data.map(item => (
                <DynamicComponentWithNoSSRProductCard
                  key={item.id}
                  classNameWrapper={styles.card}
                  item={item}
                  isSimpleProduct
                  userDataId={userData?.role?.id}
                />
              ))
            ) : (
              <p className={styles.notFoundText}>
                {parseText(cookies, 'Ничего не найдено', 'Нiчого не знайдено')}
              </p>
            )}
          </div>
        )}
        {products?.last_page !== 1 && (
          <div className={styles.addElements}>
            <Pagination
              pageCount={products?.last_page}
              currentPage={products?.current_page}
              setPage={number => setPage(number)}
            />
            {/* {products?.last_page !== products?.current_page && (
              <Button
                buttonType="button"
                title="Показать ещё +25"
                titleUa="Показати ще +25"
                viewType="pagination"
                classNameWrapper={styles.paginationButtonWrapper}
                onClick={action}
              />
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    last_page: PropTypes.number,
    current_page: PropTypes.number,
    total: PropTypes.number
  }),
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  action: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Products);
