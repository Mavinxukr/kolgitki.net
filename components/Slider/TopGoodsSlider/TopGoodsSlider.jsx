import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import styles from './TopGoodsSlider.scss';
import { CardProduct } from '../../Layout/CardProduct/CardProduct';
import { useMediaQuery } from 'react-responsive';

export const TopGoodsSlider = React.memo(({ slides }) => {
  const [indexTopGoodsSlider, setIndexTopGoodsSlider] = useState(0);

  const isDesctop = useMediaQuery({ query: '(min-width: 1201px)' });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1200 });
  const isMobile = useMediaQuery({ minWidth: 451, maxWidth: 767 });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 450px)' });

  const settings = {
    arrows: false,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: isDesctop
      ? 5
      : isTablet
      ? 4
      : isMobile
      ? 3
      : isSmallMobile
      ? 2
      : 2,
    beforeChange: (rev, current) => setIndexTopGoodsSlider(current)
  };
  const sliderRef = useRef();
  return (
    <div className={styles.slider}>
      <Slider className={styles.slider__wrapper} ref={sliderRef} {...settings}>
        {slides.map(item => (
          <div className={styles.slider__slide} key={item.id}>
            <CardProduct data={item}></CardProduct>
          </div>
        ))}
      </Slider>
      <button
        className={cx(styles.slider__button, styles.slider__button__reverse)}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <SliderArrowSvg />
      </button>

      <button
        className={styles.slider__button}
        onClick={() => sliderRef.current.slickNext()}
      >
        <SliderArrowSvg />
      </button>
      <div className={styles.slider__dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => sliderRef.current.slickGoTo(index)}
            className={cx(styles.slider__dot, {
              [styles.slider__dot__active]: index == indexTopGoodsSlider
            })}
          ></span>
        ))}
      </div>
    </div>
  );
});
