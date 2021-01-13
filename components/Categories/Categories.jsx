import React, { useState, useEffect } from 'react';
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
  isMobile,
  setIsOpenSideBar,
  itemIndex = 0,
}) => {
  const [activeItems, setActiveItems] = useState(null);
  const changeClassForLink = item => cx(styles.dropButton, {
    [styles.dropButtonWithoutChildren]:
    !item.subcategory.length && item.level !== 0,
    [styles.dropButtonCategory]: +router.query.categories === item.id,
  });

  const changeClassForSelect = item => cx(styles.select, {
    [styles.selectWithoutChildren]: !item.subcategory.length,
    [styles.selectWithStock]: stock,
  });

  useEffect(() => {
    setActiveItems(cookies.get('filters')?.categories);
  }, [router]);

  return (
    <ul
      className={cx(styles.categories, classNameWrapper)}
      uk-accordion="multiple: false"
    >
      {arrSubCategories.map((item) => {
        item.level = itemIndex;

        return (
          <li
            key={item.id}
            onClick={() => {
              if (isMobile) {
                setTimeout(() => setIsOpenSideBar(false), 1000);
              }
            }}
            className={cx(
              changeClassForSelect(item),
              {
                'uk-open': activeItems && activeItems[itemIndex]?.id === item.id,
              },
              {
                [styles.ukOpen]:
                activeItems && activeItems[itemIndex]?.id === item.id,
              },
              {
                [styles.uk]:
                activeItems && activeItems[itemIndex]?.id !== item.id,
              },
            )}
          >
            <button
              className={`${changeClassForLink(item)} uk-accordion-title`}
              onClick={(e) => {
                if (document.querySelectorAll('.BreadCrumbs_clicked').length) {
                  document
                    .querySelector('.BreadCrumbs_clicked')
                    .classList.remove('BreadCrumbs_clicked');
                }
                if (
                  document.querySelectorAll(`.${styles.selectLinkClick}`).length
                ) {
                  document
                    .querySelector(`.${styles.selectLinkClick}`)
                    .classList.remove(styles.selectLinkClick);
                }
                e.target.classList.toggle(styles.selectLinkClick);
                if (router.asPath.indexOf('/Brands') === 0) {
                  router.push({
                    pathname,
                  });
                  return;
                }
                if (router.pathname === '/stock/[sid]') {
                  router.push({
                    pathname,
                  });
                  return;
                }
                if (router.asPath.indexOf('/Blog') === 0) {
                  router.push({
                    pathname,
                  });
                  return;
                }
                if (item.level === 0) {
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
                  return;
                }
                if (
                  item.level
                  <= cookies.get('filters')?.categories?.length - 1
                ) {
                  setFiltersInCookies(cookies, {
                    ...cookies.get('filters'),
                    categories: [
                      ...(cookies
                        .get('filters')
                        .categories.splice(0, itemIndex) || []),
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
                  return;
                }
                setFiltersInCookies(cookies, {
                  ...cookies.get('filters'),
                  categories: [
                    ...(cookies.get('filters').categories || []),
                    {
                      id: item.id,
                      name: item.slug,
                      categoryName: parseText(cookies, item.name, item.name_ua),
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
              }}
              type="button"
            >
              <a
                href="/"
                className={styles.selectLink}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {parseText(cookies, item.name, item.name_ua)}
                {((router.asPath.indexOf('/Products') !== -1
                  || router.asPath.indexOf('/Blog') !== -1
                  || router.asPath.indexOf('/Brands/') !== -1) && (
                  <span className={styles.count}>
                    {item.level !== 0 && `(${item.count_goods})`}
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
                        ? `(${item.count_actions
                        || item.count_stok_goods
                        || 0})`
                        : item.count_actions}
                    </span>
                ))}
              </a>
            </button>
            <ul className="uk-accordion-content">
              {item.subcategory.length > 0 ? (
                <Categories
                  arrSubCategories={item.subcategory}
                  itemIndex={itemIndex + 1}
                  router={router}
                  pathname={pathname}
                />
              ) : null}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

Categories.propTypes = {
  arrSubCategories: PropTypes.array,
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  setIsOpenSideBar: PropTypes.func,
  pathname: PropTypes.string,
  stock: PropTypes.bool,
  isMobile: PropTypes.bool,
  itemIndex: PropTypes.number,
};

export default Categories;
