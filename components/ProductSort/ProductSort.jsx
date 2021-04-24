import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import { withResponse } from '../hoc/withResponse';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import Accordion from '../Accordion/Accordion';
import styles from './ProductSort.scss';

const ProductSort = ({ setSorting, isDesktopScreen, usedSort }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  // const [sortItemClasses, setSortItemClasses] = useState([]);
  const sortingList = [
    {
      id: 1,
      name: parseText(cookies, 'Популярные', 'Популярні'),
      sort: 'sort_popular',
      value: 'desc'
    },
    {
      id: 2,
      name: parseText(cookies, 'Подороже', 'Подорожче'),
      sort: 'sort_price',
      value: 'desc'
    },
    {
      id: 3,
      name: parseText(cookies, 'Подешевле', 'Дешевше'),
      sort: 'sort_price',
      value: 'asc'
    },
    {
      id: 4,
      name: parseText(cookies, 'Новинки', 'Новинки'),
      sort: 'sort_date',
      value: 'desc'
    }
  ];

  const currentSort = () => {
    if (usedSort.hasOwnProperty('sort_price')) {
      return usedSort.sort_price === 'desc'
        ? parseText(cookies, 'Подороже', 'Подорожче')
        : parseText(cookies, 'Подешевле', 'Дешевше');
    }
    if (usedSort.hasOwnProperty('sort_date')) {
      return parseText(cookies, 'Новинки', 'Новинки');
    }
    return parseText(cookies, 'Популярные', 'Популярні');
  };

  return (
    <div className={styles.sort} onMouseLeave={() => setIsOpenSelect(false)}>
      {(isDesktopScreen && (
        <>
          <div className={styles.sortDesc}>
            {parseText(cookies, 'Сортировать', 'Сортувати')}:
            <button
              type="button"
              className={styles.sortController}
              onMouseOver={() => setIsOpenSelect(true)}
            >
              {currentSort()}
            </button>
            {isOpenSelect && (
              <ul className={styles.sortList}>
                {sortingList.map(item => {
                  return (
                    <li className={styles.sortItem} key={item.id}>
                      <button
                        type="button"
                        className={cx(styles.sortButton, {
                          [styles.active]: currentSort() === item.name
                        })}
                        onClick={() => {
                          if (item.sort === 'sort_popular') {
                            setSorting({});
                          } else {
                            setSorting({ [item.sort]: item.value });
                          }
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )) || (
        <ul className={styles.accordion} uk-accordion="multiple: true">
          <Accordion
            isMobileFilter
            classNameWrapper={styles.accordionWrapper}
            isSortBlock
            title={parseText(cookies, 'Сортировать', 'Сортувати')}
            linkValue={currentSort()}
          >
            {sortingList.map(item => {
              return (
                <button
                  type="button"
                  key={item.id}
                  disabled={currentSort() === item.name}
                  className={cx(styles.accordionButton, {
                    [styles.active]: currentSort() === item.name
                  })}
                  onClick={() => {
                    if (item.sort === 'sort_popular') {
                      setSorting({});
                    } else {
                      setSorting({ [item.sort]: item.value });
                    }
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </Accordion>
        </ul>
      )}
    </div>
  );
};
ProductSort.propTypes = {
  sortHandle: PropTypes.func,
  usedSort: PropTypes.object,
  isDesktopScreen: PropTypes.bool
};

export default withResponse(ProductSort);
