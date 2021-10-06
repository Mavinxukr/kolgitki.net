import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Products.scss';
import Pagination from '../../Pagination/Pagination';
import { cookies } from '../../../utils/getCookies';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import CategoriesList from '../../CategoriesList/CategoriesList';
import ProductSort from '../../ProductSort/ProductSort';
import FiltersList from '../../FiltersList/FiltersList';
import Button from '../../Layout/Button/Button';
import Filter from '../../Filter/Filter';
import { ProductsList } from '../Products/ProductsList/ProductsList';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';

export const Products = ({
  usedFilters,
  otherFilters,
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
  updateProducts,
  allFiltersSizes,
  allFiltersBrands,
  allFiltersColors,
  allFiltersMaterials,
  allFiltersDensity,
  loading,
  setPage,
  isDesktopScreen
}) => {
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

  const toggleFilter = (checked, filterName, filter) => {
    if (checked) {
      setFilters(prev => {
        const next = { ...prev };
        const old = next.hasOwnProperty(filterName) ? next[filterName] : [];
        next[filterName] = [...old, filter];
        return next;
      });
    } else {
      removeFilter(filterName, filter);
    }
  };

  return (
    <div className={styles.blogProducts__wrapper}>
      <div className={styles.blogProducts__categories}>
        <CategoriesList
          usedCategories={usedCategories}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setLink={setCategory}
          clear={clearCategory}
        ></CategoriesList>
      </div>
      <div className={styles.blogProducts__content}>
        <div className={styles.blogProducts__controllers}>
          <FiltersList
            loading={loading}
            filters={usedFilters}
            updateProducts={updateProducts}
            clearFilters={clearFilters}
            selectedCategory={selectedCategory}
            installedFilters={removeUnnecessaryFilters(usedFilters, [
              'brands',
              'sizes',
              'colors',
              'density',
              'materials'
            ])}
            removeOneFilter={removeFilter}
          ></FiltersList>
          <div className={styles.blogProducts__filters}>
            <Filter
              title={parseText(cookies, 'Размер', 'Розмір')}
              arrSelects={allFiltersSizes}
              id="size"
              changeHandle={(checked, filterName, filter) => {
                toggleFilter(checked, filterName, filter);
              }}
              selected={(usedFilters?.sizes && usedFilters.sizes) || []}
              categoryName="sizes"
            />
            <Filter
              title={parseText(cookies, 'Цвет', 'Колір')}
              arrSelects={allFiltersColors}
              id="color"
              selected={(usedFilters?.colors && usedFilters.colors) || []}
              changeHandle={(checked, filterName, filter) => {
                toggleFilter(checked, filterName, filter);
              }}
              categoryName="colors"
            />
            <Filter
              title={parseText(cookies, 'Плотность', 'Щільність')}
              arrSelects={allFiltersDensity}
              id="density"
              selected={(usedFilters?.density && usedFilters.density) || []}
              changeHandle={(checked, filterName, filter) => {
                toggleFilter(checked, filterName, filter);
              }}
              categoryName="density"
            />
            <Filter
              title={parseText(cookies, 'Бренд', 'Бренд')}
              arrSelects={allFiltersBrands}
              id="brand"
              selected={(usedFilters?.brands && usedFilters.brands) || []}
              changeHandle={(checked, filterName, filter) => {
                toggleFilter(checked, filterName, filter);
              }}
              categoryName="brands"
            />
            <Filter
              title={parseText(cookies, 'Материал', 'Матеріал')}
              arrSelects={allFiltersMaterials}
              changeHandle={(checked, filterName, filter) => {
                toggleFilter(checked, filterName, filter);
              }}
              id="materials"
              selected={(usedFilters?.materials && usedFilters.materials) || []}
              categoryName="materials"
            />
          </div>
          <ProductSort
            setSorting={setSorting}
            usedSort={otherFilters}
          ></ProductSort>
        </div>
        {!isDesktopScreen && (
          <div className={styles.blogProducts__mobileControllers}>
            <div className={styles.blogProducts__mobileControllers_wrapper}>
              <CategoriesMobile
                usedCategories={usedCategories}
                allCategories={allCategories}
                selectedCategory={selectedCategory}
                setLink={setCategory}
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
                allFiltersBrands={allFiltersBrands}
                allFiltersColors={allFiltersColors}
                allFiltersMaterials={allFiltersMaterials}
                allFiltersDensity={allFiltersDensity}
              />
            </div>
            <p className={styles.blogProducts__mobileControllers_counter}>
              {getCorrectWordCount(productsList.total, [
                'товар',
                'товара',
                'товаров'
              ])}
            </p>
          </div>
        )}

        <div className={styles.blogProducts__products}>
          <ProductsList products={productsList.data} loading={loading} />
        </div>

        {productsList?.last_page !== 1 && (
          <div className={styles.blogProducts__footer}>
            <div className={styles.blogProducts__pagination}>
              <Pagination
                pageCount={productsList?.last_page}
                currentPage={productsList?.current_page}
                setPage={setPage}
              />
            </div>

            {productsList?.last_page !== productsList?.current_page && (
              <Button
                disabled={loading}
                buttonType="button"
                title={`Показать ещё +${
                  productsList.total - productsList.to > 25
                    ? 25
                    : productsList.total - productsList.to
                }`}
                titleUa={`Показати ще +${
                  productsList.total - productsList.to > 25
                    ? 25
                    : productsList.total - productsList.to
                }`}
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
