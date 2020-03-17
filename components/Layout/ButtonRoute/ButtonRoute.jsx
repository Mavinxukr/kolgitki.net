import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ButtonRoute.scss';

const ButtonRoute = ({ classNameWrapper }) => (
  <Link href="/">
    <a className={cx(styles.button, classNameWrapper)}>
      Перейти на главную страницу
    </a>
  </Link>
);

ButtonRoute.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default ButtonRoute;
