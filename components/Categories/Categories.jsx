import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Categories.scss';

const Categories = ({ arrSubCategories, classNameWrapper }) => {
  const changeClassForLink = item => cx(styles.selectLink, {
    [styles.selectLinkWithoutChildren]: !item.children,
  });

  const changeClassForSelect = item => cx(styles.select, {
    [styles.selectWithoutChildren]: !item.children,
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
              e.target.classList.toggle(styles.selectLinkClick);
            }}
          >
            {item.name}
            {item.children ? (
              <span className={styles.count}>({item.count})</span>
            ) : (
              <span className={styles.count}>{item.count}</span>
            )}
          </a>
          <div className="uk-accordion-content">
            {item.children ? (
              <Categories arrSubCategories={item.children} />
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
};

export default Categories;
