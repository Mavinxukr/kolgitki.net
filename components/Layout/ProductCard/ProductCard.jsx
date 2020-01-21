import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import PropTypes from 'prop-types';
import IconLeftArrow from '../../../assets/svg/Path8.svg';
import IconRightArrow from '../../../assets/svg/Path7.svg';
import IconLike from '../../../assets/svg/like-border.svg';
import styles from './ProductCard.scss';

const ProductCard = ({
  item: {
    id, name, price, images, new_price,
  },
  classNameWrapper,
}) => (
  <article className={cx(styles.card, classNameWrapper)}>
    <div
      uk-slideshow="ratio: 7:3, pause-on-hover: true"
      className={styles.slider}
    >
      <ul className={`${styles.list} uk-slideshow-items`}>
        {images.map(item => (
          <li key={item.id}>
            <img className={styles.sliderImage} src={item.image_link} alt={item.image_link} />
          </li>
        ))}
      </ul>
      <a href="/" className={styles.buttonLeft} uk-slideshow-item="previous">
        <IconLeftArrow />
      </a>
      <a href="/" className={styles.buttonRight} uk-slideshow-item="next">
        <IconRightArrow />
      </a>
      <button className={styles.buttonBuy} type="button">
        Купить
      </button>
    </div>
    <div className={styles.content}>
      <Link href="/Products/[pid]" as={`/Products/${id}`}>
        <a className={styles.contentTitle}>{name}</a>
      </Link>
      <div className={styles.contentInfo}>
        {new_price ? (
          <div className={styles.prices}>
            <p className={styles.contentNewPrice}>{price}</p>
            <p className={styles.contentOldPrice}>{new_price}</p>
          </div>
        ) : (
          <p className={styles.contentPrice}>{price},00 ₴</p>
        )}
        <p className={styles.contentColors}>{images.length} цвета</p>
      </div>
      <div className={styles.colors}>
        <div>
          {images.map(item => (
            <span
              key={item.id}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: `${item.colors.hex}`,
                display: 'inline-block',
                marginRight: '7px',
              }}
            />
          ))}
        </div>
        <button type="button">
          <IconLike />
        </button>
      </div>
    </div>
  </article>
);

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.object),
    new_price: PropTypes.oneOfType([
      PropTypes.number,
      null,
    ]),
  }),
  classNameWrapper: PropTypes.string,
};

export default ProductCard;
