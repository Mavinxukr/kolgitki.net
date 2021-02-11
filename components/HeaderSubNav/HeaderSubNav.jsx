import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  setFiltersInCookies,
  parseText,
  createCleanUrl
} from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './HeaderSubNav.scss';

const HeaderSubNav = ({
  subNav,
  classNameWrapper,
  router,
  activeMenu,
  isHover
}) => {
  const [src, setSrc] = useState('');
  const [subNavItem, setSubNavItem] = useState(null);
  const [subNavItemChild, setSubNavItemChild] = useState(null);
  const [subNavItemSubChild, setSubNavItemSubChild] = useState(null);

  const redirectToProducts = () => {
    setFiltersInCookies(cookies, {
      categories: []
    });
    isHover(false);
    router.push('/Products', `/Products/${createCleanUrl(cookies).join('/')}`);
  };

  return (
    <>
      {subNav && (
        <div className={cx(styles.menu, classNameWrapper)}>
          <ul className={styles.mainProductsList}>
            {subNav.subcategory.map((item, index) => {
              const classNameForLink = cx(styles.mainProductsLink);
              const classNameForList = cx(styles.subProductsList);

              return (
                <React.Fragment key={item.id}>
                  {index < 6 && (
                    <li
                      className={styles.mainProductsItem}
                      onMouseOver={() => {
                        setSrc(item.image_link);
                        setSubNavItem({
                          id: item.id,
                          name: item.slug,
                          categoryName: parseText(
                            cookies,
                            item.name,
                            item.name_ua
                          )
                        });
                      }}
                    >
                      <a
                        onFocus={() => {
                          setSrc(item.image_link);
                        }}
                        className={classNameForLink}
                        href="/"
                        onClick={e => {
                          e.preventDefault();
                          setFiltersInCookies(cookies, {
                            categories: [activeMenu, subNavItem]
                          });
                          router.push(
                            '/Products',
                            `/Products/${createCleanUrl(cookies).join('/')}`
                          );
                          if (router.pathname.indexOf('/Products') !== -1) {
                            isHover(false);
                          }
                        }}
                      >
                        {parseText(cookies, item.name, item.name_ua)}
                        <img
                          className={styles.firstImg}
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjg1NCA5LjY0M0w4LjM1NyA1LjE0OGEuNTA0LjUwNCAwIDEwLS43MTUuNzEzTDExLjc4MiAxMGwtNC4xNCA0LjEzOWEuNTA0LjUwNCAwIDEwLjcxNS43MTNsNC40OTctNC40OTVhLjUxLjUxIDAgMDAwLS43MTR6IiBmaWxsPSIjMjEyQjM2Ii8+PC9zdmc+"
                        />
                      </a>
                      <ul className={classNameForList}>
                        {item.subcategory.map((itemChild, secondIndex) => (
                          <React.Fragment key={itemChild.id}>
                            {secondIndex < 6 && (
                              <li className={styles.subProductsItem}>
                                <div
                                  onMouseOver={() => {
                                    setSrc(itemChild.image_link);
                                    setSubNavItemChild({
                                      id: itemChild.id,
                                      name: itemChild.slug,
                                      categoryName: parseText(
                                        cookies,
                                        itemChild.name,
                                        itemChild.name_ua
                                      )
                                    });
                                  }}
                                  className={styles.subProductsInfo}
                                >
                                  <p className={styles.subProductsInfoText}>
                                    <a
                                      href="/"
                                      onFocus={() =>
                                        setSrc(itemChild.image_link)
                                      }
                                      onClick={e => {
                                        e.preventDefault();
                                        setFiltersInCookies(cookies, {
                                          categories: [
                                            activeMenu,
                                            subNavItem,
                                            subNavItemChild
                                          ]
                                        });
                                        router.push(
                                          '/Products',
                                          `/Products/${createCleanUrl(
                                            cookies
                                          ).join('/')}`
                                        );
                                        if (
                                          router.pathname.indexOf(
                                            '/Products'
                                          ) !== -1
                                        ) {
                                          isHover(false);
                                        }
                                      }}
                                    >
                                      {parseText(
                                        cookies,
                                        itemChild.name,
                                        itemChild.name_ua
                                      )}
                                    </a>
                                    {itemChild.subcategory.length > 0 && (
                                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjg1NCA5LjY0M0w4LjM1NyA1LjE0OGEuNTA0LjUwNCAwIDEwLS43MTUuNzEzTDExLjc4MiAxMGwtNC4xNCA0LjEzOWEuNTA0LjUwNCAwIDEwLjcxNS43MTNsNC40OTctNC40OTVhLjUxLjUxIDAgMDAwLS43MTR6IiBmaWxsPSIjMjEyQjM2Ii8+PC9zdmc+" />
                                    )}
                                  </p>
                                </div>
                                <ul className={styles.subChildList}>
                                  {itemChild.subcategory.map(itemSubChild => (
                                    <li
                                      className={styles.subChildItem}
                                      key={itemSubChild.id}
                                    >
                                      <a
                                        onClick={e => {
                                          e.preventDefault();
                                          setFiltersInCookies(cookies, {
                                            categories: [
                                              activeMenu,
                                              subNavItem,
                                              subNavItemChild,
                                              subNavItemSubChild
                                            ]
                                          });
                                          router.push(
                                            '/Products',
                                            `/Products/${createCleanUrl(
                                              cookies
                                            ).join('/')}`
                                          );
                                          if (
                                            router.pathname.indexOf(
                                              '/Products'
                                            ) !== -1
                                          ) {
                                            isHover(false);
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
                                              itemSubChild.name_ua
                                            )
                                          });
                                        }}
                                        onFocus={() =>
                                          setSrc(itemSubChild.image_link)
                                        }
                                        className={styles.subChildLink}
                                        href="/"
                                      >
                                        {itemSubChild.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )}
                          </React.Fragment>
                        ))}
                        <li className={styles.subChildItem}>
                          <a
                            onClick={e => {
                              e.preventDefault();
                              setFiltersInCookies(cookies, {
                                categories: [activeMenu, subNavItem]
                              });
                              router.push(
                                '/Products',
                                `/Products/${createCleanUrl(cookies).join('/')}`
                              );
                              if (router.pathname.indexOf('/Products') !== -1) {
                                isHover(false);
                              }
                            }}
                            style={{ color: '#f04950' }}
                          >
                            {parseText(
                              cookies,
                              'Все категории',
                              'Всі категорії'
                            )}
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
            <li className={styles.subChildItem}>
              <a
                onClick={e => {
                  e.preventDefault();
                  setFiltersInCookies(cookies, {
                    categories: [activeMenu]
                  });
                  router.push(
                    '/Products',
                    `/Products/${createCleanUrl(cookies).join('/')}`
                  );
                  if (router.pathname.indexOf('/Products') !== -1) {
                    isHover(false);
                  }
                }}
                style={{ color: '#f04950' }}
              >
                {parseText(cookies, 'Все категории', 'Всі категорії')}
              </a>
            </li>
          </ul>
          <a onClick={() => redirectToProducts()}>
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
    image_link: PropTypes.string
  }),
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  isHover: PropTypes.func,
  activeMenu: PropTypes.object
};

export default HeaderSubNav;
