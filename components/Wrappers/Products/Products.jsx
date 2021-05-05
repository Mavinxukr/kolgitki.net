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
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { userDataSelector } from '../../../utils/selectors';
import CategoriesList from '../../CategoriesList/CategoriesList';
import ProductSort from '../../ProductSort/ProductSort';
import ProductsFilters from './ProductsFilters/ProductsFilters';
import FiltersList from '../../FiltersList/FiltersList';
import ProductLoader from '../../ProductLoader/ProductLoader';
import Button from '../../Layout/Button/Button';
import { useRouter } from 'next/router';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false }
);

const Products = ({
  usedFilters,
  allCategories,
  usedCategories,
  selectedCategory,
  setCategory,
  clearCategory,
  setFilters,
  clearFilters,
  setSorting,
  removeFilter,
  productsList,
  action,
  classNameWrapper,
  updateProducts,
  allFiltersSizes,
  allFilrersBrands,
  allFilrersColors,
  allFilrersMaterials,
  allFilrersDensity,
  isStock,
  loading
}) => {
  const userData = useSelector(userDataSelector);
  const [withPhoto, ShowWithPhoto] = useState(false);
  const router = useRouter();
  const removeUnnecessaryFilters = (allFilters, filteList) => {
    const filters = {};
    filteList.forEach(item => {
      if (allFilters.hasOwnProperty(item)) {
        filters[item] = allFilters[item];
      }
    });
    return filters;
  };

  return (
    <div className={cx(styles.productsWrapper, classNameWrapper)}>
      <div className={styles.categoriesBlock}>
        <CategoriesList
          usedCategories={usedCategories}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setLink={setCategory}
          clear={clearCategory}
          isStock={isStock}
        ></CategoriesList>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.controllersWrapper}>
          <FiltersList
            loading={loading}
            filters={usedFilters}
            updateProducts={updateProducts}
            clearFilters={clearFilters}
            installedFilters={removeUnnecessaryFilters(usedFilters, [
              'brands',
              'sizes',
              'colors',
              'dencity',
              'materials'
            ])}
            removeOneFilter={removeFilter}
          ></FiltersList>
          <ProductsFilters
            installedFilters={usedFilters}
            setFilters={setFilters}
            removeOneFilter={removeFilter}
            allFiltersSizes={allFiltersSizes}
            allFilrersBrands={allFilrersBrands}
            allFilrersColors={allFilrersColors}
            allFilrersMaterials={allFilrersMaterials}
            allFilrersDensity={allFilrersDensity}
          ></ProductsFilters>
          <ProductSort
            setSorting={setSorting}
            usedSort={usedFilters}
          ></ProductSort>
        </div>
        <div className={styles.mobileWrapper}>
          <div className={styles.sortWrapperMobile}>
            <CategoriesMobile
              usedCategories={usedCategories}
              allCategories={allCategories}
              selectedCategory={selectedCategory}
              setLink={slug => {
                setFilters({});
                router.push(`/products/${slug}`);
              }}
              clear={clearCategory}
            />

            <FiltersMobile
              loading={loading}
              installedFilters={usedFilters}
              setFilters={setFilters}
              removeOneFilter={removeFilter}
              setSorting={setSorting}
              clearFilters={clearFilters}
              updateProducts={updateProducts}
              allFiltersSizes={allFiltersSizes}
              allFilrersBrands={allFilrersBrands}
              allFilrersColors={allFilrersColors}
              allFilrersMaterials={allFilrersMaterials}
              allFilrersDensity={allFilrersDensity}
            />
          </div>
          <p className={styles.goodsNumber}>
            {getCorrectWordCount(productsList.total, [
              'товар',
              'товара',
              'товаров'
            ])}
          </p>
        </div>
        <div className={styles.productBlock}>
          {productsList?.data?.length > 0 ? (
            userData?.role?.id === 3 ? (
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
              <div className={styles.cards}>
                {productsList?.data.map(item => {
                  return (
                    <DynamicComponentWithNoSSRProductCard
                      key={item.id}
                      classNameWrapper={styles.card}
                      item={item}
                      isSimpleProduct
                      userDataId={userData?.role?.id}
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div className={styles.noresultBlock}>
              <p className={styles.notFoundText}>
                {parseText(
                  cookies,
                  'К сожалению, ничего не найдено. Пожалуйста, измените ваш запрос',
                  'На жаль, нічого не знайдено. Будь ласка, поміняйте ваш запит'
                )}
              </p>
              <div className={styles.buttonsBlock}>
                <Button
                  title="Перейти на главную"
                  titleUa="Перейти на головну"
                  buttonType="button"
                  viewType="black"
                  onClick={() => {
                    router.push('/');
                  }}
                />

                <Button
                  title="Посмотреть новинки"
                  titleUa="Переглянути новинки"
                  buttonType="button"
                  viewType="white"
                  onClick={() => {
                    clearFilters(
                      Object.keys(
                        removeUnnecessaryFilters(usedFilters, [
                          'sort_popular',
                          'sort_price',
                          'sort_date'
                        ])
                      )
                    );
                    router.push('/products');
                  }}
                />
              </div>
            </div>
          )}
          {loading && (
            <div className={styles.loader}>
              <ProductLoader></ProductLoader>
            </div>
          )}
        </div>

        {productsList?.last_page !== 1 && (
          <div className={styles.addElements}>
            <div className={styles.paginatonWrapper}>
              <Pagination
                pageCount={productsList?.last_page}
                currentPage={productsList?.current_page}
                setPage={number => {
                  const newFilters = { ...usedFilters };
                  newFilters.page = number;
                  let query = '';

                  Object.keys(newFilters).map(
                    filter => (query += `${filter}=${newFilters[filter]}&`)
                  );

                  query = query.slice(0, -1);
                  router.push(`${router.asPath.split('?')[0]}?${query}`);
                }}
              />
            </div>

            {productsList?.last_page !== productsList?.current_page && (
              <Button
                disabled={loading}
                buttonType="button"
                title="Показать ещё +25"
                titleUa="Показати ще +25"
                viewType="pagination"
                classNameWrapper={styles.paginationButtonWrapper}
                onClick={action}
              />
            )}
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
