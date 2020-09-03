import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './DotsForSlider.scss';

const DotsForSlider = ({
  slider,
  sliderData,
  slideIndex,
  classNameWrapper,
  isHomeSlider,
}) => {
  const arrForSliderDots = isHomeSlider
    ? sliderData.slice(0, sliderData.length - 1)
    : sliderData;

  return (
    <ul className={cx(styles.dotList, classNameWrapper)}>
      {arrForSliderDots.map((item, index) => {
        const classNameForButton = cx(styles.dotButton, {
          [styles.dotButtonActive]: index === slideIndex,
          [styles.dotActive]: isHomeSlider && index === slideIndex,
          [styles.dot]: isHomeSlider,
        });

        return (
          <li key={item.id} className={styles.dotItem}>
            <button
              className={classNameForButton}
              type="button"
              onClick={() => slider.show(index)}
            />
          </li>
        );
      })}
    </ul>
  );
};

DotsForSlider.propTypes = {
  slider: PropTypes.shape({
    show: PropTypes.func,
  }),
  sliderData: PropTypes.arrayOf(PropTypes.object),
  slideIndex: PropTypes.number,
  classNameWrapper: PropTypes.string,
  isHomeSlider: PropTypes.bool,
};

export default DotsForSlider;
