import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { addToFavourite } from '../../../redux/actions/favourite';
import {
  getCorrectWordCount,
  parseText,
  getCountProducts,
  calculateProcents,
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import Rating from '../Rating/Rating';
import IconLeftArrow from '../../../public/svg/Path8.svg';
import IconRightArrow from '../../../public/svg/Path7.svg';
import IconLike from '../../../public/svg/like-border.svg';
import { withResponse } from '../../hoc/withResponse';
import styles from './ProductCard.scss';

const ProductCard = ({
  item: {
    id,
    name,
    name_uk,
    price,
    colors,
    new_price,
    isFavorite,
    img_link,
    categories,
    stars,
    price_for_3,
    labels,
    count,
  },
  classNameWrapper,
  isMobileScreen,
  isDesktopScreen,
  height,
}) => {
  const [isAddFavourite, setIsAddFavourite] = useState(false);

  const sliderDataArr = [{ id: 9, good_img_link: img_link }, ...colors];

  const dispatch = useDispatch();

  const classNameForButton = cx(
    cx({
      [styles.buttonAddToFavourite]: isDesktopScreen,
      [styles.buttonAddToFavouriteMobile]: isMobileScreen,
    }),
    {
      [styles.buttonAddToFavouriteSelect]: isFavorite || isAddFavourite,
    },
  );

  const classNameForIcon = cx(styles.likeIcon, {
    [styles.likeIconSelect]: isFavorite || isAddFavourite,
  });

  return (
    <article className={cx(styles.card, classNameWrapper)}>
      {!!labels.length && isDesktopScreen && (
        <ul className={styles.labels}>
          {labels.map((item, index) => (
            <li
              className={cx(styles.labelsItem, {
                [styles.labelsItemWithOpacity]: index !== labels.length - 1,
              })}
              key={item.id}
            >
              <p className={styles.labelsText}>
                {parseText(cookies, item.text, item.text_ua)}
              </p>
            </li>
          ))}
        </ul>
      )}
      {(isDesktopScreen && (
        <div
          uk-slideshow={`ratio: 7:3, pause-on-hover: true;max-height: ${height};min-height: ${height}`}
          className={styles.slider}
          data-title={parseText(cookies, name, name_uk)}
        >
          <ul className={`${styles.list} uk-slideshow-items`}>
            {sliderDataArr.map(item => (
              <li key={item.id}>
                <Link
                  href="/Products/[pid]"
                  as={`/Products/${id}`}
                  prefetch={false}
                  passHref
                >
                  <img
                    className={styles.sliderImage}
                    src={item.good_img_link}
                    alt={item.good_img_link}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/"
            className={styles.buttonLeft}
            uk-slideshow-item="previous"
          >
            <IconLeftArrow />
          </a>
          <a href="/" className={styles.buttonRight} uk-slideshow-item="next">
            <IconRightArrow />
          </a>
          <Link
            href="/Products/[pid]"
            as={`/Products/${id}`}
            prefetch={false}
            passHref
          >
            <a className={styles.linkBuy}>
              {parseText(cookies, 'Купить', 'Купити')}
            </a>
          </Link>
        </div>
      )) || (
        <div className={styles.wrappersView}>
          <Link
            href="/Products/[pid]"
            as={`/Products/${id}`}
            prefetch={false}
            replace
            shallow={false}
          >
            <div className={styles.imageMobileWrapper}>
              <img
                src={img_link}
                alt={img_link}
                className={styles.sliderImage}
              />
            </div>
          </Link>
          <button
            type="button"
            className={classNameForButton}
            disabled={isAddFavourite || isFavorite}
            onClick={() => {
              dispatch(addToFavourite({}, { good_id: id }));
              setIsAddFavourite(true);
            }}
          >
            <IconLike className={classNameForIcon} />
          </button>
        </div>
      )}
      <div className={styles.content}>
        <h6>{parseText(cookies, name, name_uk)}</h6>
        {isMobileScreen && (
          <p className={styles.categoryName}>
            {parseText(cookies, categories[0].name, categories[0].name_ua)}
          </p>
        )}
        {isMobileScreen && stars && (
          <Rating classNameWrapper={styles.ratingWrapper} amountStars={stars} />
        )}
        <div className={styles.contentInfo}>
          {new_price ? (
            <div className={styles.prices}>
              <div className={styles.pricesWrapper}>
                <p className={styles.contentNewPrice}>{new_price} грн.</p>
                <p  className={styles.contentNewPrice}>-{calculateProcents(new_price, price)}%</p>
                <p className={styles.contentOldPrice}>{price} грн.</p>
              </div>
              {price_for_3 && (
                <p className={styles.priceForThree}>
                  {parseText(cookies, 'или', 'або')} 3/{price_for_3} грн.
                </p>
              )}
            </div>
          ) : (
            <div className={styles.prices}>
              <p className={styles.contentPrice}>{price} грн.</p>
              {price_for_3 && (
                <p className={styles.priceForThree}>
                  {parseText(cookies, 'или', 'або')} 3/{price_for_3} грн.
                </p>
              )}
            </div>
          )}
          <p>
            {getCorrectWordCount(
              colors.length,
              parseText(
                cookies,
                ['цвет', 'цвета', 'цветов'],
                ['колір', 'кольори', 'кольорів'],
              ),
            )}
          </p>
        </div>
        {count <= 3 && (
          <p className={styles.countProducts}>{getCountProducts(count)}</p>
        )}
        {isDesktopScreen && (
          <div className={styles.colors}>
            <div>
              {colors.map(item => (
                <span
                  className={cx({
                    [styles.withBorder]: item.color.name === 'White',
                  })}
                  key={item.id}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '6px',
                    background: item.color.hex
                      ? `${item.color.hex}`
                      : `url(${item.color.img_link})`,
                    display: 'inline-block',
                    marginRight: '7px',
                  }}
                />
              ))}
            </div>
            {cookies.get('token') && (
              <button
                type="button"
                className={classNameForButton}
                disabled={isAddFavourite || isFavorite}
                onClick={() => {
                  dispatch(addToFavourite({}, { good_id: id }));
                  setIsAddFavourite(true);
                }}
              >
                <IconLike className={classNameForIcon} />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    name_uk: PropTypes.string,
    price: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.object),
    isFavorite: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.object),
    stars: PropTypes.number,
    img_link: PropTypes.string,
    new_price: PropTypes.number,
    price_for_3: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
  }),
  classNameWrapper: PropTypes.string,
  isMobileScreen: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
  height: PropTypes.number,
};

export default withResponse(ProductCard);
