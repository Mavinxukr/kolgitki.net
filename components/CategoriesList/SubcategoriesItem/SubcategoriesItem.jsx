import React from 'react';
import classes from './SubcategoriesItem.scss';
import { TiPlus, TiMinus } from 'react-icons/ti';
import _ from 'lodash';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const SubcategoriesItem = ({ subcategory, selectedCategory, setLink }) => {
  const [open, setOpen] = React.useState(false);
  const [countClassList, setCountClassesList] = React.useState([
    classes.counter
  ]);

  const subcategoryСounter = list => {
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
    if (selectedCategory) {
      if (selectedCategory.id === subcategory.id) {
        setOpen(true);
      } else {
        setOpen(false);
      }
      if (subcategory.subcategory.length > 0) {
        if (search(subcategory.subcategory, selectedCategory)) {
          setOpen(true);
        }
      } else {
        setOpen(false);
      }
    }

    if (
      _.isEmpty(subcategory.subcategory) ||
      !subcategoryСounter(subcategory.subcategory)
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

  let count = subcategory.count_goods;

  if (count > 0) {
    return (
      <ul className={classes.list}>
        <div className={classes.block}>
          <div className={classes.subcategoriesBlock}>
            <span
              onClick={() => setLink(subcategory.crumbs)}
              className={classes.subcategory}
              title={parseText(cookies, subcategory.name, subcategory.name_ua)}
            >
              {parseText(cookies, subcategory.name, subcategory.name_ua)}
            </span>
            <span className={countClassList.join(' ')}>{`(${count})`}</span>
            {!_.isEmpty(subcategory.subcategory) &&
            subcategoryСounter(subcategory.subcategory) ? (
              open ? (
                <TiMinus onClick={() => setOpen(prev => !prev)} />
              ) : (
                <TiPlus onClick={() => setOpen(prev => !prev)} />
              )
            ) : null}
          </div>

          {open && !_.isEmpty(subcategory.subcategory)
            ? subcategory.subcategory.map(subcategory => {
                return (
                  <SubcategoriesItem
                    key={subcategory.id}
                    subcategory={subcategory}
                    selectedCategory={selectedCategory}
                    setLink={setLink}
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
};

export default SubcategoriesItem;
