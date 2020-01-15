import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import styles from './Product.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import Counter from '../../Layout/Counter/Counter.jsx';
import Button from '../../Layout/Button/Button';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import Accordion from '../../Accordion/Accordion';
import Rating from '../../Layout/Rating/Rating';
import { dataForSlider } from './dataForSlider';
import { arrProducts } from './dataProducts';
import { feedbacks } from './dataForFeedbacks';
import UIKit from '../../../public/uikit/uikit';
import IconLike from '../../../assets/svg/like-border.svg';
import IconClothes from '../../../assets/svg/clothes1.svg';
import IconSale from '../../../assets/svg/sale1.svg';
import IconDelivery from '../../../assets/svg/free-delivery1.svg';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const ButtonShowSlide = ({ goToSlide, id }) => (
  <button onClick={() => goToSlide(id)} className={styles.button} type="button">
    <img src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
  </button>
);

const Product = ({ commentsData }) => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  let slider;

  const value = useRef(null);

  useEffect(() => {
    slider = UIKit.slideshow(value.current);
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  const goToSlide = (id) => {
    slider = UIKit.slideshow(value.current);
    slider.show(id);
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs items={['Главная', 'Колготки', 'Pola 90 model 3']} />
        <div className={styles.productData}>
          <div className={styles.productSlider}>
            <div className={styles.addPhotos}>
              <ButtonShowSlide goToSlide={goToSlide} id={1} />
              <ButtonShowSlide goToSlide={goToSlide} id={2} />
            </div>
            <div
              ref={value}
              uk-slideshow="pause-on-hover: true"
              className={styles.slider}
            >
              <ul className={`uk-slideshow-items ${styles.list}`}>
                {dataForSlider.map(slide => (
                  <li className={styles.item} key={slide.id}>
                    <img
                      className={styles.image}
                      src={slide.src}
                      alt={slide.src}
                    />
                  </li>
                ))}
              </ul>
              <SliderNav
                index={index}
                sliderLength={sliderLength}
                classNameWrapper={styles.sliderNav}
              />
            </div>
          </div>
          <div className={styles.productDetails}>
            <div className={styles.productDetailsHeader}>
              <div>
                <h4>
                  Rio 150 model 5{' '}
                  <span className={styles.addInfo}>KT-1005989</span>
                </h4>
                <p className={styles.descModel}>
                  Тонкие колготки с кружевным поясом Giulia™
                </p>
              </div>
              <button className={styles.buttonLike} type="button">
                <IconLike className={styles.iconLike} />
              </button>
            </div>
            <div className={styles.addInfoBlock}>
              <p className={styles.price}>129,00 ₴</p>
              <div className={styles.ratingWrapper}>
                <Rating amountStars={4} classNameWrapper={styles.countAssessment} />
                <span className={styles.countFeedbacks}>({commentsData.length})</span>
                <button type="button" className={styles.addFeedback}>
                  Добавить отзыв
                </button>
              </div>
            </div>
            <hr className={`${styles.lineOne} ${styles.line}`} />
            <div className={styles.colors}>
              <h6>Цвета</h6>
              <div className={styles.buttonsColor}>
                <button type="button" className={styles.buttonColor} />
              </div>
            </div>
            <div className={styles.sizes}>
              <div className={styles.sizesFirstBlock}>
                <h6>Размер</h6>
                <div className={styles.buttonsSize}>
                  <button type="button" className={styles.buttonSize}>
                    1
                  </button>
                </div>
              </div>
              <p>Размерная сетка</p>
            </div>
            <div className={styles.counterBlock}>
              <h6>Кол-во</h6>
              <Counter classNameForCounter={styles.counter} />
            </div>
            <hr className={`${styles.lineTwo} ${styles.line}`} />
            <div className={styles.controllButtons}>
              <Button
                width="51%"
                title="Добавить в корзину"
                buttonType="button"
                viewType="black"
              />
              <Button
                width="46%"
                title="Купить в один клик"
                buttonType="button"
                viewType="white"
              />
            </div>
            <button type="button" className={styles.subscribeButton}>
              Подписаться на оповещение по цене
            </button>
            <div className={styles.featuresBlock}>
              <article className={styles.featuresItem}>
                <IconClothes className={styles.featuresIcon} />
                <p className={styles.featuresDesc}>
                  Самовывоз из более 60 <br />
                  магазинов по Украине
                </p>
              </article>
              <article className={styles.featuresItem}>
                <IconSale className={styles.featuresIcon} />
                <p className={styles.featuresDesc}>
                  Низкие цены <br />
                  от производителя
                </p>
              </article>
              <article className={styles.featuresItem}>
                <IconDelivery className={styles.featuresIcon} />
                <p className={styles.featuresDesc}>
                  Бесплатная доставка <br />
                  при заказе от 500 грн
                </p>
              </article>
            </div>
          </div>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.similarProducts}>
            <h4 className={styles.title}>Похожие товары</h4>
            <div className={styles.similarProductsContent}>
              {arrProducts.map(item => (
                <DynamicComponentWithNoSSRProductCard
                  key={item.id}
                  classNameWrapper={styles.similarProductsCard}
                  item={item}
                />
              ))}
            </div>
          </div>
          <div className={styles.dropdowns}>
            <ul className={styles.accordionList} uk-accordion="multiple: true">
              <Accordion title="Описание">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Accordion>
              <Accordion title="Характеристики">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Accordion>
              <Accordion title="Отзывы" count={commentsData.length}>
                <div className={styles.dropdownBlock}>
                  {feedbacks.map(item => (
                    <article key={item.id} className={styles.dropdownItem}>
                      <div className={styles.dropdownFeedback}>
                        <Rating amountStars={item.countStar} />
                        <p className={styles.dropdownMessage}>{item.message}</p>
                      </div>
                      <h2 className={styles.dropdownName}>{item.name}</h2>
                    </article>
                  ))}
                </div>
                <button type="button" className={styles.dropdownButton}>
                  Добавить свой отзыв
                </button>
              </Accordion>
              <Accordion title="Доставка и Оплата">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Accordion>
            </ul>
          </div>
        </div>
        <div className={styles.seenProducts}>
          <h4 className={styles.titleSeenProduct}>Просмотренные</h4>
          <div className={styles.seenProductsContent}>
            {arrProducts.map(item => (
              <DynamicComponentWithNoSSRProductCard
                classNameWrapper={styles.seenProductsCard}
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
        <FeaturesCards classNameWrapper={styles.featuresCardsWrapper} />
      </div>
    </MainLayout>
  );
};

Product.propTypes = {
  commentsData: PropTypes.arrayOf(PropTypes.object),
};

ButtonShowSlide.propTypes = {
  goToSlide: PropTypes.func,
  id: PropTypes.number,
};

export default Product;
