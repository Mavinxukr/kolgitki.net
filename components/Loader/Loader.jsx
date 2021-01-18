import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Loader.scss';

const Loader = ({ isSmallPage, isPopup }) => (
  <div
    className={cx(styles.loaderWrapper, {
      [styles.loaderWrapperForSmallPage]: isSmallPage,
      [styles.loaderWrapperPopup]: isPopup,
    })}
  >
    <img className='imgSimple' src="/images/logo_cut.png" alt="logo" />
  </div>
);

Loader.propTypes = {
  isSmallPage: PropTypes.bool,
  isPopup: PropTypes.bool,
};

export default Loader;
