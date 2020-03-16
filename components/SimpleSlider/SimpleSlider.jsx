import React, { useRef, useEffect, useState } from 'react';
import cx from 'classnames';
import SliderButton from '../Layout/SliderButton/SliderButton';
import styles from './SimpleSlider.scss';
import UIKit from '../../public/uikit/uikit';

const SimpleSlider = ({ classNameWrapper, images }) => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  return (
    <div
      ref={value}
      uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true"
      className={cx(styles.slider, classNameWrapper)}
    >
      <ul className={`${styles.sliderList} uk-slideshow-items`}>
        {
          images.map(item => (
            <li key={item.id}>
              <img
                className={styles.sliderImage}
                src={item.link}
                alt={item.link}
              />
            </li>
          ))
        }
      </ul>
      <SliderButton
        buttonDirection="previous"
        classNameWrapper={styles.sliderNavButtonLeft}
        isRotate
      />
      <p className={styles.sliderIndexIndicator}>
        {index + 1}/{sliderLength}
      </p>
      <SliderButton
        buttonDirection="next"
        classNameWrapper={styles.sliderNavButtonRight}
        isRotate={false}
      />
    </div>
  );
};

export default SimpleSlider;
