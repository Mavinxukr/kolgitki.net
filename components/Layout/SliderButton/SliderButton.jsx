import React from 'react';
import cx from 'classnames';
import styles from './SliderButton.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';

const SliderButton = ({
  buttonDirection, classNameForButton, isRotate,
}) => {
  const classNameForIcon = cx(styles.icon, {
    [styles.iconRotate]: isRotate,
  });

  return (
    <a
      className={`${styles.button} ${classNameForButton}`}
      href="/"
      uk-slider-item={buttonDirection}
    >
      <IconArrow className={classNameForIcon} />
    </a>
  );
};

export default SliderButton;
