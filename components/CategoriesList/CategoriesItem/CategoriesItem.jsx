import React from 'react';
import SubcategoriesItem from '../SubcategoriesItem/SubcategoriesItem';
import classes from './CategoriesItem.scss';
import { TiPlus, TiMinus } from 'react-icons/ti';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import _ from 'lodash';

const CategoriesItem = ({
  selectedCategory,
  setLink,
  category,
  isGift,
  isSale,
  isStock
}) => {
  let count_name = 'goods_count';
  if (isGift) {
    count_name = 'presents_count';
  }
  if (isSale) {
    count_name = 'count_actions';
  }
  if (isStock) {
    count_name = 'count_stok_goods';
  }
  const [open, setOpen] = React.useState(false);
  const [countClassList, setCountClassesList] = React.useState([
    classes.counter
  ]);

  const categoryСounter = list => {
    const counter = list.reduce((total, item) => {
      let answer = total;

      answer += item[count_name];

      return answer;
    }, 0);
    return counter;
  };

  React.useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory.id === category.id) {
        setOpen(true);
      } else {
        setOpen(false);
      }
      if (
        category.hasOwnProperty('subcategory') &&
        category.subcategory.length > 0
      ) {
        if (search(category.subcategory, selectedCategory)) {
          setOpen(true);
        }
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }

    if (
      !category.hasOwnProperty('subcategory') ||
      !categoryСounter(category.subcategory)
    ) {
      setCountClassesList(prev => [...prev, classes.rightFix]);
    }
  }, [selectedCategory]);

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
  let count = category[count_name];

  if (count > 0) {
    return (
      <>
        <div className={classes.block}>
          <div className={classes.categoriesBlock}>
            <span
              onClick={() => setLink(category)}
              className={classes.category}
            >
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
                    selectedCategory={selectedCategory}
                    setLink={setLink}
                    isGift={isGift}
                    isSale={isSale}
                    isStock={isStock}
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
};

export default CategoriesItem;
