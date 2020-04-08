import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Sort.scss';

const data = [
  {
    id: 1,
    name: 'Популярные',
    sort: 'sort_popular',
    value: 'desc',
  },
  {
    id: 2,
    name: 'Подороже',
    sort: 'sort_price',
    value: 'desc',
  },
  {
    id: 3,
    name: 'Подешевле',
    sort: 'sort_price',
    value: 'asc',
  },
  {
    id: 4,
    name: 'Новинки',
    sort: 'sort_date',
    value: 'desc',
  },
];

const checkOnExistElem = (router) => {
  const obj = {};
  _.forIn(router.query, (value, key) => {
    if (key.indexOf('sort') !== -1) {
      return;
    }
    obj[key] = value;
  });
  return obj;
};

const findSortElem = (router) => {
  let elem;
  _.forIn(router.query, (value, key) => {
    const findIem = data.find(
      item => item.sort === key && item.value === value,
    );
    if (findIem) {
      elem = findIem.name;
    }
  });
  return elem || 'Популярные';
};

const Sort = ({ router, pathname }) => {
  const [selectedSortValue, setSelectedSortValue] = useState(
    findSortElem(router),
  );
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  useEffect(() => {
    setSelectedSortValue(findSortElem(router));
  }, [router.query]);

  return (
    <div className={styles.sort}>
      <div className={styles.sortDesc}>
        Сперва:{' '}
        <button
          type="button"
          className={styles.sortController}
          onClick={() => setIsOpenSelect(true)}
        >
          {selectedSortValue}
        </button>
      </div>
      {isOpenSelect && (
        <ul className={styles.sortList}>
          {data.map(item => (
            <li className={styles.sortItem} key={item.id}>
              <button
                type="button"
                className={styles.sortButton}
                onClick={() => {
                  setSelectedSortValue(item.name);
                  router.push({
                    pathname,
                    query: {
                      ...checkOnExistElem(router, item.sort),
                      page: 1,
                      [item.sort]: item.value,
                    },
                  });
                  setIsOpenSelect(false);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
Sort.propTypes = {
  router: PropTypes.object,
  pathname: PropTypes.string,
};

export default Sort;
