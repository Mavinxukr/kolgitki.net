import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './ButtonRoute.scss';

const ButtonRoute = ({ classNameWrapper }) => (
  <Link href="/" prefetch={false}>
    <a className={cx(styles.button, classNameWrapper)}>
      {parseText(
        cookies,
        'Перейти на главную страницу',
        'Перейти на головну сторінку',
      )}
    </a>
  </Link>
);

ButtonRoute.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default ButtonRoute;
