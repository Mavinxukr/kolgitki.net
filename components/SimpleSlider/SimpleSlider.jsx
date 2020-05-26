import React, { useRef, useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SliderButton from '../Layout/SliderButton/SliderButton';
import SliderNav from '../Layout/SliderNav/SliderNav';
import { withResponse } from '../hoc/withResponse';
import styles from './SimpleSlider.scss';
import UIKit from '../../public/uikit/uikit';
import DotsForSlider from '../DotsForSlider/DotsForSlider';

const SimpleSlider = ({
  classNameWrapper,
  images,
  isMobileScreen,
  isArticle,
}) => {
  const [index, setIndex] = useState(0);
  const [slider, setSlider] = useState(null);

  const value = useRef(null);

  useEffect(() => {
    setSlider(UIKit.slideshow(value.current));
  }, []);

  useEffect(() => {
    if (slider) {
      value.current.addEventListener('itemshow', () => {
        setIndex(slider.index);
      });
    }
  }, [slider]);

  return (
    <div
      ref={value}
      uk-slideshow={`min-height: ${(isArticle && !isMobileScreen && 520)
        || (isMobileScreen
          && isArticle
          && 340)}; autoplay: true; pause-on-hover: true;`}
      className={cx(styles.slider, classNameWrapper)}
    >
      <ul className={cx(styles.sliderList, 'uk-slideshow-items')}>
        {images.map(item => (
          <li key={item.id} className={styles.sliderWrapper}>
            <img
              className={styles.sliderImage}
              src={item.link}
              alt={item.link}
            />
          </li>
        ))}
      </ul>
      {isMobileScreen && isArticle && (
        <DotsForSlider
          slider={slider}
          sliderData={images}
          slideIndex={index}
          classNameWrapper={styles.dotsWrapper}
        />
      ) || (isMobileScreen && (
        <SliderNav
          classNameWrapper={styles.wrapperWithArrows}
          index={index}
          sliderLength={images.length}
        />
      )) || (
        <>
          <SliderButton
            buttonDirection="previous"
            classNameWrapper={styles.sliderNavButtonLeft}
            isRotate
          />
          <p className={styles.sliderIndexIndicator}>
            {index + 1}/{images.length}
          </p>
          <SliderButton
            buttonDirection="next"
            classNameWrapper={styles.sliderNavButtonRight}
            isRotate={false}
          />
        </>
      )}
    </div>
  );
};

SimpleSlider.propTyppes = {
  classNameWrapper: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  isMobileScreen: PropTypes.bool,
  isArticle: PropTypes.bool,
};

export default withResponse(SimpleSlider);
