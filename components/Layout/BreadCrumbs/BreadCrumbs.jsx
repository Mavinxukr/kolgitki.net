import React from 'react';
import PropTypes from 'prop-types';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ value }) => (
  <div className={styles.breadCrumbs}>
    {value.map((item, id) => (
      <a href="/" className={styles.link} key={id}>
        {id === 0 ? '' : '/'} {item}
      </a>
    ))}
  </div>
);

BreadCrumbs.propTypes = {
  value: PropTypes.array,
};

export default BreadCrumbs;
