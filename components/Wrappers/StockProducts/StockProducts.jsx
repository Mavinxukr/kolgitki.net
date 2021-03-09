import React from 'react';
import { StocksContext } from '../../../context/StocksContext';
import styles from './StockProducts.scss';
import StockProductsList from './StockProductsList/StockProductsList';
import { withResponse } from '../../hoc/withResponse';
import FiltersList from '../../FiltersList/FiltersList';
import StockFilters from './StockFilters/StockFilters';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';
import CategoriesList from '../../CategoriesList/CategoriesList';
import ProductSort from '../../ProductSort/ProductSort';

//method for getting an array of categories of all products
//entry: array of objects
//output: array of objects
const usedCategoriesBuild = products => {
  let usedCategories = [];
  products.forEach(
    item => (usedCategories = [...usedCategories, ...item.categories])
  );
  return usedCategories;
};

const StockProducts = React.memo(({ products, isDesktopScreen }) => {
  const stocksContext = React.useContext(StocksContext);
  const usedCategories = products
    ? usedCategoriesBuild(products.action.goods)
    : [];

  //add category to filters
  const setCategoryInFilters = value => {
    stocksContext.addFilter(
      'stockFilters',
      'categories',
      JSON.stringify([value])
    );
  };

  //preparing the object for filters without categories
  const removeUnnecessaryFilters = allFilters => {
    const filters = { ...allFilters };
    delete filters?.categories;
    delete filters?.sort_popular;
    delete filters?.sort_price;
    delete filters?.sort_date;

    return filters;
  };

  return (
    <div className={styles.block}>
      {isDesktopScreen && (
        <div className={styles.categoriesBlock}>
          <CategoriesList
            usedCategories={null}
            clearCategotyInFilters={() =>
              stocksContext.clearFilters('stockFilters', ['categories'])
            }
            setCategoryInFilters={setCategoryInFilters}
            filters={stocksContext.filters.stockFilters}
            sale={true}
          />
        </div>
      )}
      <div className={styles.productsBlock}>
        {isDesktopScreen ? (
          <>
            <FiltersList
              clearFilters={clearFiltersList}
              installedFilters={removeUnnecessaryFilters(
                stocksContext.filters.stockFilters
              )}
              removeOneFilter={removeOneFilter}
            />
            <StockFilters
              installedFilters={stocksContext.filters.stockFilters}
              setFilters={setFilter}
              clearFilters={clearFiltersList}
              allFiltersSizes={products.filters[2].sizes}
              allFilrersBrands={products.filters[0].brands}
              allFilrersColors={products.filters[0].colors}
              allFilrersMaterials={products.filters[1].attributes[0].value}
              allFilrersDensity={products.filters[1].attributes[1].value}
            />
            <ProductSort
              installedFilters={stocksContext.filters.stockFilters}
              setSorting={setSorting}
            ></ProductSort>
          </>
        ) : (
          <>
            <div className={styles.sortWrapperMobile}>
              <CategoriesMobile
                usedCategories={usedCategories}
                setCategoryInFilters={setCategoryInFilters}
                clearCategotyInFilters={() =>
                  stocksContext.clearFilters('stockFilters', ['categories'])
                }
                filters={stocksContext.filters.stockFilters}
                classNameWrapper={styles.categoriesMobileWrapper}
                pathname={null}
                router={null}
                sale={true}
              />

              <FiltersMobile
                pathname={null}
                router={null}
                installedFilters={stocksContext.filters.stockFilters}
                setFilters={setFilter}
                removeFilter={removeOneFilter}
                setSorting={setSorting}
                clearFilters={clearFiltersList}
                allFiltersSizes={products.filters[2].sizes}
                allFilrersBrands={products.filters[0].brands}
                allFilrersColors={products.filters[0].colors}
                allFilrersMaterials={products.filters[1].attributes[0].value}
                allFilrersDensity={products.filters[1].attributes[1].value}
                classNameWrapper={styles.filtersMobileWrapper}
              />
            </div>
          </>
        )}
        <StockProductsList products={products} />
      </div>
    </div>
  );
});

export default withResponse(StockProducts);
