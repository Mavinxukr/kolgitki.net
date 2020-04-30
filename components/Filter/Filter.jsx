import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Accordion from '../Accordion/Accordion';
import { withResponse } from '../hoc/withResponse';
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

const getArrForChecked = (key, router) => (typeof router.query[key] === 'string' && [router.query[key]])
  || (Array.isArray(router.query[key]) && router.query[key])
  || [];

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

const SubFilters = ({
  arrSelects, router, pathname, categoryName, isDesktopScreen, isGifts,
}) => (
  <ul className={cx(styles.dropDownList, { [styles.dropDownListMobile]: !isDesktopScreen && isGifts })}>
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
                page: 1,
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
          className={cx(styles.dropDownController, {
            [styles.dropDownControllerForGift]: isGifts && !isDesktopScreen,
          })}
        >
          {item.img_link ? (
            <span
              className={styles.colorBlock}
              style={{
                background: item.hex ? `${item.hex}` : `url(${item.img_link})`,
              }}
            />
          ) : null}
          {item.name || item.value || item.size}
        </label>
      </li>
    ))}
  </ul>
);

const Filter = ({
  title,
  arrSelects,
  id,
  classNameWrapper,
  pathname,
  router,
  categoryName,
  isDesktopScreen,
  isGifts,
}) => (
  <>
    {(isDesktopScreen && (
      <div className={cx(styles.filter, classNameWrapper)}>
        <input className={styles.field} type="checkbox" id={id} />
        <label className={styles.paramController} htmlFor={id}>
          {title}
        </label>
        <div className={styles.dropDownListWrapper}>
          <SubFilters
            router={router}
            pathname={pathname}
            categoryName={categoryName}
            arrSelects={arrSelects}
          />
        </div>
      </div>
    )) || (
      <ul className={styles.accordion} uk-accordion="multiple: true">
        <Accordion title={title} isMobileFilterGiftBackets isFooterNav>
          <SubFilters
            router={router}
            pathname={pathname}
            categoryName={categoryName}
            arrSelects={arrSelects}
            isDesktopScreen={isDesktopScreen}
            isGifts={isGifts}
          />
        </Accordion>
      </ul>
    )}
  </>
);

SubFilters.propTypes = {
  arrSelects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string,
      img_link: PropTypes.string,
    }),
  ),
  router: PropTypes.shape({
    query: PropTypes.object,
    push: PropTypes.func,
  }),
  pathname: PropTypes.string,
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isGifts: PropTypes.bool,
};

Filter.propTypes = {
  title: PropTypes.string,
  arrSelects: PropTypes.array,
  id: PropTypes.string,
  classNameWrapper: PropTypes.string,
  pathname: PropTypes.string,
  router: PropTypes.object,
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.string,
  isGifts: PropTypes.bool,
};

export default withResponse(Filter);
