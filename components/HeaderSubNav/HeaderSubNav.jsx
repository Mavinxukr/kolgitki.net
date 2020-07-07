import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { setFiltersInCookies } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './HeaderSubNav.scss';

const HeaderSubNav = ({ subNav, classNameWrapper, router }) => {
  const [indexElemActive, setIndexElemActive] = useState(0);
  const [src, setSrc] = useState('');

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
                    onMouseOver={() => {
                      setSrc(item.image_link);
                      setIndexElemActive(index);
                    }}
                    onFocus={() => {
                      setSrc(item.image_link);
                      setIndexElemActive(index);
                    }}
                    className={classNameForLink}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setFiltersInCookies(cookies, {
                        categories: [{
                          id: item.id,
                          name: item.slug,
                        }],
                      });
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
                            onMouseOver={() => setSrc(itemChild.image_link)}
                            onFocus={() => setSrc(itemChild.image_link)}
                            onClick={(e) => {
                              e.preventDefault();
                              setFiltersInCookies(cookies, {
                                categories: [{
                                  id: itemChild.id,
                                  name: itemChild.slug,
                                }],
                              });
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
                                  setFiltersInCookies(cookies, {
                                    categories: [{
                                      id: itemChild.id,
                                      name: itemChild.slug,
                                    }],
                                  });
                                  router.push('/Products');
                                }}
                                onMouseOver={() => setSrc(itemSubChild.image_link)}
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
                  </ul>
                </li>
              );
            })}
          </ul>
          <img
            src={src || subNav.image_link}
            alt={src || subNav.image_link}
            className={styles.categoryImage}
          />
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
