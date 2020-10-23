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

const definitePage = (item, cookie, router) => {
  switch (item.slug) {
    case 'novinki':
      setFiltersInCookies(cookie, { sort_date: 'desc' });
      router.push('/Products', `/Products/${createCleanUrl(cookie).join('/')}`);
      break;
    case 'gift-backets':
      router.push('/gift-backets');
      break;
    case 'sale':
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: 1,
            name: 'akcii',
            categoryName: parseText(cookie, 'Акции', 'Акції'),
          },
        ],
      });
      router.push('/stock');
      break;
    default:
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: item.id,
            name: item.slug,
            categoryName: parseText(cookie, item.name, item.name_ua),
          },
        ],
      });
      router.push('/Products', `/Products/${createCleanUrl(cookie).join('/')}`);
  }
};

const HeaderSubNav = ({ subNav, classNameWrapper, router }) => {
  const [src, setSrc] = useState('');

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
                      setFiltersInCookies(cookies, {
                        ...cookies.get('filters'),
                        categories: [
                          ...(cookies.get('filters').categories.splice(0, 1)
                            || []),
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
                      });
                      router.push(
                        '/Products',
                        `/Products/${createCleanUrl(cookies).join('/')}`,
                      );
                      if (router.pathname.indexOf('/Products') !== -1) {
                        setTimeout(() => window.location.reload(), 1000);
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
                                setFiltersInCookies(cookies, {
                                  ...cookies.get('filters'),
                                  categories: [
                                    ...(cookies
                                      .get('filters')
                                      .categories.splice(0, 2) || []),
                                    {
                                      id: itemChild.id,
                                      name: itemChild.slug,
                                      categoryName: parseText(
                                        cookies,
                                        itemChild.name,
                                        itemChild.name_ua,
                                      ),
                                    },
                                  ],
                                });
                              }}
                              onFocus={() => setSrc(itemChild.image_link)}
                              onClick={(e) => {
                                e.preventDefault();
                                setFiltersInCookies(cookies, {
                                  ...cookies.get('filters'),
                                  categories: [
                                    ...(cookies
                                      .get('filters')
                                      .categories.splice(0, 2) || []),
                                    {
                                      id: itemChild.id,
                                      name: itemChild.slug,
                                      categoryName: parseText(
                                        cookies,
                                        itemChild.name,
                                        itemChild.name_ua,
                                      ),
                                    },
                                  ],
                                });
                                router.push(
                                  '/Products',
                                  `/Products/${createCleanUrl(cookies).join(
                                    '/',
                                  )}`,
                                );
                                if (router.pathname.indexOf('/Products') !== -1) {
                                  setTimeout(() => window.location.reload(), 1000);
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
                                    ...cookies.get('filters'),
                                    categories: [
                                      ...(cookies
                                        .get('filters')
                                        .categories.splice(0, 3) || []),
                                      {
                                        id: itemSubChild.id,
                                        name: itemSubChild.slug,
                                        categoryName: parseText(
                                          cookies,
                                          itemSubChild.name,
                                          itemSubChild.name_ua,
                                        ),
                                      },
                                    ],
                                  });
                                  router.push(
                                    '/Products',
                                    `/Products/${createCleanUrl(cookies).join(
                                      '/',
                                    )}`,
                                  );
                                  if (router.pathname.indexOf('/Products') !== -1) {
                                    setTimeout(() => window.location.reload(), 1000);
                                  }
                                }}
                                onMouseOver={() => {
                                  setSrc(itemSubChild.image_link);
                                  setFiltersInCookies(cookies, {
                                    ...cookies.get('filters'),
                                    categories: [
                                      ...(cookies
                                        .get('filters')
                                        .categories.splice(0, 3) || []),
                                      {
                                        id: itemSubChild.id,
                                        name: itemSubChild.slug,
                                        categoryName: parseText(
                                          cookies,
                                          itemSubChild.name,
                                          itemSubChild.name_ua,
                                        ),
                                      },
                                    ],
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
                            ...cookies.get('filters'),
                            categories: [
                              ...(cookies
                                .get('filters')
                                .categories.splice(0, 2) || []),
                            ],
                          });
                          router.push(
                            '/Products',
                            `/Products/${createCleanUrl(cookies).join('/')}`,
                          );
                          if (router.pathname.indexOf('/Products') !== -1) {
                            setTimeout(() => window.location.reload(), 1000);
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
                    categories: [
                      {
                        id: cookies.get('filters').categories[0].id,
                        name: cookies.get('filters').categories[0].name,
                        categoryName: parseText(
                          cookies,
                          cookies.get('filters').categories[0].categoryName,
                          cookies.get('filters').categories[0].categoryName,
                        ),
                      },
                    ],
                  });
                  router.push(
                    '/Products',
                    `/Products/${createCleanUrl(cookies).join('/')}`,
                  );
                  if (router.pathname.indexOf('/Products') !== -1) {
                    setTimeout(() => window.location.reload(), 1000);
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
};

export default HeaderSubNav;
