import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import DotsForSlider from '../DotsForSlider/DotsForSlider';
import IconClothes from '../../public/svg/clothes1.svg';
import IconSale from '../../public/svg/sale1.svg';
import IconDelivery from '../../public/svg/free-delivery1.svg';
import { withResponse } from '../hoc/withResponse';
import styles from './FeaturesCards.scss';
import UIKit from '../../public/uikit/uikit';

const Card = ({
  title, buttonTitle, children, route,
}) => (
  <li className={styles.card}>
    {children}
    <h4 className={styles.cardTitle}>{title}</h4>
    <hr className={styles.line} />
    <Link href={route} prefetch={false}>
      <a className={styles.cardButton}>{buttonTitle}</a>
    </Link>
  </li>
);

const FeaturesCardsWrapper = ({
  classNameWrapper,
  isMobileScreen,
  children,
}) => {
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
    <>
      {(!isMobileScreen && (
        <ul className={cx(styles.featuresCards, classNameWrapper)}>
          {children}
        </ul>
      )) || (
        <div
          ref={value}
          uk-slideshow="autoplay: true; pause-on-hover: true; min-height: 268; max-height: 268"
          className={cx(styles.featuresCardsSlider, classNameWrapper)}
        >
          <ul className="uk-slideshow-items">{children}</ul>
          <DotsForSlider
            slideIndex={slideIndex}
            slider={slider}
            sliderData={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            classNameWrapper={styles.dotListWrapper}
          />
        </div>
      )}
    </>
  );
};

const FeaturesCards = ({ classNameWrapper, isMobileScreen }) => (
  <FeaturesCardsWrapper
    classNameWrapper={classNameWrapper}
    isMobileScreen={isMobileScreen}
  >
    <Card
      title="Самовывоз из более 60 магазинов по Украине"
      buttonTitle="Показать магазины"
      route="/about/pick-up-points"
    >
      <IconClothes className={styles.icon} />
    </Card>
    <Card
      title="Низкие цены от производителя"
      buttonTitle="Все акции"
      route="/stock"
    >
      <IconSale className={styles.icon} />
    </Card>
    <Card
      title="Бесплатная доставка при заказе от 500 грн"
      buttonTitle="Выбрать товар"
      route="/Products"
    >
      <IconDelivery className={styles.icon} />
    </Card>
  </FeaturesCardsWrapper>
);

Card.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  children: PropTypes.node,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

FeaturesCards.propTypes = {
  classNameWrapper: PropTypes.string,
  isMobileScreen: PropTypes.bool,
};

FeaturesCardsWrapper.propTypes = {
  classNameWrapper: PropTypes.string,
  isMobileScreen: PropTypes.bool,
  children: PropTypes.node,
};

export default withResponse(FeaturesCards);
