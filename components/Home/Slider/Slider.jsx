import React, { useRef, useEffect, useState } from 'react';
import styles from './Slider.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';
import UIKit from '../../../public/uikit/uikit.js';

const Slide = () => (
  <div className={styles.slide}>
    <div className={styles.infoBlock}>
      <h2 className={styles.title}>Скидки до -50% на все бренды</h2>
      <p className={styles.desc}>Зима 19-20 / Giulia</p>
      <button className={styles.button} type="button">
        Подробнее
      </button>
    </div>
  </div>
);

const Slider = () => {
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
          <Slide />
        </li>
        <li className={styles.item}>
          <Slide />
        </li>
        <li className={styles.item}>
          <Slide />
        </li>
      </ul>
      <div className={styles.navBar}>
        <a href="/" className={styles.navButton} uk-slideshow-item="previous">
          <IconArrow className={`${styles.arrow} ${styles.arrowLeft}`} />
        </a>
        <p className={styles.indexIndicator}>
          {index + 1}/{sliderLength}
        </p>
        <a href="/" className={styles.navButton} uk-slideshow-item="next">
          <IconArrow className={`${styles.arrow}`} />
        </a>
      </div>
    </div>
  );
};

export default Slider;
