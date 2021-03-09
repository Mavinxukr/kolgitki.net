import React, { useState } from 'react';
import Link from 'next/link';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import classes from './CategoriesList.scss';

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

const CategoriesList = React.memo(
  ({
    allCategories,
    usedCategories,
    filters,
    setCategoryInFilters,
    clearCategotyInFilters,
    isProducts,
    isSale,
    isPresent
  }) => {
    let categories = [];
    if (!allCategories) {
      allCategories = JSON.parse(localStorage.getItem('getAllCategories'));
    }
    if (usedCategories !== null) {
      categories = sortCategoriesList(allCategories, usedCategories);
    } else {
      categories = allCategories;
    }

    const [categoryTitle, setCategoryTitle] = useState('');
    return (
<<<<<<< HEAD
      <div className={classes.block}>
        {categories.map(category => (
          <CategoriesItem
            key={category.id}
            category={category}
            setCategoryInFilters={setCategoryInFilters}
            filters={filters}
            isProducts={isProducts}
            isSale={isSale}
            isPresent={isPresent}
          ></CategoriesItem>
        ))}
        <div className={classes.allBlock}>
          <div className={classes.categoriesBlock}>
            <li onClick={clearCategotyInFilters} className={classes.category}>
              {parseText(cookies, 'Все', 'Всі')}
            </li>
=======
      <>
        <p className={classes.titleCategory}>{categoryTitle}</p>
        <div
          className={classes.block}
          onClick={
            (e) => {
              e.target.classList.contains('CategoriesItem_category') &&
                setCategoryTitle(e.target.innerHTML) ||
                e.target.classList.contains('SubcategoriesItem_subcategory') &&
                setCategoryTitle(e.target.innerHTML)
            }
          }
        >
          {categories.map(category => (
            <CategoriesItem
              key={category.id}
              category={category}
              setCategoryInFilters={setCategoryInFilters}
              filters={filters}
              sale={sale || false}
              present={present || false}
              products={products || false}
            ></CategoriesItem>
          ))}
          <div className={classes.allBlock}>
            <div className={classes.categoriesBlock}>
              <li onClick={clearCategotyInFilters} className={classes.category}>
                {parseText(cookies, 'Все', 'Всі')}
              </li>
            </div>
>>>>>>> fb4102a033f987f5a360819af7d456061f0dc4b6
          </div>
        </div>
      </>
    );
  }
);

export default CategoriesList;

