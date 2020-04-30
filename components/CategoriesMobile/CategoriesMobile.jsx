import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './CategoriesMobile.scss';

const CategoriesMobile = ({ classNameWrapper }) => (
  <button type="button" className={cx(styles.button, classNameWrapper)}>
    Категория
  </button>
);

CategoriesMobile.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default CategoriesMobile;
