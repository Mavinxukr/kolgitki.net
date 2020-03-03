import React, { useEffect, useRef, useState } from 'react';
import SliderNav from '../Layout/SliderNav/SliderNav';
import UIKit from '../../public/uikit/uikit';
import styles from './PickUpPointsSlider.scss';

const PickUpPointsSlider = () => {
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
      className={styles.slider}
    >
      <ul className={`${styles.list} uk-slideshow-items`}>
        <li className={styles.item}>
          <img
            className={styles.image}
            src="/images/harkovfrancuzskiybulvar1.png"
            alt="harkovfrancuzskiybulvar"
          />
        </li>
        <li className={styles.item}>
          <img
            className={styles.image}
            src="/images/harkovfrancuzskiybulvar1.png"
            alt="harkovfrancuzskiybulvar"
          />
        </li>
        <li className={styles.item}>
          <img
            className={styles.image}
            src="/images/harkovfrancuzskiybulvar1.png"
            alt="harkovfrancuzskiybulvar"
          />
        </li>
      </ul>
      <SliderNav
        classNameWrapper={styles.navBar}
        index={index}
        sliderLength={sliderLength}
      />
    </div>
  );
};

export default PickUpPointsSlider;
