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

const CategoriesList = ({
  usedCategories,
  allCategories,
  selectedCategory,
  setLink
  // setCategory
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

  return (
    <div className={classes.block}>
      {!!categories &&
        categories.map(category => (
          <CategoriesItem
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            setLink={setLink}
          ></CategoriesItem>
        ))}
      {/* <div className={classes.allBlock}>
        <div className={classes.categoriesBlock}>
          <li onClick={() => setCategory(null)} className={classes.category}>
            {parseText(cookies, 'Все', 'Всі')}
          </li>
        </div>
      </div> */}
    </div>
  );
};

export default CategoriesList;
