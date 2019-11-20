import React, { useRef, useEffect, useState } from 'react';
import Slide from '../Slide/Slide';
import Styles from './Slider.module.scss';
import IconArrow from '../../../../assets/svg/Group 621.svg';
import UIKit from '../../../../public/uikit/uikit.js';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current)
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  return (
    <div ref={value} uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true" className={Styles.Slider}>
      <ul className={`${Styles.Slider__List} uk-slideshow-items`}>
        <li className={Styles.Slider__Item}>
          <Slide />
        </li>
        <li className={Styles.Slider__Item}>
          <Slide />
        </li>
        <li className={Styles.Slider__Item}>
          <Slide />
        </li>
      </ul>
      <div className={Styles.Slider__NavBar}>
        <a href="/" className={Styles.Slider__NavButton} uk-slideshow-item="previous">
          <IconArrow className={`${Styles.Slider__Arrow} ${Styles.Slider__ArrowLeft}`} />
        </a>
        <p className={Styles.Slider__IndexIndicator}>{index + 1}/{sliderLength}</p>
        <a href="/" className={Styles.Slider__NavButton} uk-slideshow-item="next">
          <IconArrow className={`${Styles.Slider__Arrow}`} />
        </a>
      </div>
    </div>
  );
};

export default Slider;
