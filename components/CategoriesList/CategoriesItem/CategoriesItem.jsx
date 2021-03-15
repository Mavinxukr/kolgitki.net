import React from 'react';
import SubcategoriesItem from '../SubcategoriesItem/SubcategoriesItem';
import classes from './CategoriesItem.scss';
import { TiPlus, TiMinus } from 'react-icons/ti';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { useRouter } from 'next/router';

const CategoriesItem = React.memo(
  ({
    path,
    category,
    filters,
    setCategoryInFilters,
    isProducts,
    isSale,
    isPresent,
    isActions
  }) => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const [countClassList, setCountClassesList] = React.useState([
      classes.counter
    ]);

    const categoryСounter = list => {
      const counter = list.reduce((total, item) => {
        let answer = total;
        if (item.count_goods) {
          answer += item.count_goods;
        }
        if (item.count_stok_goods) {
          answer += item.count_stok_goods;
        }
        if (item.count_presents) {
          answer += item.count_presents;
        }
        return answer;
      }, 0);
      return counter;
    };

    React.useEffect(() => {
      if (filters.hasOwnProperty('categories')) {
        if (JSON.parse(filters.categories)[0].id === category.id) {
          setOpen(true);
        } else {
          setOpen(false);
        }
        if (
          category.hasOwnProperty('subcategory') &&
          category.subcategory.length > 0
        ) {
          if (search(category.subcategory, JSON.parse(filters.categories)[0])) {
            setOpen(true);
          }
        } else {
          setOpen(false);
        }
      }
      if (filters.hasOwnProperty('category_id')) {
        if (filters.category_id.id === category.id) {
          setOpen(true);
        } else {
          setOpen(false);
        }
        if (category.subcategory.length > 0) {
          if (search(category.subcategory, filters.category_id)) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }
      }
      if (
        !category.hasOwnProperty('subcategory') ||
        !categoryСounter(category.subcategory)
      ) {
        setCountClassesList(prev => [...prev, classes.rightFix]);
      }
    }, [filters]);

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
    let count = 0;

    switch (true) {
      case isPresent:
        count = category.count_presents;
        break;
      case isProducts:
        count = category.count_goods;
        break;
      case isSale:
        count = category.count_stok_goods;
        break;
      case isActions:
        count = category.count_actions;
        break;
    }
    const clickHandle = () => {
      path && router.push(`${path}/${category.crumbs}`);
      setCategoryInFilters(category);
    };

    if (count > 0) {
      return (
        <>
          <div className={classes.block}>
            <div className={classes.categoriesBlock}>
              <span onClick={clickHandle} className={classes.category}>
                {parseText(cookies, category.name, category.name_ua)}
              </span>
              <span className={countClassList.join(' ')}>{`(${count})`}</span>
              {!_.isEmpty(category.subcategory) &&
              categoryСounter(category.subcategory) ? (
                open ? (
                  <TiMinus onClick={() => setOpen(prev => !prev)} />
                ) : (
                  <TiPlus onClick={() => setOpen(prev => !prev)} />
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
                      path={path}
                      isProducts={isProducts}
                      isSale={isSale}
                      isPresent={isPresent}
                      isActions={isActions}
                    />
                  );
                })
              : null}
          </div>
        </>
      );
    } else {
      return null;
    }
  }
);

export default CategoriesItem;
