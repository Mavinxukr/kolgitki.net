import React from 'react';
import dynamic from 'next/dynamic';
import { arrProducts } from './dataForProduct';
import IconArrow from '../../../assets/svg/Group 621.svg';
import Styles from './BestProducts.module.scss';
import '../../../public/uikit/uikit.js';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../UIComponents/BestProductCard/BestProductCard'),
  { ssr: false },
);


const BestProducts = () => (
  <div className={Styles.BestProducts}>
    <h2 className={Styles.BestProducts__Title}>Лучшее товары</h2>
    <div className={Styles.BestProducts__Slider}>
      <div className={`${Styles.BestProducts__SliderWrapper} uk-position-relative uk-visible-toggle uk-light`} tabIndex="-1" uk-slider="true">

        <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-5@m uk-grid">
          {
            arrProducts.map(item => (
              <li className={Styles.BestProducts__Card} key={item.id}>
                <DynamicComponentWithNoSSRSlider item={item} />
              </li>
            ))
          }
        </ul>
        <a
          className={`${Styles.BestProducts__ButtonSlider} uk-position-left`}
          href="/"
          uk-slider-item="previous"
        >
          <IconArrow className={Styles.BestProducts__IconLeft} />
        </a>
        <a
          className={`${Styles.BestProducts__ButtonSlider} ${Styles.BestProducts__ButtonSliderRight} uk-position-right`}
          href="/"
          uk-slider-item="next"
        >
          <IconArrow className={Styles.BestProducts__IconRight} />
        </a>
        <ul className={`${Styles.BestProducts__DotList} uk-slider-nav uk-dotnav uk-flex-center`}></ul>
      </div>
    </div>
  </div>
);

export default BestProducts;
