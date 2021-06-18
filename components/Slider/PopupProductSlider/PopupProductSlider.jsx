import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import styles from './PopupProductSlider.scss';
import InnerImageZoom from 'react-inner-image-zoom';

const PopupProductSlider = ({ content, closePopup }) => {
  const ref = useRef();
  const [indexSlide, setIndexSlide] = useState(content.index);
  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: content.index,
    adaptiveHeight: true,

    beforeChange: function(_, nextSlide) {
      setIndexSlide(nextSlide);
    }
  };
  return (
    <div className={styles.slider}>
      <button onClick={() => closePopup()} className={styles.slider__close}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          data-svg="close-large"
        >
          <line
            fill="none"
            stroke="#000"
            stroke-width="1.4"
            x1="1"
            y1="1"
            x2="19"
            y2="19"
          ></line>
          <line
            fill="none"
            stroke="#000"
            stroke-width="1.4"
            x1="19"
            y1="1"
            x2="1"
            y2="19"
          ></line>
        </svg>
      </button>
      <Slider {...settings} className={styles.slider__slider} ref={ref}>
        {content.slides.map((item, index) => (
          <InnerImageZoom
            className={styles.slider__image}
            key={index}
            src={item}
            zoomSrc={item}
            zoomType="hover"
            zoomPreload={true}
            fullscreenOnMobile={true}
            hasSpacer={true}
            mobileBreakpoint={640}
          />
        ))}
      </Slider>
      <div className={styles.slider__buttons}>
        <button
          className={styles.slider__button}
          onClick={() => ref?.current?.slickPrev()}
        >
          <SliderArrowSvg />
        </button>
        <span className={styles.slider__counter}>{`${indexSlide + 1} / ${
          content.slides.length
        }`}</span>
        <button
          className={styles.slider__button}
          onClick={() => ref?.current?.slickNext()}
        >
          <SliderArrowSvg />
        </button>
      </div>
    </div>
  );
};

export default PopupProductSlider;
