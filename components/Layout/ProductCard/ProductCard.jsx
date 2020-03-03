import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { addToFavourite } from '../../../redux/actions/favourite';
import { cookies } from '../../../utils/getCookies';
import IconLeftArrow from '../../../public/svg/Path8.svg';
import IconRightArrow from '../../../public/svg/Path7.svg';
import IconLike from '../../../public/svg/like-border.svg';
import styles from './ProductCard.scss';

const ProductCard = ({
  item: {
    id, name, price, colors, new_price, isFavorite, img_link,
  },
  classNameWrapper,
}) => {
  const [isAddFavourite, setIsAddFavourite] = useState(false);

  const sliderDataArr = [
    { id: 9, good_img_link: img_link },
    ...colors,
  ];

  const dispatch = useDispatch();

  const classNameForButton = cx(styles.buttonAddToFavourite, {
    [styles.buttonAddToFavouriteSelect]: isFavorite || isAddFavourite,
  });

  return (
    <article className={cx(styles.card, classNameWrapper)}>
      <div
        uk-slideshow="ratio: 7:3, pause-on-hover: true"
        className={styles.slider}
      >
        <ul className={`${styles.list} uk-slideshow-items`}>
          {sliderDataArr.map(item => (
            <li key={item.id}>
              <img className={styles.sliderImage} src={item.good_img_link} alt={item.good_img_link} />
            </li>
          ))}
        </ul>
        <a href="/" className={styles.buttonLeft} uk-slideshow-item="previous">
          <IconLeftArrow />
        </a>
        <a href="/" className={styles.buttonRight} uk-slideshow-item="next">
          <IconRightArrow />
        </a>
        <Link href="/Products/[pid]" as={`/Products/${id}`}>
          <a className={styles.linkBuy}>
            Купить
          </a>
        </Link>
      </div>
      <div className={styles.content}>
        <h6>{name}</h6>
        <div className={styles.contentInfo}>
          {new_price ? (
            <div className={styles.prices}>
              <p className={styles.contentNewPrice}>{price}</p>
              <p className={styles.contentOldPrice}>{new_price}</p>
            </div>
          ) : (
            <p className={styles.contentPrice}>{price},00 ₴</p>
          )}
          <p className={styles.contentColors}>{colors.length} цвета</p>
        </div>
        <div className={styles.colors}>
          <div>
            {colors.map(item => (
              <span
                key={item.id}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: item.color.hex ? `${item.color.hex}` : `url(${item.color.img_link})`,
                  display: 'inline-block',
                  marginRight: '7px',
                }}
              />
            ))}
          </div>
          {
            cookies.get('token') && (
              <button
                type="button"
                className={classNameForButton}
                disabled={isAddFavourite || isFavorite}
                onClick={() => {
                  dispatch(
                    addToFavourite({}, { good_id: id }),
                  );
                  setIsAddFavourite(true);
                }}
              >
                <IconLike className={styles.likeIcon} />
              </button>
            )
          }
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.object),
    new_price: PropTypes.number,
    isFavorite: PropTypes.bool,
  }),
  classNameWrapper: PropTypes.string,
};

export default ProductCard;
