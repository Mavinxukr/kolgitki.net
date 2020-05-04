import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Home.scss';
import MainLayout from '../../Layout/Global/Global';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import SliderButton from '../../Layout/SliderButton/SliderButton';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import CollectionCard from '../../CollectionCard/CollectionCard';
import PopularCard from '../../PopularCard/PopularCard';
import DotsForSlider from '../../DotsForSlider/DotsForSlider';
import { withResponse } from '../../hoc/withResponse';
import UIKit from '../../../public/uikit/uikit';

const DynamicComponentWithNoSSRSliderCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const HomeSlider = ({ sliderData, isDesktopScreen }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slider, setSlider] = useState(null);

  const value = useRef(null);

  useEffect(() => {
    setSlider(UIKit.slideshow(value.current));
  }, []);

  useEffect(() => {
    if (slider) {
      value.current.addEventListener('itemshow', () => {
        setSlideIndex(slider.index);
      });
    }
  }, [slider]);

  return (
    <div
      ref={value}
      uk-slideshow={`autoplay: true; pause-on-hover: true; autoplay-interval: ${
        sliderData[sliderData.length - 1].delay
      }; min-height: ${isDesktopScreen ? '541' : '375'}; max-height: ${
        isDesktopScreen ? '541' : '375'
      }`}
      className={styles.mainSlider}
    >
      <ul className="uk-slideshow-items">
        {sliderData.map((slide, index) => {
          if (index === sliderData.length - 1) {
            return;
          }
          return (
            <li key={slide.id}>
              <div className={styles.slide}>
                <picture className={styles.imageWrapper}>
                  <source
                    srcSet={slide.images.web_link}
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet={slide.images.tablet_link}
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet={slide.images.mobile_link}
                    media="(min-width: 320px)"
                  />
                  <img
                    className={styles.slideImage}
                    src={slide.images.web_link}
                    alt={slide.images.web_link}
                  />
                </picture>
                <div className={styles.infoBlock}>
                  <h2 className={styles.slideTitle}>{slide.name}</h2>
                  <p className={styles.desc}>{slide.description}</p>
                  <a className={styles.routeLink} href={slide.url}>
                    Подробнее
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {(isDesktopScreen && (
        <SliderNav
          index={slideIndex}
          sliderLength={sliderData.length - 1}
          classNameWrapper={styles.sliderNav}
        />
      )) || (
        <DotsForSlider
          slider={slider}
          sliderData={sliderData}
          slideIndex={slideIndex}
          classNameWrapper={styles.dotsWrapper}
          isHomeSlider
        />
      )}
    </div>
  );
};

const Home = ({
  sliderData,
  bestProductData,
  popularCategories,
  collectionData,
  instagramData,
  isDesktopScreen,
}) => (
  <MainLayout>
    <HomeSlider sliderData={sliderData} isDesktopScreen={isDesktopScreen} />
    <div className={styles.bestProducts}>
      <h4 className={styles.bestTitle}>Лучшее товары</h4>
      {(isDesktopScreen && (
        <div className={styles.slider}>
          <div
            className={`${styles.sliderWrapper} uk-position-relative uk-visible-toggle uk-light`}
            tabIndex="-1"
            uk-slider="autoplay: true"
          >
            <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-5@m uk-grid">
              {bestProductData.map(item => (
                <li className={styles.cardSlider} key={item.id}>
                  <DynamicComponentWithNoSSRSliderCard
                    classNameWrapper={styles.productCard}
                    item={item}
                  />
                </li>
              ))}
            </ul>
            <SliderButton
              buttonDirection="previous"
              classNameWrapper={styles.sliderButtonLeft}
              isRotate
            />
            <SliderButton
              buttonDirection="next"
              classNameWrapper={styles.sliderButtonRight}
              isRotate={false}
            />
            <ul
              className={`${styles.dotList} uk-slider-nav uk-dotnav uk-flex-center`}
            />
          </div>
        </div>
      )) || (
        <div className={styles.cards}>
          {bestProductData.map(item => (
            <DynamicComponentWithNoSSRSliderCard
              classNameWrapper={styles.card}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
    <FeaturesCards classNameWrapper={styles.featuresCardWrapper} />
    <div className={styles.newCollection}>
      <h4 className={styles.bestTitle}>Новые коллекции</h4>
      <div className={styles.collectionCards}>
        {collectionData.length > 0 && (
          <CollectionCard
            title={collectionData[0].name}
            collection={collectionData[0].description}
            price={collectionData[0].min_price}
            src={collectionData[0].image_link}
            type="bigCard"
          />
        )}
        {collectionData.length > 2 && (
          <div className={styles.smallCards}>
            <CollectionCard
              title={collectionData[1].name}
              collection={collectionData[1].description}
              price={collectionData[1].min_price}
              src={collectionData[1].image_link}
              type="smallCard"
            />
            <CollectionCard
              title={collectionData[2].name}
              collection={collectionData[2].description}
              price={collectionData[2].min_price}
              src={collectionData[2].image_link}
              type="smallCard"
            />
          </div>
        )}
      </div>
    </div>
    <div className={styles.popularCategories}>
      <h4 className={styles.bestTitle}>Популярные категории</h4>
      <div className={styles.popularCards}>
        <div className={styles.cardsGroup}>
          {popularCategories.slice(0, 2).map(item => (
            <PopularCard key={item.id} item={item} />
          ))}
        </div>
        <div className={styles.cardsGroup}>
          {popularCategories.slice(2, 4).map(item => (
            <PopularCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
    <div className={styles.instagramData}>
      {(isDesktopScreen && (
        <div className={styles.instagramDataHeader}>
          <h4>Kolgot.net в Инстаграм</h4>
          <a
            href="https://www.instagram.com/mavinxbids/"
            className={styles.instagramLink}
          >
            Открыть
          </a>
        </div>
      )) || (
        <a
          href="https://www.instagram.com/mavinxbids/"
          className={styles.instagramLinkMobile}
        >
          kolgot_net
        </a>
      )}
      {(isDesktopScreen && (
        <div className={styles.images}>
          {instagramData.map(photo => (
            <div className={styles.instagramImageWrapper} key={photo.id}>
              <img
                className={styles.image}
                src={photo.instagram_url}
                alt={photo.instagram_url}
              />
            </div>
          ))}
        </div>
      )) || (
        <div
          className={`${styles.sliderInstagramWrapper} uk-position-relative uk-visible-toggle uk-light`}
          uk-slider="autoplay: false; finite: true;"
        >
          <ul
            className={cx(
              styles.sliderInstagram,
              'uk-slider-items uk-child-width-1-2 uk-child-width-1-5@m uk-grid',
            )}
          >
            {instagramData.map(photo => (
              <li className={styles.cardSliderInstagram} key={photo.id}>
                <img
                  className={styles.image}
                  src={photo.instagram_url}
                  alt={photo.instagram_url}
                />
              </li>
            ))}
            <li />
          </ul>
        </div>
      )}
    </div>
  </MainLayout>
);

Home.propTypes = {
  sliderData: PropTypes.arrayOf(PropTypes.object),
  bestProductData: PropTypes.arrayOf(PropTypes.object),
  popularCategories: PropTypes.arrayOf(PropTypes.object),
  collectionData: PropTypes.arrayOf(PropTypes.object),
  instagramData: PropTypes.arrayOf(PropTypes.object),
  isDesktopScreen: PropTypes.bool,
};

HomeSlider.propTypes = {
  sliderData: PropTypes.arrayOf(PropTypes.object),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Home);
