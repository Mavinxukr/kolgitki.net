import React, { useRef } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import styles from './PopularCategoriesSlider.scss';
import PopularCard from '../../PopularCard/PopularCard';
import { useRouter } from 'next/router';

export const PopularCategoriesSlider = React.memo(({ slides }) => {
  const router = useRouter();
  const sliderRef = useRef();
  const settings = {
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={styles.slider}>
      <Slider className={styles.slider__wrapper} ref={sliderRef} {...settings}>
        {slides.map(item => (
          <div
            className={cx(styles.slider__slide, styles.popularCardSlider)}
            key={item.id}
          >
            <PopularCard router={router} item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
});
