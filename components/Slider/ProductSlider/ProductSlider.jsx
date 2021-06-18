import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './ProductSlider.scss';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import cx from 'classnames';
import PopupProductSlider from '../PopupProductSlider/PopupProductSlider';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

export const ProductSlider = ({ product, sliderProduct, openPopup }) => {
  const [indexSlide, setIndexSlide] = useState(0);
  const [sliderOne, setSliderOne] = useState(null);
  const [sliderTwo, setSliderTwo] = useState(null);
  const [colors, setColors] = useState([]);
  const [slides, setSlides] = useState([]);

  let sOne = [];
  let sTwo = [];

  useEffect(() => {
    setColors(product.good.colors.map(color => color));
  }, []);

  useEffect(() => {
    setSlides(
      colors.filter(color => color.good_img_link || color.present_img_link)
    );
  }, [colors]);

  useEffect(() => {
    if (sliderProduct && slides.length > 0) {
      const slideIndex = slides.findIndex(
        slide => slide.id === sliderProduct.id
      );
      if (slideIndex !== -1) {
        sliderOne.slickGoTo(slideIndex + 1);
      }
    }
  }, [sliderProduct]);

  useEffect(() => {
    setSliderOne(sOne);
    setSliderTwo(sTwo);
  }, [sOne, sTwo]);

  const indexSliderSettings = {
    arrows: false,
    adaptiveHeight: true
  };
  const secondSliderSettings = {
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function(currentSlide, nextSlide) {
      setIndexSlide(nextSlide);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <div className={styles.sliders}>
      <h1 className={styles.sliders__title}>
        {parseText(
          cookies,
          product?.good?.site_name,
          product?.good?.site_name_uk
        )}{' '}
        {parseText(cookies, product?.good?.name, product?.good?.name_uk)}
      </h1>
      <div className={styles.sliders__wrapper}>
        <div className={styles.secondSlider}>
          <Slider
            className={styles.secondSlider__slider}
            asNavFor={sliderOne}
            ref={slider => (sTwo = slider)}
            style={{ with: '100%' }}
            {...secondSliderSettings}
          >
            <div
              key={product.good.id}
              className={cx(styles.secondSlider__slide)}
            >
              <img
                className={styles.secondSlider__img}
                src={product.good.img_link}
                alt={product.good.name}
              />
            </div>
            {slides.map(item => (
              <div key={item.id} className={styles.secondSlider__slide}>
                <img
                  className={styles.secondSlider__img}
                  src={item.good_img_link}
                  alt={item.color.name}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.indexSlider}>
          <Slider
            className={styles.indexSlider__slider}
            asNavFor={sliderTwo}
            ref={slider => (sOne = slider)}
            {...indexSliderSettings}
          >
            <div key={product.good.id} className={styles.secondSlider__slide}>
              <img
                className={styles.secondSlider__img}
                src={product.good.img_link}
                alt={product.good.name}
                onClick={() =>
                  openPopup({
                    PopupContentComponent: PopupProductSlider,
                    content: {
                      slides: [
                        product.good.img_link,
                        ...slides.map(
                          item => item.good_img_link || item.present_img_link
                        )
                      ],
                      index: 0
                    }
                  })
                }
              />
            </div>
            {slides.map((item, index) => (
              <div key={item.id} className={styles.indexSlider__slide}>
                <img
                  className={styles.indexSlider__img}
                  src={item.good_img_link}
                  alt={item.color.name}
                  onClick={() =>
                    openPopup({
                      PopupContentComponent: PopupProductSlider,
                      content: {
                        slides: [
                          product.good.img_link,
                          ...slides.map(
                            item => item.good_img_link || item.present_img_link
                          )
                        ],
                        index: index + 1
                      }
                    })
                  }
                />
              </div>
            ))}
          </Slider>
          <div className={styles.indexSlider__buttons}>
            <button
              className={styles.indexSlider__button}
              onClick={() => sliderOne?.slickPrev()}
            >
              <SliderArrowSvg />
            </button>
            <span className={styles.indexSlider__counter}>{`${indexSlide +
              1} / ${slides.length + 1}`}</span>
            <button
              className={styles.indexSlider__button}
              onClick={() => sliderOne?.slickNext()}
            >
              <SliderArrowSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
