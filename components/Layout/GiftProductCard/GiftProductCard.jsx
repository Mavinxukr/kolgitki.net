import React from 'react';
import Link from 'next/link';
import styles from './GiftProductCard.scss';
import IconLike from '../../../assets/svg/like-border.svg';

const GiftProductCard = ({ item }) => (
  <article className={styles.card}>
    <div
      uk-slideshow="ratio: 7:3, pause-on-hover: true"
      className={styles.slider}
    >
      <ul className={`${styles.list} uk-slideshow-items`}>
        {item.src.map((srcItem, index) => (
          <li key={index}>
            <img className={styles.sliderImage} src={srcItem} alt={item.model} />
          </li>
        ))}
      </ul>
      <a href="/" className={styles.buttonLeft} uk-slideshow-item="previous" />
      <a href="/" className={styles.buttonRight} uk-slideshow-item="next" />
      <div className={styles.buttonsGroup}>
        <button className={styles.buttonBuy} type="button">
          Купить
        </button>
        <button className={styles.buttonLike} type="button">
          <IconLike />
        </button>
      </div>
    </div>
    <div className={styles.content}>
      <Link href="/Products/[pid]" as={`/Products/${item.id}`}>
        <a className={styles.contentTitle}>{item.model}</a>
      </Link>
      <ul className={styles.featuresItems}>
        {
          item.features.map(feature => <li className={styles.featuresItem}>{feature}</li>)
        }
      </ul>
      <div className={styles.contentInfo}>
        <div className={styles.colors}>
          {item.colors.map((colorItem, index) => (
            <span
              key={index}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: `${colorItem}`,
                display: 'inline-block',
                marginRight: '7px',
              }}
            />
          ))}
        </div>
        {item.oldPrice ? (
          <div className={styles.prices}>
            <p className={styles.contentNewPrice}>{item.price}</p>
            <p className={styles.contentOldPrice}>{item.oldPrice}</p>
          </div>
        ) : (
          <p className={styles.contentPrice}>{item.price}</p>
        )}
      </div>
    </div>
  </article>
);

export default GiftProductCard;
