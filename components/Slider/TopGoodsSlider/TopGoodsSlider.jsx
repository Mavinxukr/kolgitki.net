import React, { useRef } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import styles from './TopGoodsSlider.scss';
import { CardProduct } from '../../Layout/CardProduct/CardProduct';

export const TopGoodsSlider = React.memo(
  ({ slides, settings, currentIndex }) => {
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
                [styles.slider__dot__active]: index == currentIndex
              })}
            ></span>
          ))}
        </div>
      </div>
    );
  }
);
