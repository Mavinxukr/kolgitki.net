import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import { getAllFilters } from '../../services/home';
import styles from './FilterIndicators.scss';

const getValues = (filters, router, key, index) => filters[index][key]
  .map(
    item => (typeof router.query[key] === 'string'
          && item.id === +router.query[key] && {
      type: key,
      name: item.name || item.size,
      id: item.id,
    })
        || (Array.isArray(router.query[key])
          && router.query[key].some(itemChild => +itemChild === item.id) && {
          type: key,
          name: item.name || item.size,
          id: item.id,
        }),
  )
  .filter(item => item);

const definiteElem = (findItem, filters, router) => {
  const arr = [
    { name: 'colors', index: 0 },
    { name: 'brands', index: 0 },
    { name: 'sizes', index: 3 },
    { name: 'tags', index: 2 },
  ];
  const findIdItem = arr.find(item => item.name === findItem);
  if (findIdItem) {
    return getValues(filters, router, findIdItem.name, findIdItem.index);
  }
  if (Array.isArray(router.query[findItem])) {
    return router.query[findItem].map(item => ({ type: findItem, name: item }));
  }
  if (typeof router.query[findItem] === 'string') {
    return { type: findItem, name: router.query[findItem] };
  }
};

const definiteOfField = (key, filters, router) => {
  const arrFields = ['colors', 'brands', 'attribute', 'sizes', 'tags'];
  const findElem = arrFields.find(item => item === key);
  return definiteElem(findElem, filters, router);
};

const addElemToArray = (elem, arr) => {
  if (Array.isArray(elem)) {
    arr.push(...elem);
  }
  if (!Array.isArray(elem) && elem) {
    arr.push(elem);
  }
};

const getArrOfFilters = (router, filters) => {
  const arr = [];
  _.forIn(router.query, (value, key) => {
    addElemToArray(definiteOfField(key, filters, router), arr);
  });
  return arr;
};

const addOfDeleteElem = (router, elem) => {
  if (typeof router.query[elem.type] === 'string') {
    delete router.query[elem.type];
    return;
  }
  return {
    [elem.type]: router.query[elem.type].filter(
      item => item !== elem.name && item !== `${elem.id}`,
    ),
  };
};

const deleteFilter = (router, elem, pathname) => {
  router.push({
    pathname,
    query: {
      ...router.query,
      ...addOfDeleteElem(router, elem),
    },
  });
};

const FilterIndicators = ({
  buttonValue,
  classNameWrapper,
  router,
  pathname,
}) => {
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    getAllFilters({
      category_id: router.query.categories || 0,
    }).then(response => setFilters(response.data));
  }, [router.query]);

  return (
    <div className={cx(styles.indicators, classNameWrapper)}>
      <div className={styles.indicatorsButtons}>
        <button
          className={styles.indicatorsDeleteButton}
          type="button"
          onClick={() => {
            delete router.query.colors;
            delete router.query.sizes;
            delete router.query.brands;
            delete router.query.attribute;
            delete router.query.tags;
            router.push({
              pathname,
              query: {
                ...router.query,
              },
            });
          }}
        >
          {buttonValue}
        </button>
        {filters && getArrOfFilters(router, filters).map((item, index) => (
          <div className={styles.indicatorsItem}>
            {item.name}
            <button
              key={index}
              className={styles.indicatorsButtonItem}
              type="button"
              onClick={() => deleteFilter(router, item, pathname)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

FilterIndicators.propTypes = {
  buttonValue: PropTypes.string,
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
};

export default FilterIndicators;
