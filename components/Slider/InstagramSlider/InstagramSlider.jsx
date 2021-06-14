import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import styles from './InstagramSlider.scss';

export const InstagramSlider = React.memo(
  ({ slides, isMobile, isDesctop, isTablet }) => {
    const [currentIndex, setIndex] = useState(0);
    const settings = {
      arrows: false,
      speed: 500,
      swipeToSlide: true,
      slidesToShow: isMobile ? 2 : isTablet ? 3 : 5,
      beforeChange: (rev, current) => setIndex(current)
    };
    const sliderRef = useRef();
    return (
      <div className={styles.slider}>
        <Slider
          className={styles.slider__wrapper}
          ref={sliderRef}
          {...settings}
        >
          {slides.map(item => (
            <div className={styles.slider__slide} key={item.id}>
              <a href="https://www.instagram.com/mavinxbids/">
                <img
                  className={styles.slider__img}
                  src={item.instagram_url}
                  alt={item.instagram_url}
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
);
