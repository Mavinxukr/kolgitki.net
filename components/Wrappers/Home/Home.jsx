import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { withResponse } from '../../hoc/withResponse';
import { getTopGoods } from '../../../services/home';
import { userDataSelector } from '../../../utils/selectors';
import { IndexSlider } from '../../Slider/IndexSlider/IndexSlider';
import { TopGoodsSlider } from '../../Slider/TopGoodsSlider/TopGoodsSlider';
import { PopularCategoriesSlider } from '../../Slider/PopularCategoriesSlider/PopularCategoriesSlider';
import { InstagramSlider } from '../../Slider/InstagramSlider/InstagramSlider';

const Home = ({
  sliderData,
  popularCategories,
  collectionData,
  instagramData,
  isDesktopScreen,
  isDesctop,
  isTablet,
  isMobile
}) => {
  const [bestProducts, setBestProducts] = useState(null);
  const [indexSlider, setIndexSlider] = useState(0);
  const [indexTopGoodsSlider, setIndexTopGoodsSlider] = useState(0);

  const [indexSliderSettings, setIndexSliderSetting] = useState({
    infinite: true,
    autoplaySpeed: sliderData.filter(item => item.hasOwnProperty('delay'))[0]
      .delay,
    autoplay: true,
    arrows: false,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // afterChange: current => setIndexSlider(current),
    beforeChange: (rev, current) => setIndexSlider(current)
  });
  const [topGoodsSliderSetings, setTopGoodsSliderSetings] = useState({
    arrows: false,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: isDesctop ? 5 : isTablet ? 3 : 2,
    beforeChange: (rev, current) => setIndexTopGoodsSlider(current)
  });

  const router = useRouter();

  useEffect(() => {
    getTopGoods({}).then(response => setBestProducts(response.data));
  }, []);

  return (
    <MainLayout>
      <div className={styles.homeSliderWrapper}>
        <IndexSlider
          currentIndex={indexSlider}
          slides={sliderData.filter(item => item.hasOwnProperty('id'))}
          settings={indexSliderSettings}
        />
      </div>
      <div className={styles.bestProducts}>
        <h4 className={styles.bestTitle}>
          {parseText(cookies, 'Лучшие товары', 'Кращі товари')}
        </h4>
        {bestProducts && (
          <TopGoodsSlider
            slides={bestProducts}
            settings={topGoodsSliderSetings}
            currentIndex={indexTopGoodsSlider}
          />
        )}
      </div>
      <div className={styles.featuresWrapper}>
        <FeaturesCards classNameWrapper={styles.featuresCardWrapper} />
      </div>
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
              link={`/collection/${collectionData[0].slug}`}
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
                link={`/collection/${collectionData[1].slug}`}
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
                link={`/collection/${collectionData[2].slug}`}
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
              {popularCategories.slice(0, 2).map(item => {
                return <PopularCard key={item.id} item={item} />;
              })}
            </div>
            <div className={styles.cardsGroup}>
              {popularCategories.slice(2, 4).map(item => (
                <PopularCard router={router} key={item.id} item={item} />
              ))}
            </div>
          </div>
        )) || <PopularCategoriesSlider slides={popularCategories} />}
      </div>
      <div className={styles.instagramData}>
        {(isDesctop && (
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
        <InstagramSlider isMobile={isMobile} slides={instagramData} />
      </div>
    </MainLayout>
  );
};

Home.propTypes = {
  sliderData: PropTypes.arrayOf(PropTypes.object),
  popularCategories: PropTypes.arrayOf(PropTypes.object),
  collectionData: PropTypes.arrayOf(PropTypes.object),
  instagramData: PropTypes.arrayOf(PropTypes.object),
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Home);
