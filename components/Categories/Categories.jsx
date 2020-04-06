import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Categories.scss';

const Categories = ({
  arrSubCategories,
  classNameWrapper,
  router,
  pathname,
  stock,
}) => {
  const changeClassForLink = item => cx(styles.selectLink, {
    [styles.selectLinkWithoutChildren]: !item.subcategory.length,
    [styles.selectLinkCategory]: +router.query.categories === item.id,
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
          <a
            href="/"
            className={`${changeClassForLink(item)} uk-accordion-title`}
            onClick={(e) => {
              e.preventDefault();
              router.push({
                pathname,
                query: {
                  ...router.query,
                  categories: [item.id],
                },
              });
              e.target.classList.toggle(styles.selectLinkClick);
            }}
          >
            {item.name}
            {((router.pathname.indexOf('/Products') !== -1
              || router.pathname.indexOf('/BLog') !== -1
              || router.pathname.indexOf('/stock/') !== -1
              || router.pathname.indexOf('/Brands/') !== -1) && (
              <span className={styles.count}>
                {item.subcategory.length > 0
                  ? `(${item.count_goods})`
                  : item.count_goods}
              </span>
            ))
              || (router.pathname.indexOf('/gift-backets') !== -1 && (
                <span className={styles.count}>
                  {item.subcategory.length > 0
                    ? `(${item.count_presents})`
                    : item.count_presents}
                </span>
              ))
              || (router.pathname.indexOf('/stock') !== -1 && (
                <span className={styles.count}>
                  {item.subcategory.length > 0
                    ? `(${item.count_actions})`
                    : item.count_actions}
                </span>
              ))}
          </a>
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
