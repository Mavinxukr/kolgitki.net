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
  getCorrectPrice,
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import Rating from '../Rating/Rating';
import IconLeftArrow from '../../../public/svg/Path8.svg';
import IconRightArrow from '../../../public/svg/Path7.svg';
import IconLike from '../../../public/svg/like-border.svg';
import IconHint from '../../../public/svg/Group2966.svg';
import { withResponse } from '../../hoc/withResponse';
import styles from './ProductCard.scss';

const PriceItem = ({ new_price, price, price_for_3 }) => (
  <>
    {new_price ? (
      <div className={styles.prices}>
        <p className={styles.contentOldPrice}>{getCorrectPrice(price)} грн.</p>
        <p className={styles.contentNewPrice}>{`${getCorrectPrice(new_price)} грн.`}</p>
        <p className={styles.contentNewPrice}>
          -{calculateProcents(new_price, price)}%
        </p>
        {price_for_3 && (
          <p className={styles.priceForThree}>
            {parseText(cookies, 'или', 'або')} 3/{getCorrectPrice(price_for_3)} грн.
          </p>
        )}
      </div>
    ) : (
      <div className={styles.prices}>
        <p className={styles.contentPrice}>{getCorrectPrice(price)} грн.</p>
        {price_for_3 && (
          <p className={styles.priceForThree}>
            {parseText(cookies, 'или', 'або')} 3/{getCorrectPrice(price_for_3)} грн.
          </p>
        )}
      </div>
    )}
  </>
);

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
    preview_ru,
    preview_uk,
    help,
    help_title,
    help_title_uk,
    help_uk,
  },
  classNameWrapper,
  isMobileScreen,
  isDesktopScreen,
  isSimpleProduct,
  isSpecialProduct,
  isScreenForProduct,
  isScreenForProductSmall,
}) => {
  const [isAddFavourite, setIsAddFavourite] = useState(false);

  const sliderDataArr = [{ id: 9, good_img_link: img_link }, ...colors];

  const dispatch = useDispatch();

  const getHeightForCardImage = () => {
    switch (true) {
      case isSimpleProduct && isScreenForProductSmall:
        return 486;
      case isSimpleProduct && isScreenForProduct:
        return 393;
      case isSimpleProduct:
        return 338;
      case isSpecialProduct:
        return 400;
      default:
        return 338;
    }
  };

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
      {isDesktopScreen && (
        <div className={styles.hintWrapper}>
          <IconHint className={styles.hintIcon} />
          <div className={styles.hintHoverBlock}>
            <div className={styles.hint}>
              <h4 className={styles.hintTitle}>{parseText(cookies, help_title, help_title_uk)}</h4>
              <p className={styles.hintDesc}>
                {parseText(cookies, help, help_uk)}
              </p>
              <Link
                href="/Products/[pid]"
                as={`/Products/${id}`}
                prefetch={false}
                passHref
              >
                <a className={styles.hintLink}>
                  {parseText(cookies, 'Подробнее', 'Детальніше')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
      {(isDesktopScreen && (
        <div
          uk-slideshow={`ratio: 7:3, pause-on-hover: true; min-height: ${getHeightForCardImage()}`}
          className={styles.slider}
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
        <h6 className={styles.title}>{parseText(cookies, name, name_uk)}</h6>
        {isDesktopScreen && (
          <>
            <p className={styles.categoryName}>
              {parseText(cookies, name, name_uk)}
            </p>
            {preview_ru && (
              <p className={styles.descModel}>
                {parseText(cookies, preview_ru, preview_uk)}
              </p>
            )}
            <div className={styles.info}>
              <Rating
                classNameWrapper={styles.ratingWrapperDesktop}
                amountStars={stars}
              />
              <p className={styles.countColors}>
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
          </>
        )}
        {isMobileScreen && (
          <Rating classNameWrapper={styles.ratingWrapper} amountStars={stars} />
        )}
        <div className={styles.contentInfo}>
          <PriceItem
            price={price}
            new_price={new_price}
            price_for_3={price_for_3}
          />
          <p className={styles.colorBlock}>
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
        {isDesktopScreen && count <= 3 && (
          <p className={styles.countProducts}>{getCountProducts(count)}</p>
        )}
        {isDesktopScreen && (
          <div className={styles.colors}>
            <PriceItem
              price={price}
              new_price={new_price}
              price_for_3={price_for_3}
            />
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
    preview_ru: PropTypes.number,
    preview_uk: PropTypes.number,
    help: PropTypes.string,
    help_title: PropTypes.string,
    help_title_uk: PropTypes.string,
    help_uk: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
  isMobileScreen: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
  isSimpleProduct: PropTypes.bool,
  isSpecialProduct: PropTypes.bool,
  isScreenForProduct: PropTypes.bool,
  isScreenForProductSmall: PropTypes.bool,
};

export default withResponse(ProductCard);
