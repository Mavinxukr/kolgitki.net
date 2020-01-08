import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Home.scss';
import MainLayout from '../../Layout/Global/Global';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import SliderButton from '../../Layout/SliderButton/SliderButton';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import CollectionCard from '../../CollectionCard/CollectionCard';
import PopularCard from '../../PopularCard/PopularCard';
import { arrProducts } from './dataForProduct';
import { photos } from './dataFromInstagram';
import UIKit from '../../../public/uikit/uikit';

const DynamicComponentWithNoSSRSliderCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Slide = () => (
  <div className={styles.slide}>
    <div className={styles.infoBlock}>
      <h2 className={styles.slideTitle}>Скидки до -50% на все бренды</h2>
      <p className={styles.desc}>Зима 19-20 / Giulia</p>
      <button className={styles.button} type="button">
        Подробнее
      </button>
    </div>
  </div>
);

const Home = () => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  return (
    <MainLayout>
      <div
        ref={value}
        uk-slideshow="autoplay: true; pause-on-hover: true; autoplay-interval: 9000"
        className={styles.mainSlider}
      >
        <ul className={`${styles.list} uk-slideshow-items`}>
          <li className={styles.item}>
            <Slide />
          </li>
          <li className={styles.item}>
            <Slide />
          </li>
          <li className={styles.item}>
            <Slide />
          </li>
        </ul>
        <SliderNav
          index={index}
          sliderLength={sliderLength}
          classNameForNav={styles.sliderNav}
        />
      </div>
      <div className={styles.bestProducts}>
        <h4>Лучшее товары</h4>
        <div className={styles.slider}>
          <div
            className={`${styles.sliderWrapper} uk-position-relative uk-visible-toggle uk-light`}
            tabIndex="-1"
            uk-slider="true"
          >
            <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-5@m uk-grid">
              {arrProducts.map(item => (
                <li className={styles.cardSlider} key={item.id}>
                  <DynamicComponentWithNoSSRSliderCard item={item} />
                </li>
              ))}
            </ul>
            <SliderButton
              buttonDirection="previous"
              classNameForButton={styles.sliderButtonLeft}
              isRotate
            />
            <SliderButton
              buttonDirection="next"
              classNameForButton={styles.sliderButtonRight}
              isRotate={false}
            />
            <ul
              className={`${styles.dotList} uk-slider-nav uk-dotnav uk-flex-center`}
            />
          </div>
        </div>
      </div>
      <FeaturesCards classNameForWrapper={styles.featuresCardWrapper} />
      <div className={styles.newCollection}>
        <h4> Новые коллекции</h4>
        <div className={styles.collectionCards}>
          <CollectionCard
            title="Колготки"
            collection="Зима 19-20 / Giulia"
            price="от 159 ₴"
            src="/images/MATT_40_image_1006465.png"
            type="bigCard"
          />
          <div className={styles.smallCards}>
            <CollectionCard
              title="Колготки"
              collection="Зима 19-20 / Giulia"
              price="от 159 ₴"
              src="/images/shop_products_image_1000381.png"
              type="smallCard"
            />
            <CollectionCard
              title="Колготки"
              collection="Зима 19-20 / Giulia"
              price="от 159 ₴"
              src="/images/shop_products_image_1001137.png"
              type="smallCard"
            />
          </div>
        </div>
      </div>
      <div className={styles.popularCategories}>
        <h4>Популярные категории</h4>
        <div className={styles.popularCards}>
          <div className={styles.cardsGroup}>
            <PopularCard
              src="/images/POLA_60_image_1008201_2x.png"
              alt="pola"
              title="Колготки"
              price="95"
            />
            <PopularCard
              src="/images/CAPRI_SPORT_MELANGE_image_1006778.png"
              alt="capri"
              title="Спортивная одежда"
              price="420"
            />
          </div>
          <div className={styles.cardsGroup}>
            <PopularCard
              src="/images/CAPRI_SPORT_MELANGE_image_1006778.png"
              alt="capri"
              title="Спортивная одежда"
              price="420"
            />
            <PopularCard
              src="/images/POLA_60_image_1008201_2x.png"
              alt="pola"
              title="Колготки"
              price="95"
            />
          </div>
        </div>
      </div>
      <div className={styles.instagramData}>
        <div className={styles.instagramDataHeader}>
          <h4>Kolgot.net в Инстаграм</h4>
          <a href="/" className={styles.instagramLink}>
            Открыть
          </a>
        </div>
        <div className={styles.images}>
          {photos.map(photo => (
            <img
              key={photo.id}
              className={styles.image}
              src={photo.src}
              alt={photos.src}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
