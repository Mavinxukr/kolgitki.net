import React from 'react';
import Link from 'next/link';
import IconLeftArrow from '../../../assets/svg/Path8.svg';
import IconRightArrow from '../../../assets/svg/Path7.svg';
import IconLike from '../../../assets/svg/like-border.svg';
import styles from './ProductCard.scss';

const ProductCard = ({
  item: {
    id, model, price, colors, src,
  },
}) => (
  <article className={styles.card}>
    <div
      uk-slideshow="ratio: 7:3, pause-on-hover: true"
      className={styles.slider}
    >
      <ul className={`${styles.list} uk-slideshow-items`}>
        {src.map((item, index) => (
          <li key={index}>
            <img className={styles.sliderImage} src={item} alt={model} />
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
      <Link
        href={{
          pathname: '/Products/[pid]',
          query: { pathNameOne: 'Главная', pathNameTwo: model },
        }}
        as={`/Products/${id}`}
      >
        <a className={styles.contentTitle}>{model}</a>
      </Link>
      <div className={styles.contentInfo}>
        <p className={styles.contentPrice}>{price}</p>
        <p className={styles.contentColors}>{colors.length} цвета</p>
      </div>
      <div className={styles.colors}>
        <div>
          {colors.map((item, index) => (
            <span
              key={index}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: `${item}`,
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

export default ProductCard;
