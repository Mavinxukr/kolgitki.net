import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ButtonRoute.scss';

const ButtonRoute = ({ classNameWrapper }) => (
  <a href="/" className={cx(styles.button, classNameWrapper)}>
    Перейти на главную страницу
  </a>
);

ButtonRoute.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default ButtonRoute;
