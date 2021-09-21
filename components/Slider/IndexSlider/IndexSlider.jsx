import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import cx from 'classnames';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import style from './IndexSlider.scss';

export const IndexSlider = React.memo(
  ({ isDesctop, isTablet, isMobile, slides, delay }) => {
    const sliderRef = useRef();
    const [image, setImage] = useState('web');
    const [indexSlider, setIndexSlider] = useState(0);

    const settings = {
      infinite: true,
      autoplaySpeed: delay,
      autoplay: true,
      arrows: false,
      swipeToSlide: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // afterChange: current => setIndexSlider(current),
      beforeChange: (rev, current) => setIndexSlider(current)
    };

    useEffect(() => {
      if (isDesctop) {
        setImage('web');
      }
      if (isTablet) {
        setImage('tablet');
      }
      if (isMobile) {
        setImage('mobile');
      }
    }, [isDesctop, isTablet, isMobile]);

    return (
      <div className={style.slider}>
        <Slider className={style.slider__wrapper} ref={sliderRef} {...settings}>
          {slides.map(item => (
            <div key={item.id}>
              <div
                style={{
                  backgroundImage: `url(${item.images[`${image}_link`]})`
                }}
                className={style.slider__slide}
              >
                <div className={style.slider__detail}>
                  <h3 className={style.slider__title}>
                    {parseText(cookies, item.name, item.name_ua)}
                  </h3>
                  <span className={style.slider__description}>
                    {parseText(cookies, item.description, item.description_ua)}
                  </span>
                  <Link prefetch={false} href={item.url.toLowerCase()}>
                    <a className={style.slider__link}>
                      {parseText(cookies, 'Подробнее', 'Детальніше')}
                    </a>
                  </Link>
                </div>
                <Link prefetch={false} href={item.url.toLowerCase()}>
                  <a className={style.slider__slide__link}></a>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        <div className={style.slider__buttons}>
          <button
            className={style.slider__button}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <SliderArrowSvg />
          </button>
          <span className={style.slider__counter}>{`${indexSlider + 1} / ${
            slides.length
          }`}</span>
          <button
            className={style.slider__button}
            onClick={() => sliderRef.current.slickNext()}
          >
            <SliderArrowSvg />
          </button>
        </div>
        <div className={style.slider__dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => sliderRef.current.slickGoTo(index)}
              className={cx(style.slider__dot, {
                [style.slider__dot__active]: index == indexSlider
              })}
            ></span>
          ))}
        </div>
      </div>
    );
  }
);
