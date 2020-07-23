import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Popup.scss';

const Popup = ({
  children, classNameWrapper, closePopup,
}) => (
  <>
    <div
      className={styles.backgroundPopup}
      onClick={() => closePopup()}
      onKeyPress={closePopup}
      role="button"
      tabIndex="0"
      aria-label="Mute volume"
    />
    <div className={cx(styles.popup, classNameWrapper)}>
      {children}
    </div>
  </>
);

Popup.propTypes = {
  children: PropTypes.node,
  classNameWrapper: PropTypes.string,
  closePopup: PropTypes.func,
};

export default Popup;
