import React, { useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './HeaderSubNav.scss';

const HeaderSubNav = ({ subNav, classNameWrapper }) => {
  const [indexElemActive, setIndexElemActive] = useState(0);

  return (
    <>
      {subNav && (
        <div className={cx(styles.menu, classNameWrapper)}>
          <ul className={styles.mainProductsList}>
            {subNav.subcategory.map((item, index) => {
              const classNameForLink = cx(styles.mainProductsLink, {
                [styles.mainProductsLinkActive]: indexElemActive === index,
              });

              const classNameForList = cx(styles.subProductsList, {
                [styles.subProductsListActive]: indexElemActive === index,
              });

              return (
                <li className={styles.mainProductsItem} key={item.id}>
                  <Link
                    href={{
                      pathname: '/Products',
                      query: {
                        categories: [item.id],
                        sort_popular: 'desc',
                      },
                    }}
                    prefetch={false}
                  >
                    <a
                      onMouseOver={() => setIndexElemActive(index)}
                      onFocus={() => setIndexElemActive(index)}
                      className={classNameForLink}
                      href="/"
                    >
                      {item.name}
                    </a>
                  </Link>
                  <ul className={classNameForList}>
                    {item.subcategory.map(itemChild => (
                      <li className={styles.subProductsItem} key={itemChild.id}>
                        <div className={styles.subProductsInfo}>
                          <p>{itemChild.name}</p>
                          <Link
                            href={{
                              pathname: '/Products',
                              query: {
                                categories: [itemChild.id],
                                sort_popular: 'desc',
                              },
                            }}
                            prefetch={false}
                          >
                            <a href="/" className={styles.subProductsLink}>
                              Все
                            </a>
                          </Link>
                        </div>
                        <ul className={styles.subChildList}>
                          {itemChild.subcategory.map(itemSubChild => (
                            <li
                              className={styles.subChildItem}
                              key={itemSubChild.id}
                            >
                              <Link
                                href={{
                                  pathname: '/Products',
                                  query: {
                                    categories: [itemSubChild.id],
                                    sort_popular: 'desc',
                                  },
                                }}
                                prefetch={false}
                              >
                                <a className={styles.subChildLink} href="/">
                                  {itemSubChild.name}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

HeaderSubNav.propTypes = {
  subNav: PropTypes.shape({
    subcategory: PropTypes.arrayOf(PropTypes.object),
  }),
  classNameWrapper: PropTypes.string,
};

export default HeaderSubNav;
