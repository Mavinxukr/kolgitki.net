import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import cx from 'classnames';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import style from './IndexSlider.scss';

export const IndexSlider = React.memo(({ slides, settings, currentIndex }) => {
  const sliderRef = useRef();
  const [image, setImage] = useState('web');
  const isDesctop = useMediaQuery({ minDeviceWidth: 1225 });
  const isTablet = useMediaQuery({ minDeviceWidth: 769, maxDeviceWidth: 1224 });
  const isMobile = useMediaQuery({ minDeviceWidth: 0, maxDeviceWidth: 768 });

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
  }, [isTablet]);

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
                <Link href={item.url.toLowerCase()}>
                  <a className={style.slider__link}>
                    {parseText(cookies, 'Подробнее', 'Детальніше')}
                  </a>
                </Link>
              </div>
              <Link href={item.url.toLowerCase()}>
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
        <span className={style.slider__counter}>{`${currentIndex + 1} / ${
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
              [style.slider__dot__active]: index == currentIndex
            })}
          ></span>
        ))}
      </div>
    </div>
  );
});
