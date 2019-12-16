import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import IconArrow from '../../../assets/svg/Group 621.svg';
import Styles from './BestProducts.scss';
import '../../../public/uikit/uikit.js';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../UIComponents/ProductCard/ProductCard'),
  { ssr: false },
);

const BestProducts = () => (
  <div className={Styles.bestProducts}>
    <h2 className={Styles.title}>Лучшее товары</h2>
    <div className={Styles.slider}>
      <div
        className={`${Styles.sliderWrapper} uk-position-relative uk-visible-toggle uk-light`}
        tabIndex="-1"
        uk-slider="true"
      >
        <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-5@m uk-grid">
          {arrProducts.map(item => (
            <li className={Styles.card} key={item.id}>
              <DynamicComponentWithNoSSRSlider item={item} />
            </li>
          ))}
        </ul>
        <a
          className={`${Styles.buttonSlider} uk-position-left`}
          href="/"
          uk-slider-item="previous"
        >
          <IconArrow className={Styles.iconLeft} />
        </a>
        <a
          className={`${Styles.buttonSlider} ${Styles.buttonSliderRight} uk-position-right`}
          href="/"
          uk-slider-item="next"
        >
          <IconArrow className={Styles.iconRight} />
        </a>
        <ul
          className={`${Styles.dotList} uk-slider-nav uk-dotnav uk-flex-center`}
        />
      </div>
    </div>
  </div>
);

export default BestProducts;
