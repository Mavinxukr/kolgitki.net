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

// //recursive method of filtering subcategories and their subcategories based on the categories used in the list of products
// //entry: 1: array of objects, 2: array of objects
// //output: array of objects
// const sortSubcategoryList = (allSubategories, usedCategories) => {
//   const subcategories = allSubategories.filter(subcategory => {
//     for (let usedCategory of usedCategories) {
//       if (usedCategory.id === subcategory.id) {
//         return true;
//       }
//     }
//   });
//   if (subcategories.length > 0) {
//     subcategories.map(subcategory => {
//       let sortSubcat = sortSubcategoryList(
//         subcategory.subcategory,
//         usedCategories
//       );
//       subcategory.subcategory = sortSubcat;
//     });
//   }
//   return subcategories;
// };

// //method of sorting the full list of categories based on the categories used
// //entry: 1: array of objects, 2: array of objects
// //output: array of objects
// const sortCategoriesList = (allCategories, usedCategories) => {
//   const categories = allCategories.filter(category => {
//     for (let usedCategory of usedCategories) {
//       if (usedCategory.id === category.id) {
//         return true;
//       }
//     }
//   });
//   if (categories.length > 0) {
//     categories.forEach(category => {
//       let sortSubcat = [];
//       sortSubcat = sortSubcategoryList(category.subcategory, usedCategories);
//       category.subcategory = sortSubcat;
//     });
//   }

//   return categories;
// };

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

const StockProducts = React.memo(
  ({ products, allCategories, isDesktopScreen }) => {
    const stocksContext = React.useContext(StocksContext);
    const usedCategories = products
      ? usedCategoriesBuild(products.action.goods)
      : [];
    // const categories = sortCategoriesList(allCategories, usedCategories);

    //add category to filters
    const setCategoryInFilters = value => {
      stocksContext.addFilter(
        'stockFilters',
        'categories',
        JSON.stringify([value])
      );
    };

    //add filters
    const setFilter = (categoryName, value) => {
      stocksContext.addFilter('stockFilters', categoryName, value);
    };
    //clear filters list
    const clearFiltersList = list => {
      stocksContext.clearFilters('stockFilters', list);
    };
    //remove one selected filter
    const removeOneFilter = (filterGroupName, filterItem) => {
      stocksContext.removeFilter('stockFilters', filterGroupName, filterItem);
    };
    //set sorting product
    const setSorting = (filter, value) => {
      stocksContext.setSorting('stockFilters', filter, value);
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
              allCategories={allCategories}
              usedCategories={usedCategories}
              clearCategotyInFilters={() =>
                stocksContext.addFilter(
                  'stockFilters',
                  'categories',
                  JSON.stringify([])
                )
              }
              // categories={categories}
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
                  allCategories={allCategories}
                  usedCategories={usedCategories}
                  // categories={categories}
                  setCategoryInFilters={setCategoryInFilters}
                  clearCategotyInFilters={() =>
                    stocksContext.addFilter(
                      'stockFilters',
                      'categories',
                      JSON.stringify([])
                    )
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
                  clearFilters={() =>
                    clearFiltersList(
                      removeUnnecessaryFilters(
                        stocksContext.filters.stockFilters
                      )
                    )
                  }
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
  }
);

export default withResponse(StockProducts);
