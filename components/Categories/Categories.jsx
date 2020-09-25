import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  setFiltersInCookies,
  createCleanUrl,
  parseText,
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './Categories.scss';

const Categories = ({
  arrSubCategories,
  classNameWrapper,
  router,
  pathname,
  stock,
}) => {
  const changeClassForLink = item => cx(styles.dropButton, {
    [styles.dropButtonWithoutChildren]: !item.subcategory.length,
    [styles.dropButtonCategory]: +router.query.categories === item.id,
  });

  const changeClassForSelect = item => cx(styles.select, {
    [styles.selectWithoutChildren]: !item.subcategory.length,
    [styles.selectWithStock]: stock,
  });

  return (
    <ul
      className={cx(styles.categories, classNameWrapper)}
      uk-accordion="multiple: true"
    >
      {arrSubCategories.map(item => (
        <li key={item.id} className={changeClassForSelect(item)}>
          <button
            className={`${changeClassForLink(item)} uk-accordion-title`}
            onClick={(e) => {
              e.target.classList.toggle(styles.selectLinkClick);
            }}
            type="button"
          >
            <a
              href="/"
              className={styles.selectLink}
              onClick={(e) => {
                e.preventDefault();
                if (item.priority) {
                  cookies.remove('filters');
                  setFiltersInCookies(cookies, {
                    ...cookies.get('filters'),
                    categories: [
                      {
                        id: item.id,
                        name: item.slug,
                        categoryName: parseText(
                          cookies,
                          item.name,
                          item.name_ua,
                        ),
                      },
                    ],
                    page: 1,
                  });
                  router.push(
                    {
                      pathname,
                      query: router.query,
                    },
                    `${pathname}/${item.slug}`,
                  );
                } else {
                  setFiltersInCookies(cookies, {
                    ...cookies.get('filters'),
                    categories: [
                      ...(cookies.get('filters').categories || []),
                      {
                        id: item.id,
                        name: item.slug,
                        categoryName: parseText(
                          cookies,
                          item.name,
                          item.name_ua,
                        ),
                      },
                    ],
                    page: 1,
                  });
                  router.push(
                    {
                      pathname,
                      query: router.query,
                    },
                    `${pathname}/${createCleanUrl(cookies).join('/')}`,
                  );
                }
              }}
            >
              {parseText(cookies, item.name, item.name_ua)}
              {((router.asPath.indexOf('/Products') !== -1
                || router.asPath.indexOf('/Blog') !== -1
                || router.asPath.indexOf('/Brands/') !== -1) && (
                <span className={styles.count}>
                  {item.subcategory.length > 0
                    ? `(${item.count_goods})`
                    : item.count_goods}
                </span>
              ))
                || (router.asPath.indexOf('/gift-backets') !== -1 && (
                  <span className={styles.count}>
                    {item.subcategory.length > 0
                      ? `(${item.count_presents})`
                      : item.count_presents}
                  </span>
                ))
                || (router.asPath.indexOf('/stock') !== -1 && (
                  <span className={styles.count}>
                    {item.subcategory.length > 0
                      ? `(${item.count_actions || item.count_stok_goods || 0})`
                      : item.count_actions}
                  </span>
                ))}
            </a>
          </button>
          <div className="uk-accordion-content">
            {item.subcategory.length > 0 ? (
              <Categories
                arrSubCategories={item.subcategory}
                router={router}
                pathname={pathname}
              />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

Categories.propTypes = {
  arrSubCategories: PropTypes.array,
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  stock: PropTypes.bool,
};

export default Categories;
