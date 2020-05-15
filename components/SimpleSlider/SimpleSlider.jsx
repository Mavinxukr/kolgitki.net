import React, { useRef, useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SliderButton from '../Layout/SliderButton/SliderButton';
import SliderNav from '../Layout/SliderNav/SliderNav';
import { withResponse } from '../hoc/withResponse';
import styles from './SimpleSlider.scss';
import UIKit from '../../public/uikit/uikit';

const SimpleSlider = ({ classNameWrapper, images, isMobileScreen }) => {
  const [index, setIndex] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
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
        {images.map(item => (
          <li key={item.id}>
            <img
              className={styles.sliderImage}
              src={item.link}
              alt={item.link}
            />
          </li>
        ))}
      </ul>
      {(isMobileScreen && (
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
};

export default withResponse(SimpleSlider);
