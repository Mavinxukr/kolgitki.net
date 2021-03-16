import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Products.scss';
import Pagination from '../../Pagination/Pagination';
import { withResponse } from '../../hoc/withResponse';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';
import { cookies } from '../../../utils/getCookies';
import ProductForOpt from './ProductForOpt';
import { parseText } from '../../../utils/helpers';
import { userDataSelector } from '../../../utils/selectors';
import CategoriesList from '../../CategoriesList/CategoriesList';
import ProductSort from '../../ProductSort/ProductSort';
import ProductsFilters from './ProductsFilters/ProductsFilters';
import FiltersList from '../../FiltersList/FiltersList';
import ProductLoader from '../../ProductLoader/ProductLoader';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false }
);

const Products = ({
  usedFilters,
  allCategories,
  usedCategories,
  setFilter,
  clearFilters,
  setSorting,
  removeFilter,
  setPage,
  productsList,
  classNameWrapper,
  getProductsList,
  allFiltersSizes,
  allFilrersBrands,
  allFilrersColors,
  allFilrersMaterials,
  allFilrersDensity,
  path,
  isDesktopScreen,
  loading,
  isProducts,
  isSale,
  isPresent
}) => {
  const userData = useSelector(userDataSelector);
  const [withPhoto, ShowWithPhoto] = useState(false);
  const removeUnnecessaryFilters = (allFilters, removelist) => {
    const filters = { ...allFilters };
    removelist.forEach(item => {
      delete filters[item];
    });
    return filters;
  };

  return (
    <div className={cx(styles.productsWrapper, classNameWrapper)}>
      {isDesktopScreen && (
        <div className={styles.leftSide}>
          <CategoriesList
            usedCategories={usedCategories}
            allCategories={allCategories}
            filters={usedFilters}
            setCategoryInFilters={category => {
              clearFilters(['search']);
              setFilter('categories', JSON.stringify([category]));
              setFilter('page', 1);
            }}
            clearCategotyInFilters={() => {
              clearFilters(['categories', 'page']);
            }}
            isProducts={isProducts}
            isSale={isSale}
            isPresent={isPresent}
            path={path}
          ></CategoriesList>
        </div>
      )}
      <div className={styles.rightSide}>
        {isDesktopScreen ? (
          <>
            <div className={styles.controllersWrapper}>
              <FiltersList
                getProductHandle={getProductsList}
                clearFilters={clearFilters}
                installedFilters={removeUnnecessaryFilters(usedFilters, [
                  'categories',
                  'sort_popular',
                  'sort_price',
                  'sort_date',
                  'page',
                  'search'
                ])}
                removeOneFilter={removeFilter}
              ></FiltersList>
              <ProductsFilters
                installedFilters={usedFilters}
                setFilters={setFilter}
                clearFilters={clearFilters}
                allFiltersSizes={allFiltersSizes}
                allFilrersBrands={allFilrersBrands}
                allFilrersColors={allFilrersColors}
                allFilrersMaterials={allFilrersMaterials}
                allFilrersDensity={allFilrersDensity}
              ></ProductsFilters>
            </div>
            <ProductSort
              setSorting={setSorting}
              installedFilters={usedFilters}
            ></ProductSort>
          </>
        ) : (
          <>
            <div className={styles.sortWrapperMobile}>
              <CategoriesMobile
                usedCategories={usedCategories}
                setCategoryInFilters={category => {
                  setFilter('categories', JSON.stringify([category]));
                  setFilter('page', 1);
                }}
                clearCategotyInFilters={() => {
                  clearFilters(['categories', 'page']);
                }}
                filters={usedFilters}
                isProducts={isProducts}
                isSale={isSale}
                isPresent={isPresent}
              />

              <FiltersMobile
                installedFilters={removeUnnecessaryFilters(usedFilters, [
                  'categories',
                  'page'
                ])}
                setFilters={setFilter}
                removeFilter={removeFilter}
                setSorting={setSorting}
                getProductHandle={getProductsList}
                clearFilters={() => {
                  clearFilters(
                    Object.keys(
                      removeUnnecessaryFilters(usedFilters, [
                        'categories',
                        'sort_popular',
                        'sort_price',
                        'sort_date',
                        'page'
                      ])
                    )
                  );
                }}
                allFiltersSizes={allFiltersSizes}
                allFilrersBrands={allFilrersBrands}
                allFilrersColors={allFilrersColors}
                allFilrersMaterials={allFilrersMaterials}
                allFilrersDensity={allFilrersDensity}
              />
            </div>
          </>
        )}
        {userData?.role?.id === 3 ? (
          <div className={styles.productBlock}>
            {loading ? (
              <ProductLoader></ProductLoader>
            ) : productsList?.data?.length > 0 ? (
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
                  {productsList?.data.map(item => (
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
            {loading || !productsList ? (
              <ProductLoader></ProductLoader>
            ) : productsList?.data?.length > 0 ? (
              productsList?.data.map(item => (
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
        {productsList?.last_page !== 1 && (
          <div className={styles.addElements}>
            <Pagination
              pageCount={productsList?.last_page}
              currentPage={productsList?.current_page}
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
