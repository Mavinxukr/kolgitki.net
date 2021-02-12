import React from 'react';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../utils/selectors';
import StockCategories from './StokCategories/StockCategories';
import classes from './StokProducts.scss';
import StokProductsList from './StokProductsList/StokProductsList';

//recursive method of filtering subcategories and their subcategories based on the categories used in the list of products
//entry: 1: array of objects, 2: array of objects
//output: array of objects
const sortSubcategoryList = (allSubategories, usedCategories) => {
  const subcategories = allSubategories.filter(subcategory => {
    for (let usedCategory of usedCategories) {
      if (usedCategory.id === subcategory.id) {
        return true;
      }
    }
  });
  if (subcategories.length > 0) {
    subcategories.map(subcategory => {
      let sortSubcat = sortSubcategoryList(
        subcategory.subcategory,
        usedCategories
      );
      subcategory.subcategory = sortSubcat;
    });
  }
  return subcategories;
};

//method of sorting the full list of categories based on the categories used
//entry: 1: array of objects, 2: array of objects
//output: array of objects
const sortCategoriesList = (allCategories, usedCategories) => {
  const categories = allCategories.filter(category => {
    for (let usedCategory of usedCategories) {
      if (usedCategory.id === category.id) {
        return true;
      }
    }
  });
  if (categories.length > 0) {
    categories.forEach(category => {
      let sortSubcat = [];
      sortSubcat = sortSubcategoryList(category.subcategory, usedCategories);
      category.subcategory = sortSubcat;
    });
  }

  return categories;
};

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
  ({ products, allCategories, filterUpdate, isDesktopScreen }) => {
    const userData = useSelector(userDataSelector);
    const usedCategories = products
      ? usedCategoriesBuild(products.action.goods)
      : [];
    const categories = sortCategoriesList(allCategories, usedCategories);
    return (
      <div className={classes.block}>
        <StockCategories filterUpdate={filterUpdate} categories={categories} />
        <StokProductsList products={products.goods} />
      </div>
    );
  }
);

export default StockProducts;
