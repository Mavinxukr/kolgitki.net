import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Filter.scss';

const checkOnSimilarStr = (str, elem) => {
  const isExistElem = str === elem;
  return (isExistElem && []) || [str, elem];
};

const checkOnSimilarArr = (arr, elem) => {
  const isExistElem = arr.some(item => item === elem);
  return (isExistElem && arr.filter(item => item !== elem)) || [...arr, elem];
};

const checkField = ({ key, router, elem }) => {
  const newElem = typeof elem === 'number' ? `${elem}` : elem;
  if (!router.query[key]) {
    return [elem];
  }
  if (typeof router.query[key] === 'string') {
    return checkOnSimilarStr(router.query[key], newElem);
  }
  return checkOnSimilarArr(router.query[key], newElem);
};

const addOfDeleteElem = (router, elem, key) => {
  const result = checkField({
    key,
    router,
    elem,
  });
  const obj = {};
  if (Array.isArray(result) && result.length === 0) {
    delete router.query[key];
    return;
  }
  obj[key] = result;
  return obj;
};

const getNameForField = (item, router, categoryName) => {
  switch (categoryName) {
    case 'colors':
      return addOfDeleteElem(router, item.id, 'colors');
    case 'brands':
      return addOfDeleteElem(router, item.id, 'brands');
    case 'attribute':
      return addOfDeleteElem(router, item.value, 'attribute');
    case 'sizes':
      return addOfDeleteElem(router, item.id, 'sizes');
    case 'tags':
      return addOfDeleteElem(router, item.id, 'tags');
    default:
      return {};
  }
};

const getArrForChecked = (key, router) => (
  (typeof router.query[key] === 'string' && [router.query[key]])
  || Array.isArray(router.query[key]) && router.query[key]
  || []
);

const definiteArray = (router, item, categoryName) => {
  switch (categoryName) {
    case 'colors':
      return getArrForChecked('colors', router);
    case 'brands':
      return getArrForChecked('brands', router);
    case 'attribute':
      return getArrForChecked('attribute', router);
    case 'sizes':
      return getArrForChecked('sizes', router);
    case 'tags':
      return getArrForChecked('tags', router);
    default:
      return [];
  }
};

const Filter = ({
  title,
  arrSelects,
  id,
  classNameWrapper,
  pathname,
  router,
  categoryName,
}) => (
  <div className={cx(styles.filter, classNameWrapper)}>
    <input className={styles.field} type="checkbox" id={id} />
    <label className={styles.paramController} htmlFor={id}>
      {title}
    </label>
    <div className={styles.dropDownListWrapper}>
      <ul className={styles.dropDownList}>
        {arrSelects.map((item, index) => (
          <li className={styles.dropDownItem} key={item.id || index}>
            <input
              type="checkbox"
              id={item.value || item.name || item.size}
              className={styles.field}
              onChange={() => {
                router.push({
                  pathname,
                  query: {
                    ...router.query,
                    ...getNameForField(item, router, categoryName),
                  },
                });
              }}
              checked={definiteArray(router, item, categoryName).some(
                itemChild => itemChild === `${item.id}` || itemChild === item.value,
              )}
            />
            <label
              htmlFor={item.value || item.name || item.size}
              className={styles.dropDownController}
            >
              {item.img_link ? (
                <span
                  className={styles.colorBlock}
                  style={{
                    background: item.hex
                      ? `${item.hex}`
                      : `url(${item.img_link})`,
                  }}
                />
              ) : null}
              {item.name || item.value || item.size}
            </label>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Filter.propTypes = {
  title: PropTypes.string,
  arrSelects: PropTypes.array,
  id: PropTypes.string,
  classNameWrapper: PropTypes.string,
  pathname: PropTypes.string,
  router: PropTypes.object,
  categoryName: PropTypes.string,
};

export default Filter;
