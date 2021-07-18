import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import DotsForSlider from '../DotsForSlider/DotsForSlider';
import IconClothes from '../../public/svg/clothes1.svg';
import IconSale from '../../public/svg/sale1.svg';
import IconDelivery from '../../public/svg/free-delivery1.svg';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';
import styles from './FeaturesCards.scss';

const Card = ({
  title,
  buttonTitle,
  children,
  route,
  buttonTitleUk,
  titleUk,
  isMobileScreen,
  router
}) => (
  <>
    {(isMobileScreen && (
      <Link href={route} prefetch={false}>
        <li className={styles.card}>
          {children}
          <h4 className={styles.cardTitle}>
            {parseText(cookies, title, titleUk)}
          </h4>
          <hr className={styles.line} />
          <Link href={route} prefetch={false}>
            <a className={styles.cardButton}>
              {parseText(cookies, buttonTitle, buttonTitleUk)}
            </a>
          </Link>
        </li>
      </Link>
    )) || (
      <li className={styles.card}>
        {children}
        <h4
          className={cx(styles.cardTitle, {
            [styles.evenChildUa]:
              parseText(cookies, title, titleUk) === 'Низькі ціни від виробника'
          })}
        >
          {parseText(cookies, title, titleUk)}
        </h4>
        <hr className={styles.line} />
        <Link href={route} prefetch={false}>
          <a className={styles.cardButton}>
            {parseText(cookies, buttonTitle, buttonTitleUk)}
          </a>
        </Link>
      </li>
    )}
  </>
);

const FeaturesCardsWrapper = ({
  classNameWrapper,
  isMobileScreen,
  children
}) => {
  const [slideIndex, setIndexSlider] = useState(0);
  const [slider, setSlider] = useState(null);
  const sliderRef = useRef();

  const settings = {
    infinite: true,
    arrows: false,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (rev, current) => setIndexSlider(current)
  };

  return (
    <>
      {(!isMobileScreen && (
        <ul className={cx(styles.featuresCards, classNameWrapper)}>
          {children}
        </ul>
      )) || (
        <div
          className={cx(
            styles.featuresCardsSlider,
            styles.slider,
            classNameWrapper
          )}
        >
          <Slider
            className={styles.slider__wrapper}
            ref={sliderRef}
            {...settings}
          >
            {children}
          </Slider>
          <div className={styles.slider__dots}>
            {children.map((_, index) => (
              <span
                key={index}
                onClick={() => sliderRef.current.slickGoTo(index)}
                className={cx(styles.slider__dot, {
                  [styles.slider__dot__active]: index == slideIndex
                })}
              ></span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const FeaturesCards = ({ classNameWrapper, isMobileScreen }) => {
  const router = useRouter();

  return (
    <FeaturesCardsWrapper
      classNameWrapper={classNameWrapper}
      isMobileScreen={isMobileScreen}
    >
      <Card
        title="157 245 довольных клиентов"
        titleUk="157 245 задоволених клієнтів"
        buttonTitle="Подробнее"
        buttonTitleUk="Докладніше"
        route="/blog"
        router={router}
        isMobileScreen={isMobileScreen}
      >
        <IconClothes className={styles.icon} />
      </Card>
      <Card
        title="Низкие цены от производителя"
        titleUk="Низькі ціни від виробника"
        buttonTitle="Все акции"
        buttonTitleUk="Всі акції"
        route="/stock"
        isMobileScreen={isMobileScreen}
        router={router}
      >
        <IconSale className={styles.icon} />
      </Card>
      <Card
        title="Бесплатная доставка при заказе от 500 грн"
        titleUk="Безкоштовна доставка при замовленні від 500 грн"
        buttonTitle="Выбрать товар"
        buttonTitleUk="Вибрати товар"
        route="/products"
        router={router}
        isMobileScreen={isMobileScreen}
      >
        <IconDelivery className={styles.icon} />
      </Card>
    </FeaturesCardsWrapper>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonTitleUk: PropTypes.string,
  isMobileScreen: PropTypes.bool,
  titleUk: PropTypes.string,
  children: PropTypes.node,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  router: PropTypes.object
};

FeaturesCards.propTypes = {
  classNameWrapper: PropTypes.string,
  isMobileScreen: PropTypes.bool
};

FeaturesCardsWrapper.propTypes = {
  classNameWrapper: PropTypes.string,
  isMobileScreen: PropTypes.bool,
  children: PropTypes.node
};

export default withResponse(FeaturesCards);
