import React from 'react';
import classes from './StokSubcategoriesItem.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import _ from 'lodash';

const StokSubcategoriesItem = React.memo(({ subcategory, filterUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const clickHandle = () => {
    console.log([subcategory.id]);
    filterUpdate(prev => ({
      ...prev,
      categories: JSON.stringify([subcategory.id])
    }));
  };
  return (
    <ul className={classes.list}>
      <div className={classes.block}>
        <li onClick={() => clickHandle()} className={classes.subcategory}>
          {subcategory.name}
        </li>
        {!_.isEmpty(subcategory.subcategory) ? (
          open ? (
            <AiOutlineMinus onClick={() => setOpen(prev => !prev)} />
          ) : (
            <AiOutlinePlus onClick={() => setOpen(prev => !prev)} />
          )
        ) : null}
      </div>
      {open && !_.isEmpty(subcategory.subcategory)
        ? subcategory.subcategory.map(subcategory => {
            return (
              <StokSubcategoriesItem
                filterUpdate={filterUpdate}
                key={subcategory.id}
                subcategory={subcategory}
              />
            );
          })
        : null}
    </ul>
  );
});

export default StokSubcategoriesItem;
