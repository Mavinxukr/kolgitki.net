import React from 'react';
import StokSubcategoriesItem from '../StokSubcategoriesItem/StokSubcategoriesItem';
import classes from './StokCategoriesItem.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const StokCategoriesItem = React.memo(({ filterUpdate, category }) => {
  const [open, setOpen] = React.useState(false);
  const clickHandle = () => {
    console.log([category.id]);
    filterUpdate(prev => ({
      ...prev,
      categories: JSON.stringify([category.id])
    }));
  };

  return (
    <>
      <div className={classes.block}>
        <li onClick={() => clickHandle()} className={classes.category}>
          {category.name}
        </li>
        {category.subcategory ? (
          open ? (
            <AiOutlineMinus onClick={() => setOpen(prev => !prev)} />
          ) : (
            <AiOutlinePlus onClick={() => setOpen(prev => !prev)} />
          )
        ) : null}
      </div>
      {open && category.subcategory
        ? category.subcategory.map(subcategory => {
            return (
              <StokSubcategoriesItem
                filterUpdate={filterUpdate}
                key={subcategory.id}
                subcategory={subcategory}
              />
            );
          })
        : null}
    </>
  );
});

export default StokCategoriesItem;
