import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Popup.scss';
import { useEffect } from 'react';

const Popup = ({ children, classNameWrapper, closePopup }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.msTouchAction = 'none';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
      document.body.style.msTouchAction = 'auto';
    };
  });

  return (
    <div className={styles.backgroundPopup}>
      <div
        className={styles.popupOverlay}
        onClick={() => closePopup()}
        onKeyPress={closePopup}
        role="button"
        tabIndex="0"
        aria-label="Mute volume"
      />
      <div className={cx(styles.popup, classNameWrapper)}>{children}</div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node,
  classNameWrapper: PropTypes.string,
  closePopup: PropTypes.func
};

export default Popup;
