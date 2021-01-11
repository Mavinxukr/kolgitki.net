import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import uniqid from 'uniqid';
import { useMediaQuery } from 'react-responsive';
import Accordion from '../Accordion/Accordion';
import {
  createCleanUrl,
  setFiltersInCookies,
  parseText,
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
    && filters[categoryName].find(filterItem => filterItem.name === item.name);

  if (findElem) {
    return filters[categoryName].filter(
      filterItem => filterItem.name !== findElem.name,
    );
  }

  if (filters[categoryName]) {
    return [...filters[categoryName], item];
  }
};

const definiteOfNewObj = (item, categoryName) => {
  if (categoryName === 'tags') {
    return {
      id: item.id || uniqid(),
      name: item.slug,
      nameSpec: item.name || item.value,
    };
  }
  return {
    id: item.id || uniqid(),
    name: item.slug || item.name || item.value || item.size,
    nameSpec: item.name || item.value,
  };
};

const setElementsForFilters = (item, categoryName, cookie) => {
  const filters = cookie.get('filters');
  setFiltersInCookies(cookie, {
    ...filters,
    [categoryName]: addOrDeleteElem(
      filters,
      categoryName,
      definiteOfNewObj(item, categoryName),
    ),
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
  classNameAdditional,
}) => {
  const getAppropriateLabel = item => parseText(
    cookies,
    item.value || item.name || item.size,
    item.value_uk || item.name_ua,
  );

  return (
    <ul
      className={cx(cx(styles.dropDownList, classNameAdditional), {
        [styles.dropDownListMobile]: !isDesktopScreen && isGifts,
      })}
    >
      {(arrSelects
        && arrSelects.map((item, index) => {
          const filters = cookies.get('filters');
          const [filterChecked, setFilterChecked] = useState(
            (filters
              && filters[categoryName]
              && filters[categoryName].some(
                itemChild => itemChild.id === item.id || itemChild.name === item.value,
              ))
              || false,
          );

          return (
            <li className={styles.dropDownItem} key={item.id || index}>
              <input
                type="checkbox"
                id={getAppropriateLabel(item)}
                className={styles.field}
                onChange={() => {
                  setElementsForFilters(item, categoryName, cookies);
                  setFilterChecked(!filterChecked);
                  if (isGifts) {
                    router.push(
                      {
                        pathname,
                        query: router.query,
                      },
                      `${pathname}/${createCleanUrl(cookies).join('/')}`,
                    );
                  }

                  if (window.innerWidth > 768) {
                    router.push(
                      {
                        pathname,
                        query: router.query,
                      },
                      `${pathname}/${createCleanUrl(cookies).join('/')}`,
                    );
                  }
                }}
                checked={filterChecked}
              />
              <label
                htmlFor={getAppropriateLabel(item)}
                className={cx(styles.dropDownController, {
                  [styles.dropDownControllerForGift]:
                    isGifts && !isDesktopScreen,
                })}
              >
                {item.img_link ? (
                  <span
                    className={cx(styles.colorBlock, {
                      [styles.withBorder]: item.name === 'White',
                    })}
                    style={{
                      background: item.hex
                        ? `${item.hex}`
                        : `url(${item.img_link})`,
                    }}
                  />
                ) : null}
                {getAppropriateLabel(item)}
              </label>
            </li>
          );
        }))
        || children}
    </ul>
  );
};

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
  classNameAdditional,
}) => (
  <>
    {(isDesktopScreen && (
      <div
        className={cx(styles.filter, classNameWrapper, {
          [styles.filterGift]: isGifts,
        })}
      >
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
            classNameAdditional={classNameAdditional}
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
          isFilter
          categoryName={categoryName}
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
      value_uk: PropTypes.string,
      name_ua: PropTypes.string,
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
  classNameAdditional: PropTypes.string,
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
  classNameAdditional: PropTypes.string,
};

export default withResponse(Filter);
