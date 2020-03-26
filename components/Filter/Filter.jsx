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

const getNameForField = (item, router) => {
  if (item.name && item.img_link) {
    return addOfDeleteElem(router, item.id, 'colors');
  }
  if (item.name && !item.img_link) {
    return addOfDeleteElem(router, item.id, 'brands');
  }
  if (item.value) {
    return addOfDeleteElem(router, item.value, 'attribute');
  }
  if (item.size) {
    return addOfDeleteElem(router, item.id, 'sizes');
  }
};

const definiteArray = (router, item) => {
  if (item.name && item.img_link) {
    return (
      (typeof router.query.colors === 'string' && [router.query.colors])
      || Array.isArray(router.query.colors) && router.query.colors
      || []
    );
  }
  if (item.name && !item.img_link) {
    return (
      (typeof router.query.brands === 'string' && [router.query.brands])
      || Array.isArray(router.query.brands) && router.query.brands
      || []
    );
  }
  if (item.value) {
    return (
      (typeof router.query.attribute === 'string' && [
        router.query.attribute,
      ])
      || Array.isArray(router.query.attribute) && router.query.attribute
      || []
    );
  }
  if (item.size) {
    return (
      (typeof router.query.sizes === 'string' && [router.query.sizes])
      || Array.isArray(router.query.sizes) && router.query.sizes
      || []
    );
  }
};

const Filter = ({
  title,
  arrSelects,
  id,
  classNameWrapper,
  pathname,
  router,
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
                    ...getNameForField(item, router),
                  },
                });
              }}
              checked={definiteArray(router, item).some(
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
};

export default Filter;
