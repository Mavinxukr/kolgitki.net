import React from 'react';
import classes from './SubcategoriesItem.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import _ from 'lodash';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const SubcategoriesItem = React.memo(
  ({ subcategory, filters, setCategoryInFilters, sale, present }) => {
    console.log(subcategory);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      if (filters.hasOwnProperty('categories')) {
        if (filters.categories === JSON.stringify([subcategory.id])) {
          setOpen(true);
        }
        if (subcategory.subcategory.length > 0) {
          if (
            search(subcategory.subcategory, JSON.parse(filters.categories)[0])
          ) {
            setOpen(true);
          }
        }
      }
    }, []);

    const search = (array, pattern) => {
      let answer = false;
      answer = array.some(item => {
        if (item.id === pattern) {
          return item;
        }
        if (item.subcategory.length > 0) {
          if (search(item.subcategory, pattern)) {
            return item;
          }
        }
      });
      return answer;
    };

    const clickHandle = () => {
      setCategoryInFilters(subcategory.id);
    };
    return (
      <ul className={classes.list}>
        <div className={classes.block}>
          <div className={classes.subcategoriesBlock}>
            <li onClick={() => clickHandle()} className={classes.subcategory}>
              {parseText(cookies, subcategory.name, subcategory.name_ua)}
            </li>

            {sale && subcategory.count_stok_goods && (
              <li
                className={classes.counter}
              >{`(${subcategory.count_stok_goods})`}</li>
            )}
            {present &&
              subcategory.count_presents(
                <li
                  className={classes.counter}
                >{`(${subcategory.count_presents})`}</li>
              )}
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
                  <SubcategoriesItem
                    key={subcategory.id}
                    subcategory={subcategory}
                    setCategoryInFilters={setCategoryInFilters}
                    filters={filters}
                    sale={sale}
                  />
                );
              })
            : null}
        </div>
      </ul>
    );
  }
);

export default SubcategoriesItem;
