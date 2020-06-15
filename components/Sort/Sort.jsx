import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withResponse } from '../hoc/withResponse';
import { createCleanUrl, setFiltersInCookies, parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import Accordion from '../Accordion/Accordion';
import styles from './Sort.scss';

const data = [
  {
    id: 1,
    name: parseText(cookies, 'Популярные', 'Популярні'),
    sort: 'sort_popular',
    value: 'desc',
  },
  {
    id: 2,
    name: parseText(cookies, 'Подороже', 'Подорожче'),
    sort: 'sort_price',
    value: 'desc',
  },
  {
    id: 3,
    name: parseText(cookies, 'Подешевле', 'Дешевше'),
    sort: 'sort_price',
    value: 'asc',
  },
  {
    id: 4,
    name: parseText(cookies, 'Новинки', 'Новинки'),
    sort: 'sort_date',
    value: 'desc',
  },
];

const checkOnExistElem = (cookie) => {
  const obj = {};
  const filters = cookie.get('filters');
  if (filters) {
    _.forIn(filters, (value, key) => {
      if (key.indexOf('sort') !== -1) {
        return;
      }
      obj[key] = value;
    });
  }
  return obj;
};

const findSortElem = (cookie) => {
  let elem;
  const filters = cookie.get('filters');
  if (filters) {
    _.forIn(filters, (value, key) => {
      const findIem = data.find(
        item => item.sort === key && item.value === value,
      );
      if (findIem) {
        elem = findIem.name;
      }
    });
  }
  return elem || parseText(cookie, 'Популярные', 'Популярні');
};

const Sort = ({ router, pathname, isDesktopScreen }) => {
  const [selectedSortValue, setSelectedSortValue] = useState('');
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  useEffect(() => {
    setSelectedSortValue(findSortElem(cookies));
  }, [cookies.get('filters')]);

  const handleClickOnSort = (item) => {
    setSelectedSortValue(item.name);
    setFiltersInCookies(cookies, {
      ...checkOnExistElem(cookies),
      page: 1,
      [item.sort]: item.value,
    });
    router.push({
      pathname,
      query: router.query,
    }, `${pathname}_${createCleanUrl(cookies).join('_')}`);
    setIsOpenSelect(false);
  };

  return (
    <div className={styles.sort}>
      {(isDesktopScreen && (
        <>
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
                    onClick={() => handleClickOnSort(item)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )) || (
        <ul className={styles.accordion} uk-accordion="multiple: true">
          <Accordion
            isMobileFilter
            classNameWrapper={styles.accordionWrapper}
            isSortBlock
            title="Сперва"
            linkValue={selectedSortValue}
          >
            {data.map(item => (
              <button
                type="button"
                key={item.id}
                className={styles.accordionButton}
                onClick={() => handleClickOnSort(item)}
              >
                {item.name}
              </button>
            ))}
          </Accordion>
        </ul>
      )}
    </div>
  );
};
Sort.propTypes = {
  router: PropTypes.object,
  pathname: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Sort);
