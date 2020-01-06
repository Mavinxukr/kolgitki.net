import React from 'react';
import cx from 'classnames';
import styles from './SliderButton.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';

const SliderButton = ({
  buttonDirection, stylesForButton, isRotate,
}) => {
  const classNameForIcon = cx(styles.icon, {
    [styles.iconRotate]: isRotate,
  });

  return (
    <a
      className={styles.button}
      href="/"
      uk-slider-item={buttonDirection}
      style={stylesForButton}
    >
      <IconArrow className={classNameForIcon} />
    </a>
  );
};

export default SliderButton;
