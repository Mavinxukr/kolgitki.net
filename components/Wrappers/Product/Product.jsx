import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './Product.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import Counter from '../../Layout/Counter/Counter.jsx';
import Button from '../../Layout/Button/Button';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import Accordion from '../../Accordion/Accordion';
import { dataForSlider } from './dataForSlider';
import { arrProducts } from './dataProducts';
import { feedbacks } from './dataForFeedbacks';
import UIKit from '../../../public/uikit/uikit';
import IconLike from '../../../assets/svg/like-border.svg';
import IconStar from '../../../assets/svg/star.svg';
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

const Product = () => {
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
        <BreadCrumbs value={['Главная', '/ Колготки', '/ Pola 90 model 3']} />
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
                classNameForNav={styles.sliderNav}
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
              <div>
                <p className={styles.countAssessment}>
                  <span>
                    <IconStar className={styles.icon} />
                  </span>
                  <span>
                    <IconStar className={styles.icon} />
                  </span>
                  <span>
                    <IconStar className={styles.icon} />
                  </span>
                  <span>
                    <IconStar className={styles.icon} />
                  </span>
                  <span>
                    <IconStar className={styles.iconNoFill} />
                  </span>
                  <span className={styles.countFeedbacks}>(17)</span>
                </p>
                <button type="button" className={styles.addFeedback}>
                  Добавить отзыв
                </button>
              </div>
            </div>
            <hr className={`${styles.lineOne} ${styles.line}`} />
            <p className={styles.colors}>
              Цвета <span className={styles.color} />
            </p>
            <div className={styles.sizes}>
              <p className={styles.sizesTitle}>
                Размер <span className={styles.size}>1</span>
              </p>
              <p className={styles.sizeDesc}>Размерная сетка</p>
            </div>
            <div className={styles.counterBlock}>
              <p className={styles.countProductTitle}>Кол-во</p>
              <Counter />
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
                  classNameForCard={styles.similarProductsCard}
                  item={item}
                />
              ))}
            </div>
          </div>
          <div className={styles.dropdowns}>
            <ul className={styles.accordionList} uk-accordion="multiple: true">
              <Accordion title="Описание" id="desc">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Accordion>
              <Accordion title="Характеристики" id="characteristics">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Accordion>
              <Accordion title="Отзывы" id="feedbacks" count={15}>
                <div className={styles.dropdownBlock}>
                  {feedbacks.map(item => (
                    <article key={item.id} className={styles.dropdownItem}>
                      <div className={styles.dropdownFeedback}>
                        <p>
                          <span>
                            <IconStar className={styles.iconStar} />
                          </span>
                          <span>
                            <IconStar className={styles.iconStar} />
                          </span>
                          <span>
                            <IconStar className={styles.iconStar} />
                          </span>
                          <span>
                            <IconStar className={styles.iconStar} />
                          </span>
                          <span>
                            <IconStar className={styles.iconStar} />
                          </span>
                        </p>
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
              <Accordion title="Доставка и Оплата" id="info">
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
              <div key={item.id} className={styles.seenProductsCard}>
                <DynamicComponentWithNoSSRProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.featuresCardsWrapper}>
          <FeaturesCards />
        </div>
      </div>
    </MainLayout>
  );
};

export default Product;
