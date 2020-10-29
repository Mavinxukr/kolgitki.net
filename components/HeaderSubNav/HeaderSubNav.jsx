import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  setFiltersInCookies,
  parseText,
  createCleanUrl,
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './HeaderSubNav.scss';

const HeaderSubNav = ({
  subNav, classNameWrapper, router, activeMenu,
}) => {
  const [src, setSrc] = useState('');
  const [subNavItem, setSubNavItem] = useState(null);
  const [subNavItemChild, setSubNavItemChild] = useState(null);
  const [subNavItemSubChild, setSubNavItemSubChild] = useState(null);

  return (
    <>
      {subNav && (
        <div className={cx(styles.menu, classNameWrapper)}>
          <ul className={styles.mainProductsList}>
            {subNav.subcategory.map((item) => {
              const classNameForLink = cx(styles.mainProductsLink);

              const classNameForList = cx(styles.subProductsList);

              return (
                <li className={styles.mainProductsItem} key={item.id}>
                  <a
                    onMouseOver={() => {
                      setSrc(item.image_link);
                      setSubNavItem({
                        id: item.id,
                        name: item.slug,
                        categoryName: parseText(
                          cookies,
                          item.name,
                          item.name_ua,
                        ),
                      });
                    }}
                    onFocus={() => {
                      setSrc(item.image_link);
                    }}
                    className={classNameForLink}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setFiltersInCookies(cookies, {
                        categories: [activeMenu, subNavItem],
                      });
                      router.push(
                        '/Products',
                        `/Products/${createCleanUrl(cookies).join('/')}`,
                      );
                      if (router.pathname.indexOf('/Products') !== -1) {
                        setTimeout(() => window.location.reload(), 2000);
                      }
                    }}
                  >
                    {item.name}
                  </a>
                  <ul className={classNameForList}>
                    {item.subcategory.map(itemChild => (
                      <li className={styles.subProductsItem} key={itemChild.id}>
                        <div className={styles.subProductsInfo}>
                          <p className={styles.subProductsInfoText}>
                            <a
                              href="/"
                              onMouseOver={() => {
                                setSrc(itemChild.image_link);
                                setSubNavItemChild({
                                  id: itemChild.id,
                                  name: itemChild.slug,
                                  categoryName: parseText(
                                    cookies,
                                    itemChild.name,
                                    itemChild.name_ua,
                                  ),
                                });
                              }}
                              onFocus={() => setSrc(itemChild.image_link)}
                              onClick={(e) => {
                                e.preventDefault();
                                setFiltersInCookies(cookies, {
                                  categories: [
                                    activeMenu,
                                    subNavItem,
                                    subNavItemChild,
                                  ],
                                });
                                router.push(
                                  '/Products',
                                  `/Products/${createCleanUrl(cookies).join(
                                    '/',
                                  )}`,
                                );
                                if (
                                  router.pathname.indexOf('/Products') !== -1
                                ) {
                                  setTimeout(
                                    () => window.location.reload(),
                                    1000,
                                  );
                                }
                              }}
                            >
                              {itemChild.name}
                            </a>
                          </p>
                        </div>
                        <ul className={styles.subChildList}>
                          {itemChild.subcategory.map(itemSubChild => (
                            <li
                              className={styles.subChildItem}
                              key={itemSubChild.id}
                            >
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFiltersInCookies(cookies, {
                                    categories: [
                                      activeMenu,
                                      subNavItem,
                                      subNavItemChild,
                                      subNavItemSubChild,
                                    ],
                                  });
                                  router.push(
                                    '/Products',
                                    `/Products/${createCleanUrl(cookies).join(
                                      '/',
                                    )}`,
                                  );
                                  if (
                                    router.pathname.indexOf('/Products') !== -1
                                  ) {
                                    setTimeout(
                                      () => window.location.reload(),
                                      1000,
                                    );
                                  }
                                }}
                                onMouseOver={() => {
                                  setSrc(itemSubChild.image_link);
                                  setSubNavItemSubChild({
                                    id: itemSubChild.id,
                                    name: itemSubChild.slug,
                                    categoryName: parseText(
                                      cookies,
                                      itemSubChild.name,
                                      itemSubChild.name_ua,
                                    ),
                                  });
                                }}
                                onFocus={() => setSrc(itemSubChild.image_link)}
                                className={styles.subChildLink}
                                href="/"
                              >
                                {itemSubChild.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                    <li className={styles.subChildItem}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setFiltersInCookies(cookies, {
                            categories: [activeMenu, subNavItem],
                          });
                          router.push(
                            '/Products',
                            `/Products/${createCleanUrl(cookies).join('/')}`,
                          );
                          if (router.pathname.indexOf('/Products') !== -1) {
                            setTimeout(() => window.location.reload(), 2000);
                          }
                        }}
                        style={{ color: '#f04950' }}
                      >
                        {parseText(cookies, 'Все категории', 'Всі категорії')}
                      </a>
                    </li>
                  </ul>
                </li>
              );
            })}
            <li className={styles.subChildItem}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setFiltersInCookies(cookies, {
                    categories: [activeMenu],
                  });
                  router.push(
                    '/Products',
                    `/Products/${createCleanUrl(cookies).join('/')}`,
                  );
                  if (router.pathname.indexOf('/Products') !== -1) {
                    setTimeout(() => window.location.reload(), 2000);
                  }
                }}
                style={{ color: '#f04950' }}
              >
                {parseText(cookies, 'Все категории', 'Всі категорії')}
              </a>
            </li>
          </ul>
          <a href={subNav?.img_uri || '/'}>
            <img
              src={src || subNav.image_link}
              alt={src || subNav.image_link}
              className={styles.categoryImage}
            />
          </a>
        </div>
      )}
    </>
  );
};

HeaderSubNav.propTypes = {
  subNav: PropTypes.shape({
    subcategory: PropTypes.arrayOf(PropTypes.object),
    image_link: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  activeMenu: PropTypes.object,
};

export default HeaderSubNav;
