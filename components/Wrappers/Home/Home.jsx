import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './Home.scss';
import MainLayout from '../../Layout/Global/Global';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import SliderButton from '../../Layout/SliderButton/SliderButton';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import CollectionCard from '../../CollectionCard/CollectionCard';
import PopularCard from '../../PopularCard/PopularCard';
import DotsForSlider from '../../DotsForSlider/DotsForSlider';
import { withResponse } from '../../hoc/withResponse';
import { getTopGoods } from '../../../services/home';
import UIKit from '../../../public/uikit/uikit';
import { userDataSelector } from '../../../utils/selectors';

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
      }; min-height: ${isDesktopScreen ? '658' : '375'}; max-height: ${
        isDesktopScreen ? '658' : '375'
      }`}
      className={styles.mainSlider}
    >
      <ul className={cx(styles.sliderContainer, 'uk-slideshow-items')}>
        {sliderData.map((slide, index) => {
          if (index === sliderData.length - 1) {
            return;
          }

          return (
            <li key={slide.id} className={styles.sliderItem}>
              {(isDesktopScreen && (
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
                    <h2 className={styles.slideTitle}>
                      {parseText(cookies, slide.name, slide.name_ua)}
                    </h2>
                    <p className={styles.desc}>
                      {parseText(
                        cookies,
                        slide.description,
                        slide.description_ua,
                      )}
                    </p>
                    <a className={styles.routeLink} href={slide.url}>
                      {parseText(cookies, 'Подробнее', 'Докладніше')}
                    </a>
                  </div>
                </div>
              )) || (
                <a href={slide.url} className={styles.slide}>
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
                    <h2 className={styles.slideTitle}>
                      {parseText(cookies, slide.name, slide.name_ua)}
                    </h2>
                    <p className={styles.desc}>
                      {parseText(
                        cookies,
                        slide.description,
                        slide.description_ua,
                      )}
                    </p>
                    <a className={styles.routeLink} href={slide.url}>
                      {parseText(cookies, 'Подробнее', 'Докладніше')}
                    </a>
                  </div>
                </a>
              )}
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
  popularCategories,
  collectionData,
  instagramData,
  isDesktopScreen,
}) => {
  const [bestProducts, setBestProducts] = useState(null);
  const router = useRouter();
  const userData = useSelector(userDataSelector);

  useEffect(() => {
    getTopGoods({}).then(response => setBestProducts(response.data));
  }, []);

  return (
    <MainLayout>
      <HomeSlider sliderData={sliderData} isDesktopScreen={isDesktopScreen} />
      <div className={styles.bestProducts}>
        <h4 className={styles.bestTitle}>
          {parseText(cookies, 'Лучшие товары', 'Кращі товари')}
        </h4>
        <div className={styles.slider}>
          <div
            className={`${styles.sliderWrapper} uk-light`}
            tabIndex="-1"
            uk-slider={`finite: ${(isDesktopScreen && true)
              || false}; autoplay: false;`}
          >
            <div className={styles.sliderBestProductsWrapper}>
              <ul className={cx('uk-slider-items uk-grid', styles.sliderList)}>
                {bestProducts
                  && bestProducts.map(item => (
                    <li className={styles.cardSlider} key={item.id}>
                      <DynamicComponentWithNoSSRSliderCard
                        classNameWrapper={styles.productCard}
                        item={item}
                        isSimpleProduct
                        userDataId={userData?.role?.id}
                      />
                    </li>
                  ))}
              </ul>
            </div>
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
            {isDesktopScreen && (
              <ul
                className={`${styles.dotList} uk-slider-nav uk-dotnav uk-flex-center`}
              />
            )}
          </div>
        </div>
      </div>
      <FeaturesCards classNameWrapper={styles.featuresCardWrapper} />
      <div className={styles.newCollection}>
        <h4 className={styles.bestTitle}>
          {parseText(cookies, 'Новые коллекции', 'Нові колекції')}
        </h4>
        <div className={styles.collectionCards}>
          {collectionData.length > 0 && (
            <CollectionCard
              title={collectionData[0].name}
              titleUk={collectionData[0].name_ua}
              collection={collectionData[0].description}
              collectionUk={collectionData[0].description_ua}
              price={collectionData[0].min_price}
              src={collectionData[0].image_link}
              type="bigCard"
              id={collectionData[0].id}
              slug={collectionData[0].slug}
              router={router}
            />
          )}
          {collectionData.length > 2 && (
            <div className={styles.smallCards}>
              <CollectionCard
                title={collectionData[1].name}
                titleUk={collectionData[1].name_ua}
                collection={collectionData[1].description}
                collectionUk={collectionData[1].description_ua}
                price={collectionData[1].min_price}
                src={collectionData[1].image_link}
                type="smallCard"
                id={collectionData[1].id}
                slug={collectionData[1].slug}
                router={router}
              />
              <CollectionCard
                title={collectionData[2].name}
                titleUk={collectionData[2].name_ua}
                collection={collectionData[2].description}
                collectionUk={collectionData[2].description_ua}
                price={collectionData[2].min_price}
                src={collectionData[2].image_link}
                type="smallCard"
                id={collectionData[2].id}
                slug={collectionData[2].slug}
                router={router}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.popularCategories}>
        <h4 className={styles.bestTitle}>
          {parseText(cookies, 'Популярные категории', 'Популярні категорії')}
        </h4>
        {(isDesktopScreen && (
          <div className={styles.popularCards}>
            <div className={styles.cardsGroup}>
              {popularCategories.slice(0, 2).map(item =>  (
                <PopularCard router={router} key={item.id} item={item} />
              ))}
            </div>
            <div className={styles.cardsGroup}>
              {popularCategories.slice(2, 4).map(item => (
                <PopularCard router={router} key={item.id} item={item} />
              ))}
            </div>
          </div>
        )) || (
          <div
            className={`${styles.popularSliderWrapper} uk-position-relative uk-visible-toggle uk-light`}
            uk-slider="finite: true; autoplay: false;"
          >
            <ul
              className={cx(
                styles.popularSlider,
                'uk-slider-items uk-child-width-1-1 uk-grid',
              )}
            >
              {popularCategories.map(item => (
                <li className={styles.popularCardSlider} key={item.id}>
                  <PopularCard item={item} />
                </li>
              ))}
              <li />
            </ul>
          </div>
        )}
      </div>
      <div className={styles.instagramData}>
        {(isDesktopScreen && (
          <div className={styles.instagramDataHeader}>
            <h4>Kolgot.net в {parseText(cookies, 'Инстаграм', 'Інстаграм')}</h4>
            <a
              href="https://www.instagram.com/mavinxbids/"
              className={styles.instagramLink}
            >
              {parseText(cookies, 'Открыть', 'Відкрити')}
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
                  <a href="https://www.instagram.com/mavinxbids/">
                    <img
                      className={styles.image}
                      src={photo.instagram_url}
                      alt={photo.instagram_url}
                    />
                  </a>
                </li>
              ))}
              <li />
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

Home.propTypes = {
  sliderData: PropTypes.arrayOf(PropTypes.object),
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
