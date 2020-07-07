import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './GiftProductCard.scss';
import IconLike from '../../../public/svg/like-border.svg';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import { addToFavourite } from '../../../redux/actions/favourite';
import { withResponse } from '../../hoc/withResponse';

const GiftProductCard = ({
  item: {
    id, name, name_ua, price, colors, new_price, isFavorite, img_link, goods,
  },
  classNameWrapper,
  isDesktopScreen,
  isMobileScreen,
}) => {
  const [isAddFavourite, setIsAddFavourite] = useState(false);
  const sliderDataArr = [{ id: 9, present_img_link: img_link }, ...colors];

  const dispatch = useDispatch();

  const router = useRouter();

  const classNameForButton = cx(
    cx({
      [styles.buttonLike]: isDesktopScreen,
      [styles.buttonLikeMobile]: isMobileScreen,
    }),
    {
      [styles.buttonAddToFavouriteSelect]: isFavorite || isAddFavourite,
    },
  );

  const classIconLike = cx(styles.likeIcon, {
    [styles.likeIconSelect]:
      (isAddFavourite && isDesktopScreen) || (isFavorite && isDesktopScreen),
    [styles.likeIconSelectMobile]:
      (isAddFavourite && isMobileScreen) || (isFavorite && isMobileScreen),
  });

  return (
    <article className={cx(styles.card, classNameWrapper)}>
      {(isDesktopScreen && (
        <div
          uk-slideshow="ratio: 7:3, pause-on-hover: true"
          className={styles.slider}
        >
          <ul className={`${styles.list} uk-slideshow-items`}>
            {sliderDataArr.map(image => (
              <li key={image.id}>
                <Link
                  href={{
                    pathname: `/Products/${id}`,
                    query: {
                      present: true,
                    },
                  }}
                  prefetch={false}
                  passHref
                >
                  <img
                    className={styles.sliderImage}
                    src={image.present_img_link}
                    alt={image.present_img_link}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/"
            className={styles.buttonLeft}
            uk-slideshow-item="previous"
          />
          <a href="/" className={styles.buttonRight} uk-slideshow-item="next" />
          <div className={styles.buttonsGroup}>
            <a
              className={styles.buttonBuy}
              onClick={(e) => {
                e.preventDefault();
                router.replace({
                  pathname: `/Products/${id}`,
                  query: {
                    present: true,
                  },
                });
              }}
            >
              {parseText(cookies, 'Купить', 'Купити')}
            </a>
            {cookies.get('token') && (
              <button
                type="button"
                className={classNameForButton}
                disabled={isAddFavourite || isFavorite}
                onClick={() => {
                  dispatch(addToFavourite({}, { present_id: id }, true));
                  setIsAddFavourite(true);
                }}
              >
                <IconLike className={classIconLike} />
              </button>
            )}
          </div>
        </div>
      )) || (
        <div className={styles.wrappersView}>
          <a
            className={styles.imageMobileWrapper}
            onClick={(e) => {
              e.preventDefault();
              router.push({
                pathname: `/Products/${id}`,
                query: {
                  present: true,
                },
              });
            }}
          >
            <img src={img_link} alt={img_link} className={styles.sliderImage} />
          </a>
          <button
            type="button"
            className={classNameForButton}
            disabled={isAddFavourite || isFavorite}
            onClick={() => {
              dispatch(addToFavourite({}, { present_id: id }, true));
              setIsAddFavourite(true);
            }}
          >
            <IconLike className={classIconLike} />
          </button>
        </div>
      )}
      <div className={styles.content}>
        <h6>
          {parseText(cookies, name, name_ua)}
        </h6>
        <ul className={styles.featuresItems}>
          {goods
            && goods.map((item, index) => (
              <>
                {index < 3 && (
                  <li key={item.id} className={styles.featuresItem}>
                    {parseText(cookies, item.name, item.name_uk)}
                  </li>
                ) || (
                  <li key={item.id} className={styles.featuresItem}>
                    ...
                  </li>
                )}
              </>
            ))}
        </ul>
        <div className={styles.contentInfo}>
          <div className={styles.colors}>
            {colors.map((colorItem, index) => (
              <span
                className={cx({ [styles.withBorder]: colorItem.color.name === 'White' })}
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: colorItem.color.hex
                    ? `${colorItem.color.hex}`
                    : `url(${colorItem.color.img_link})`,
                  display: 'inline-block',
                  marginRight: '7px',
                }}
              />
            ))}
          </div>
          {new_price ? (
            <div className={styles.prices}>
              <p className={styles.contentNewPrice}>{price} грн.</p>
              <p className={styles.contentOldPrice}>{new_price} грн.</p>
            </div>
          ) : (
            <p className={styles.contentPrice}>{price},00 грн.</p>
          )}
        </div>
      </div>
    </article>
  );
};

GiftProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    name_ua: PropTypes.string,
    price: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.object),
    new_price: PropTypes.number,
    isFavorite: PropTypes.bool,
    goods: PropTypes.arrayOf(PropTypes.object),
  }),
  classNameWrapper: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
};

export default withResponse(GiftProductCard);
