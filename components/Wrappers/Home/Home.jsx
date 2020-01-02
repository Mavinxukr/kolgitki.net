import React from 'react';
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

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../Layout/Slider/Slider'),
  { ssr: false },
);

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

const stylesForSliderNav = {
  top: '86%',
  left: '50%',
  marginLeft: '-95px',
};

const styleForSliderButtonLeft = {
  top: '40%',
  left: '11px',
  marginTop: '-10px',
};

const styleForSliderButtonRight = {
  top: '40%',
  right: '11px',
  marginTop: '-10px',
};

const styleForSmallCard = {
  padding: '25px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '302px',
  bottom: '25px',
  left: '25px',
};

const styleForSmallCardGroup = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '6px',
};

const styleForBigCard = {
  padding: '40px',
  width: '279px',
  bottom: '40px',
  left: '30px',
};

const styleForBigCardGroup = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '30px',
};

const styleForBigCardWrapper = {
  width: '59.2%',
  height: '680px',
  position: 'relative',
};

const styleForSmallCardWrapper = {
  width: '100%',
  position: 'relative',
  height: '323px',
};

const Home = () => (
  <MainLayout>
    <DynamicComponentWithNoSSRSlider height="680px">
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
      <SliderNav styleForNav={stylesForSliderNav} />
    </DynamicComponentWithNoSSRSlider>
    <div className={styles.bestProducts}>
      <h2 className={styles.title}>Лучшее товары</h2>
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
            stylesForButton={styleForSliderButtonLeft}
            isRotate
          />
          <SliderButton
            buttonDirection="next"
            stylesForButton={styleForSliderButtonRight}
            isRotate={false}
          />
          <ul
            className={`${styles.dotList} uk-slider-nav uk-dotnav uk-flex-center`}
          />
        </div>
      </div>
    </div>
    <div className={styles.featuresCardWrapper}>
      <FeaturesCards />
    </div>
    <div className={styles.newCollection}>
      <h2 className={styles.title}> Новые коллекции</h2>
      <div className={styles.collectionCards}>
        <CollectionCard
          title="Колготки"
          collection="Зима 19-20 / Giulia"
          price="от 159 ₴"
          styleForCard={styleForBigCard}
          styleForGroup={styleForBigCardGroup}
          marginTopForLink="0"
          styleForCardWrapper={styleForBigCardWrapper}
          src="/images/MATT_40_image_1006465.png"
        />
        <div className={styles.smallCards}>
          <CollectionCard
            title="Колготки"
            collection="Зима 19-20 / Giulia"
            price="от 159 ₴"
            styleForCard={styleForSmallCard}
            styleForGroup={styleForSmallCardGroup}
            marginTopForLink="6px"
            styleForCardWrapper={styleForSmallCardWrapper}
            src="/images/shop_products_image_1000381.png"
          />
          <CollectionCard
            title="Колготки"
            collection="Зима 19-20 / Giulia"
            price="от 159 ₴"
            styleForCard={styleForSmallCard}
            styleForGroup={styleForSmallCardGroup}
            marginTopForLink="6px"
            styleForCardWrapper={styleForSmallCardWrapper}
            src="/images/shop_products_image_1001137.png"
          />
        </div>
      </div>
    </div>
    <div className={styles.popularCategories}>
      <h2 className={styles.title}>Популярные категории</h2>
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
        <h2 className={styles.title}>Kolgot.net в Инстаграм</h2>
        <a href="/" className={styles.instagramLink}>
          Открыть
        </a>
      </div>
      <div className={styles.images}>
        {
          photos.map(photo => <img key={photo.id} className={styles.image} src={photo.src} alt={photos.src} />)
        }
      </div>
    </div>
  </MainLayout>
);

export default Home;
