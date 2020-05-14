import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import uniqid from 'uniqid';
import Accordion from '../Accordion/Accordion';
import {
  createCleanUrl,
  setFiltersInCookies,
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';
import styles from './Filter.scss';

const addOrDeleteElem = (filters, categoryName, item) => {
  if (!filters || !filters[categoryName]) {
    return [item];
  }

  const findElem =
    Array.isArray(filters[categoryName])
    && filters[categoryName].find(
      filterItem => filterItem.id === item.id || filterItem.name === item.name,
    );

  if (findElem) {
    return filters[categoryName].filter(
      filterItem => filterItem.id !== findElem.id || filterItem.name !== findElem.name,
    );
  }

  if (filters[categoryName]) {
    return [...filters[categoryName], item];
  }
};

const setElementsForFilters = (item, categoryName, cookie) => {
  const filters = cookie.get('filters');
  const newObj = {
    id: item.id || uniqid(),
    name: item.name || item.value || item.size,
  };
  setFiltersInCookies(cookie, {
    ...filters,
    [categoryName]: addOrDeleteElem(filters, categoryName, newObj),
  });
};

const SubFilters = ({
  arrSelects,
  router,
  pathname,
  categoryName,
  isDesktopScreen,
  isGifts,
  children,
}) => (
  <ul
    className={cx(styles.dropDownList, {
      [styles.dropDownListMobile]: !isDesktopScreen && isGifts,
    })}
  >
    {(arrSelects
      && arrSelects.map((item, index) => {
        const filters = cookies.get('filters');
        return (
          <li className={styles.dropDownItem} key={item.id || index}>
            <input
              type="checkbox"
              id={item.value || item.name || item.size}
              className={styles.field}
              onChange={() => {
                setElementsForFilters(item, categoryName, cookies);
                router.push({
                  pathname,
                  query: router.query,
                }, `${pathname}_${createCleanUrl(cookies).join('_')}`);
              }}
              checked={
                filters && filters[categoryName]
                && filters[categoryName].some(
                  itemChild => itemChild.id === item.id
                    || itemChild.name === item.value,
                )
              }
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
        );
      }))
      || children}
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
  children,
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
          >
            {children}
          </SubFilters>
        </div>
      </div>
    )) || (
      <ul className={styles.accordion} uk-accordion="multiple: true">
        <Accordion
          title={title}
          isMobileFilterGiftBackets={isGifts}
          isFooterNav
        >
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
  children: PropTypes.node,
};

Filter.propTypes = {
  title: PropTypes.string,
  arrSelects: PropTypes.array,
  id: PropTypes.string,
  classNameWrapper: PropTypes.string,
  pathname: PropTypes.string,
  router: PropTypes.object,
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isGifts: PropTypes.bool,
  children: PropTypes.node,
};

export default withResponse(Filter);
