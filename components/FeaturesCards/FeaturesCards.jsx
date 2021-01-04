import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import DotsForSlider from '../DotsForSlider/DotsForSlider';
import IconClothes from '../../public/svg/clothes1.svg';
import IconSale from '../../public/svg/sale1.svg';
import IconDelivery from '../../public/svg/free-delivery1.svg';
import { cookies } from '../../utils/getCookies';
import { createCleanUrl, parseText, setFiltersInCookies } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';
import styles from './FeaturesCards.scss';
import UIKit from '../../public/uikit/uikit';

const Card = ({
  title,
  buttonTitle,
  children,
  route,
  buttonTitleUk,
  titleUk,
  isMobileScreen,
  router,
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
              parseText(cookies, title, titleUk) === 'Низькі ціни від виробника',
          })}
        >
          {parseText(cookies, title, titleUk)}
        </h4>
        <hr className={styles.line} />
        {title === 'Бесплатная доставка при заказе от 500 грн' ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              setFiltersInCookies(cookies, { sort_date: 'desc' });
              router.push(
                '/Products',
                `/Products/${createCleanUrl(cookies).join('/')}`,
              );
            }}
            className={styles.cardButton}
          >
            {parseText(cookies, buttonTitle, buttonTitleUk)}
          </a>
        ) : (
          <Link href={route} prefetch={false}>
            <a className={styles.cardButton}>
              {parseText(cookies, buttonTitle, buttonTitleUk)}
            </a>
          </Link>
        )}
      </li>
    )}
  </>
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
        route="/Blog"
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
        route="/Products"
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
  router: PropTypes.object,
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
