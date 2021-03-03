import React from 'react';
import SubcategoriesItem from '../SubcategoriesItem/SubcategoriesItem';
import classes from './CategoriesItem.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const CategoriesItem = React.memo(
  ({ category, filters, setCategoryInFilters, sale, present, products }) => {
    const [open, setOpen] = React.useState(false);
    const [itemClassList, setItemClassesList] = React.useState([
      classes.category
    ]);

    React.useEffect(() => {
      if (filters.hasOwnProperty('categories')) {
        if (JSON.parse(filters.categories)[0].id === category.id) {
          setItemClassesList(prev => [...prev, classes.active]);
          setOpen(true);
        }
        if (category.subcategory.length > 0) {
          if (search(category.subcategory, JSON.parse(filters.categories)[0])) {
            setOpen(true);
          }
        }
      }
      if (filters.hasOwnProperty('category_id')) {
        if (filters.category_id.id === category.id) {
          setItemClassesList(prev => [...prev, classes.active]);
          setOpen(true);
        }
        if (category.subcategory.length > 0) {
          if (search(category.subcategory, filters.category_id)) {
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
      setCategoryInFilters(category);
    };

    return (
      <>
        <div className={classes.block}>
          <div className={classes.categoriesBlock}>
            <li onClick={clickHandle} className={itemClassList.join(' ')}>
              {parseText(cookies, category.name, category.name_ua)}
            </li>
            {products && category.count_goods > 0 && (
              <li className={classes.counter}>{`(${category.count_goods})`}</li>
            )}
            {sale && category.count_stok_goods && (
              <li
                className={classes.counter}
              >{`(${category.count_stok_goods})`}</li>
            )}
            {present && category.count_presents && (
              <li
                className={classes.counter}
              >{`(${category.count_presents})`}</li>
            )}

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
                  <SubcategoriesItem
                    key={subcategory.id}
                    subcategory={subcategory}
                    setCategoryInFilters={setCategoryInFilters}
                    filters={filters}
                    sale={sale}
                    present={present}
                    products={products}
                  />
                );
              })
            : null}
        </div>
      </>
    );
  }
);

export default CategoriesItem;
