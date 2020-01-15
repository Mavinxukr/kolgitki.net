import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './SliderButton.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';

const SliderButton = ({
  buttonDirection, classNameWrapper, isRotate,
}) => {
  const classNameForIcon = cx(styles.icon, {
    [styles.iconRotate]: isRotate,
  });

  return (
    <button
      className={cx(styles.button, classNameWrapper)}
      type="button"
      uk-slider-item={buttonDirection}
      uk-slideshow-item={buttonDirection}
    >
      <IconArrow className={classNameForIcon} />
    </button>
  );
};

SliderButton.propTypes = {
  buttonDirection: PropTypes.string,
  classNameWrapper: PropTypes.string,
  isRotate: PropTypes.bool,
};

export default SliderButton;
