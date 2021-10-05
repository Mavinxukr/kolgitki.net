import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './ProductSlider.scss';
import SliderArrowSvg from '../../../public/svg/sliderArrow.svg';
import cx from 'classnames';
import PopupProductSlider from '../PopupProductSlider/PopupProductSlider';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import ReactPlayer from 'react-player';
import PlayIcon from '../../../public/svg/play.svg';

export const ProductSlider = ({
  product,
  sliderProduct,
  openPopup,
  isMobile
}) => {
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

  console.log(slides);

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

  const countSlider =
    product.good.colors.length + (!!product.good.video_url ? 2 : 1) > 5
      ? 5
      : product.good.colors.length + (!!product.good.video_url ? 2 : 1);

  const indexSliderSettings = {
    arrows: false
  };
  const secondSliderSettings = {
    swipeToSlide: !isMobile,
    focusOnSelect: true,
    arrows: false,
    slidesToShow: countSlider,
    centerMode: true,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: !isMobile,
    centerPadding: '0px',
    beforeChange: function(currentSlide, nextSlide) {
      setIndexSlide(nextSlide);
    },
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow:
            product.good.colors.length + (!!product.good.video_url ? 2 : 1) > 4
              ? 4
              : product.good.colors.length + (!!product.good.video_url ? 2 : 1)
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            product.good.colors.length + (!!product.good.video_url ? 2 : 1) > 3
              ? 3
              : product.good.colors.length + (!!product.good.video_url ? 2 : 1)
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            product.good.colors.length + (!!product.good.video_url ? 2 : 1) > 4
              ? 4
              : product.good.colors.length + (!!product.good.video_url ? 2 : 1)
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow:
            product.good.colors.length + (!!product.good.video_url ? 2 : 1) > 3
              ? 3
              : product.good.colors.length + (!!product.good.video_url ? 2 : 1)
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow:
            product.good.colors.length + (!!product.good.video_url ? 2 : 1) > 2
              ? 2
              : product.good.colors.length + (!!product.good.video_url ? 2 : 1)
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
                  src={item.good_img_link || item.present_img_link}
                  alt={item.color.name}
                />
              </div>
            ))}
            {product?.good?.video_url && (
              <div key={`video`} className={styles.secondSlider__videoSlide}>
                <PlayIcon />
              </div>
            )}
          </Slider>
        </div>
        <div className={styles.indexSlider}>
          <Slider
            className={styles.indexSlider__slider}
            asNavFor={sliderTwo}
            ref={slider => (sOne = slider)}
            {...indexSliderSettings}
          >
            <div key={product.good.id} className={styles.indexSlider__slide}>
              <img
                className={styles.indexSlider__img}
                src={product.good.img_link || product.present_img_link}
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
                      video: product.good.video_url,
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
                  src={item.good_img_link || item.present_img_link}
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
                        video: product.good.video_url,
                        index: index + 1
                      }
                    })
                  }
                />
              </div>
            ))}
            {product?.good?.video_url && (
              <div key={`video`} className={styles.indexSlider__slide}>
                <video
                  className={styles.indexSlider__video}
                  style={{ width: '100%' }}
                  src={product?.good?.video_url}
                  muted={true}
                  controls={true}
                  autoPlay={true}
                  loop={true}
                  playsInline={true}
                ></video>
              </div>
            )}
          </Slider>
          <div className={styles.indexSlider__buttons}>
            <button
              className={styles.indexSlider__button}
              onClick={() => sliderOne?.slickPrev()}
            >
              <SliderArrowSvg />
            </button>
            <span className={styles.indexSlider__counter}>{`${indexSlide +
              1} / ${slides.length +
              1 +
              (!!product.good.video_url ? 1 : 0)}`}</span>
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
