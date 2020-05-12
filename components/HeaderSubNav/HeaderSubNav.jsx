import React, { useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { setFiltersInCookies } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './HeaderSubNav.scss';

const HeaderSubNav = ({ subNav, classNameWrapper, router }) => {
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
                  <a
                    onMouseOver={() => setIndexElemActive(index)}
                    onFocus={() => setIndexElemActive(index)}
                    className={classNameForLink}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setFiltersInCookies(cookies, { categories: [item.id] });
                      router.push('/Products');
                    }}
                  >
                    {item.name}
                  </a>
                  <ul className={classNameForList}>
                    {item.subcategory.map(itemChild => (
                      <li className={styles.subProductsItem} key={itemChild.id}>
                        <div className={styles.subProductsInfo}>
                          <p className={styles.subProductsInfoText}>{itemChild.name}</p>
                          <a
                            href="/"
                            onClick={(e) => {
                              e.preventDefault();
                              setFiltersInCookies(cookies, { categories: [itemChild.id] });
                              router.push('/Products');
                            }}
                            className={styles.subProductsLink}
                          >
                            Все
                          </a>
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
                                  setFiltersInCookies(cookies, { categories: [itemSubChild.id] });
                                  router.push('/Products');
                                }}
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
  router: PropTypes.object,
};

export default HeaderSubNav;
