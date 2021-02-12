import React from 'react';
import StokCategoriesItem from './StokCategoriesItem/StokCategoriesItem';

import classes from './StokCategories.scss';

const StockCategories = React.memo(({ filterUpdate, categories }) => {
  return (
    <div className={classes.block}>
      {categories.map(category => (
        <StokCategoriesItem
          filterUpdate={filterUpdate}
          key={category.id}
          category={category}
        ></StokCategoriesItem>
      ))}
    </div>
  );
});

export default StockCategories;
