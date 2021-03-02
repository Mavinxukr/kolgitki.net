import React from 'react';
import classes from './SubcategoriesItem.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import _ from 'lodash';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const SubcategoriesItem = React.memo(
  ({ subcategory, filters, setCategoryInFilters, sale, present, products }) => {
    const [open, setOpen] = React.useState(false);
    const [itemClassList, setItemClassesList] = React.useState([
      classes.subcategory
    ]);

    React.useEffect(() => {
      if (filters.hasOwnProperty('categories')) {
        if (JSON.parse(filters.categories)[0].id === subcategory.id) {
          setItemClassesList(prev => [...prev, classes.active]);
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
      if (filters.hasOwnProperty('category_id')) {
        if (filters.category_id.id === subcategory.id) {
          setItemClassesList(prev => [...prev, classes.active]);
          setOpen(true);
        }
        if (subcategory.subcategory.length > 0) {
          if (search(subcategory.subcategory, filters.category_id)) {
            setOpen(true);
          }
        }
      }
    }, []);

    const search = (array, pattern) => {
      let answer = false;
      answer = array.some(item => {
        if (item.id === pattern.id) {
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
      setItemClassesList(prev => [...prev, classes.active]);
      setOpen(true);
      setCategoryInFilters(subcategory);
    };
    if (
      subcategory.count_goods > 0 ||
      subcategory.count_stok_goods > 0 ||
      subcategory.count_presents > 0
    ) {
      return (
        <ul className={classes.list}>
          <div className={classes.block}>
            <div className={classes.subcategoriesBlock}>
              <li
                onClick={() => clickHandle()}
                className={itemClassList.join(' ')}
              >
                {parseText(cookies, subcategory.name, subcategory.name_ua)}
              </li>
              {products && subcategory.count_goods && (
                <li
                  className={classes.counter}
                >{`(${subcategory.count_goods})`}</li>
              )}
              {sale && subcategory.count_stok_goods && (
                <li
                  className={classes.counter}
                >{`(${subcategory.count_stok_goods})`}</li>
              )}
              {present && subcategory.count_presents && (
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
                      products={products}
                    />
                  );
                })
              : null}
          </div>
        </ul>
      );
    } else {
      return null;
    }
  }
);

export default SubcategoriesItem;
