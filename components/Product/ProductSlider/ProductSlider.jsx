import React, { useState, useRef, useEffect } from 'react';
import IconArrow from '../../../assets/svg/Group 621.svg';
import UIKit from '../../../public/uikit/uikit';
import styles from './ProductSlider.scss';

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
    <div className={styles.productSlider}>
      <div className={styles.addPhotos}>
        <button onClick={() => goToSlide(1)} className={styles.button} type="button">
          <img src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
        </button>
        <button onClick={() => goToSlide(2)} className={styles.button} type="button">
          <img src="/images/IMPRESSO_20_gallery_1005989_15791.png" alt="image3" />
        </button>
      </div>
      <div ref={value} uk-slideshow="pause-on-hover: true" className={styles.slider}>
        <ul className={`uk-slideshow-items ${styles.list}`}>
          <li className={styles.item}>
            <img className={styles.image} src="/images/IMPRESSO_20_image_1005989.png" alt="image1" />
          </li>
          <li className={styles.item}>
            <img className={styles.image} src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
          </li>
          <li className={styles.item}>
            <img className={styles.image} src="/images/IMPRESSO_20_gallery_1005989_15791.png" alt="image3" />
          </li>
        </ul>
        <div className={styles.navBar}>
          <a href="/" className={styles.navButton} uk-slideshow-item="previous">
            <IconArrow className={`${styles.arrow} ${styles.arrowLeft}`} />
          </a>
          <p className={styles.indexIndicator}>{index + 1}/{sliderLength}</p>
          <a href="/" className={styles.navButton} uk-slideshow-item="next">
            <IconArrow className={`${styles.arrow}`} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
