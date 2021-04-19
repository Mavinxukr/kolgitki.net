import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './GiftProductCard.scss';
import IconLeftArrow from '../../../public/svg/Path8.svg';
import IconRightArrow from '../../../public/svg/Path7.svg';
import { cookies } from '../../../utils/getCookies';
import {
  parseText,
  calculateProcents,
  getCorrectPrice
} from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import IconHint from '../../../public/svg/Group2966.svg';

const GiftProductCard = ({
  item: {
    labels,
    id,
    name,
    name_ua,
    price,
    colors,
    new_price,
    img_link,
    goods,
    help,
    help_title,
    help_title_uk,
    help_uk,
    crumbs
  },
  classNameWrapper,
  isDesktopScreen,
  isScreenForProductSmall,
  isScreenForProduct
}) => {
  const sliderDataArr = [{ id: 9, present_img_link: img_link }, ...colors];

  const getHeightForCardImage = () => {
    switch (true) {
      case isScreenForProductSmall:
        return 486;
      case isScreenForProduct:
        return 393;
      default:
        return 338;
    }
  };

  return (
    <article className={cx(styles.card, classNameWrapper)}>
      {isDesktopScreen && (
        <div className={styles.hintWrapper}>
          <IconHint className={styles.hintIcon} />
          <div className={styles.hintHoverBlock}>
            <div className={styles.hint}>
              <h4 className={styles.hintTitle}>
                {parseText(cookies, help_title, help_title_uk)}
              </h4>
              <p className={styles.hintDesc}>
                {parseText(cookies, help, help_uk)}
              </p>
              <Link
                href={{
                  pathname: '/product/[slug]',
                  query: { present: true }
                }}
                as={`/product${crumbs}/${id}?present=true`}
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
          uk-slideshow={`ratio: 7:3,pause-on-hover: true; min-height: ${getHeightForCardImage()}`}
          className={styles.slider}
        >
          <ul className={`${styles.list} uk-slideshow-items`}>
            {sliderDataArr.map(image => (
              <li key={image.id}>
                {!!labels.length && isDesktopScreen && (
                  <ul className={styles.labels}>
                    {labels.map((item, index) => (
                      <li
                        className={cx(styles.labelsItem, {
                          [styles.labelsItemWithOpacity]:
                            index !== labels.length - 1
                        })}
                        style={{
                          background:
                            item?.color?.hex ||
                            (item?.color?.img_link &&
                              `url(${item?.color?.img_link})`) ||
                            '#f04950'
                        }}
                        key={item.id}
                      >
                        <p className={styles.labelsText}>
                          {parseText(cookies, item.text, item.text_ua)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={{
                    pathname: '/product/[slug]',
                    query: { present: true }
                  }}
                  as={`/product${crumbs}/${id}?present=true`}
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
          >
            <IconLeftArrow />
          </a>
          <a href="/" className={styles.buttonRight} uk-slideshow-item="next">
            <IconRightArrow />
          </a>
          <div className={styles.buttonsGroup}>
            <Link
              href={{
                pathname: '/product/[slug]',
                query: { present: true }
              }}
              as={`/product${crumbs}/${id}?present=true`}
            >
              <a
                className={cx(styles.buttonBuy, {
                  [styles.red]: !colors.length
                })}
              >
                {colors.length
                  ? parseText(cookies, 'Купить', 'Купити')
                  : parseText(cookies, 'Нет в наличии', 'Немає в наявності')}
              </a>
            </Link>
          </div>
        </div>
      )) || (
        <div className={styles.wrappersView}>
          <Link
            href={{
              pathname: '/product/[slug]',
              query: { present: true }
            }}
            as={`/product${crumbs}/${id}`}
          >
            <a className={styles.imageMobileWrapper}>
              <img
                src={img_link}
                alt={img_link}
                className={styles.sliderImage}
              />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.content}>
        <h6 className={styles.content_title}>
          {parseText(cookies, name, name_ua)}
        </h6>
        <ul className={styles.featuresItems}>
          {goods &&
            goods.map(
              (item, index) =>
                (index < 3 && (
                  <li key={item.id} className={styles.featuresItem}>
                    {parseText(cookies, item.name, item.name_uk)};
                  </li>
                )) || (
                  <li key={item.id} className={styles.featuresItem}>
                    ...
                  </li>
                )
            )}
        </ul>
        <div className={styles.contentInfo}>
          <div className={styles.colors}>
            {colors.map((colorItem, index) => (
              <span
                className={cx({
                  [styles.withBorder]: colorItem.color.name === 'White'
                })}
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: colorItem.color.hex
                    ? `${colorItem.color.hex}`
                    : `url(${colorItem.color.img_link})`,
                  display: 'inline-block',
                  marginRight: '7px'
                }}
              />
            ))}
          </div>
          {new_price ? (
            <div className={styles.prices}>
              <p className={styles.contentNewPrice}>
                {getCorrectPrice(price)} грн
              </p>
              <p className={styles.contentNewPrice}>
                -{calculateProcents(new_price, price)}%
              </p>
              <p className={styles.contentOldPrice}>
                {getCorrectPrice(new_price)} грн
              </p>
            </div>
          ) : (
            <p className={styles.contentPrice}>{getCorrectPrice(price)} грн</p>
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
    help: PropTypes.string,
    help_title: PropTypes.string,
    help_title_uk: PropTypes.string,
    help_uk: PropTypes.string
  }),
  classNameWrapper: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  userDataId: PropTypes.number
};

export default withResponse(GiftProductCard);
