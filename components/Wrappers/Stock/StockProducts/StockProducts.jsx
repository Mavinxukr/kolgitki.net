import React from 'react';
import { removeUnnecessaryFilters } from '../../../../utils/products';
import styles from './StockProducts.scss';
import CategoriesList from '../../../CategoriesList/CategoriesList';
import ProductSort from '../../../ProductSort/ProductSort';
import ProductLoader from '../../../ProductLoader/ProductLoader';
import { Noresult } from '../../Products/Noresult/Noresult';
import { ProductsListOpt } from '../../Products/ProductsListOpt/ProductsListOpt';
import { ProductsList } from '../../Products/ProductsList/ProductsList';
import Pagination from '../../../Pagination/Pagination';
import Button from '../../../Layout/Button/Button';
import CategoriesMobile from '../../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../../FiltersMobile/FiltersMobile';
import Filter from '../../../Filter/Filter';
import FiltersList from '../../../FiltersList/FiltersList';
import { parseText } from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../../utils/selectors';

export const StockProducts = ({
  usedCategories,
  allCategories,
  selectedCategory,
  setCategory,
  clearCategory,
  loading,
  allFilters,
  usedFilters,
  otherFilters,
  setFilters,
  updateProducts,
  clearFilters,
  removeOneFilter,
  goods,
  setSort,
  allFiltersSizes,
  allFiltersBrands,
  allFiltersColors,
  allFiltersMaterials,
  allFiltersDensity,
  action,
  setPage
}) => {
  const userData = useSelector(userDataSelector);

  const toggleFilter = (checked, filterName, filter) => {
    if (checked) {
      setFilters(prev => {
        const next = { ...prev };
        const old = next.hasOwnProperty(filterName) ? next[filterName] : [];
        next[filterName] = [...old, filter];
        return next;
      });
    } else {
      setFilters(filterName, filter);
    }
  };

  return (
    <div className={styles.products_wrapper}>
      <div className={styles.products_categories}>
        <CategoriesList
          usedCategories={usedCategories}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setLink={setCategory}
          clear={clearCategory}
          isStock
        ></CategoriesList>
      </div>
      <div className={styles.products_content}>
        <div className={styles.products_header}>
          <div className={styles.products_desctop}>
            <FiltersList
              loading={loading}
              filters={usedFilters}
              updateProducts={updateProducts}
              clearFilters={clearFilters}
              installedFilters={removeUnnecessaryFilters(usedFilters, [
                'brands',
                'sizes',
                'colors',
                'density',
                'materials'
              ])}
              removeOneFilter={removeOneFilter}
            ></FiltersList>
            <div className={styles.products_filters}>
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
                selected={
                  (usedFilters?.materials && usedFilters.materials) || []
                }
                categoryName="materials"
              />
            </div>
            <ProductSort
              setSorting={setSort}
              usedSort={otherFilters}
            ></ProductSort>
          </div>
          <div className={styles.products_mobile}>
            <CategoriesMobile
              usedCategories={null}
              allCategories={allFilters.categories}
              selectedCategory={selectedCategory}
              setLink={setCategory}
              clear={clearCategory}
              isStock
            />

            <FiltersMobile
              loading={loading}
              installedFilters={usedFilters}
              setFilters={setFilters}
              removeOneFilter={removeOneFilter}
              setSorting={setSort}
              clearFilters={clearFilters}
              updateProducts={updateProducts}
              allFiltersSizes={allFiltersSizes}
              allFiltersBrands={allFiltersBrands}
              allFiltersColors={allFiltersColors}
              allFiltersMaterials={allFiltersMaterials}
              allFiltersDensity={allFiltersDensity}
            />
          </div>
        </div>
        <div className={styles.products_goods}>
          {loading ? (
            <ProductLoader />
          ) : goods?.data?.length > 0 ? (
            userData?.role?.id === 3 ? (
              <ProductsListOpt products={goods.data} />
            ) : (
              <ProductsList products={goods.data} userId={userData?.role?.id} />
            )
          ) : (
            <Noresult></Noresult>
          )}
        </div>
        <div className={styles.products_footer}>
          {goods?.last_page !== 1 && (
            <>
              <Pagination
                pageCount={goods?.last_page}
                currentPage={goods?.current_page}
                setPage={setPage}
              />
              {goods?.last_page !== goods?.current_page && (
                <Button
                  buttonType="button"
                  title="Показать ещё +25"
                  titleUa="Показати ще +25"
                  viewType="pagination"
                  classNameWrapper={styles.paginationButtonWrapper}
                  onClick={action}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
