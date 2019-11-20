import React, { useState, useRef, useEffect } from 'react';
import IconArrow from '../../../assets/svg/Group 621.svg';
import UIKit from '../../../public/uikit/uikit';
import Styles from './ProductSlider.module.scss';

const ProductSlider = () => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  let slider;

  const value = useRef(null);

  useEffect(() => {
    slider = UIKit.slideshow(value.current);
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  const goToSlide = (id) => {
    slider = UIKit.slideshow(value.current);
    slider.show(id);
  };

  return (
    <div className={Styles.ProductSlider}>
      <div className={Styles.ProductSlider__AddPhotos}>
        <button onClick={() => goToSlide(1)} className={Styles.ProductSlider__Button} type="button">
          <img src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
        </button>
        <button onClick={() => goToSlide(2)} className={Styles.ProductSlider__Button} type="button">
          <img src="/images/IMPRESSO_20_gallery_1005989_15791.png" alt="image3" />
        </button>
      </div>
      <div ref={value} uk-slideshow="pause-on-hover: true" className={Styles.ProductSlider__Slider}>
        <ul className={`uk-slideshow-items ${Styles.ProductSlider__List}`}>
          <li className={Styles.ProductSlider__Item}>
            <img className={Styles.ProductSlider__Image} src="/images/IMPRESSO_20_image_1005989.png" alt="image1" />
          </li>
          <li className={Styles.ProductSlider__Item}>
            <img className={Styles.ProductSlider__Image} src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
          </li>
          <li className={Styles.ProductSlider__Item}>
            <img className={Styles.ProductSlider__Image} src="/images/IMPRESSO_20_gallery_1005989_15791.png" alt="image3" />
          </li>
        </ul>
        <div className={Styles.ProductSlider__NavBar}>
          <a href="/" className={Styles.ProductSlider__NavButton} uk-slideshow-item="previous">
            <IconArrow className={`${Styles.Slider__Arrow} ${Styles.ProductSlider__ArrowLeft}`} />
          </a>
          <p className={Styles.ProductSlider__IndexIndicator}>{index + 1}/{sliderLength}</p>
          <a href="/" className={Styles.ProductSlider__NavButton} uk-slideshow-item="next">
            <IconArrow className={`${Styles.ProductSlider__Arrow}`} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
