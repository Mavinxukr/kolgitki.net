import React from 'react';
import PropTypes from 'prop-types';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ items }) => (
  <div className={styles.breadCrumbs}>
    {items.map((item, index) => (
      <a href="/" className={styles.link} key={index}>
        {index === 0 ? '' : '/'} {item}
      </a>
    ))}
  </div>
);

BreadCrumbs.propTypes = {
  items: PropTypes.array,
};

export default BreadCrumbs;
