import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Loader.scss';

const Loader = ({ isSmallPage }) => (
  <div
    className={cx(styles.loaderWrapper, {
      [styles.loaderWrapperForSmallPage]: isSmallPage,
    })}
  >
    <img src="/images/logo_cut.png" alt="logo" />
  </div>
);

Loader.propTypes = {
  isSmallPage: PropTypes.bool,
};

export default Loader;
