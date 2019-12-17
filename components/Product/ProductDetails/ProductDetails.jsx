import React, { useState } from 'react';
import IconLike from '../../../assets/svg/like-border.svg';
import styles from './ProductDetails.scss';
import IconStar from '../../../assets/svg/star.svg';
import IconClothes from '../../../assets/svg/clothes1.svg';
import IconSale from '../../../assets/svg/sale1.svg';
import IconDelivery from '../../../assets/svg/free-delivery1.svg';

const ProductDetails = () => {
  const [countProducts, setCountProducts] = useState(0);

  return (
    <div className={styles.productDetails}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.model}>
            Rio 150 model 5 <span className={styles.addInfo}>KT-1005989</span>
          </h2>
          <p className={styles.descModel}>
            Тонкие колготки с кружевным поясом Giulia™
          </p>
        </div>
        <button className={styles.buttonLike} type="button">
          <IconLike className={styles.iconLike} />
        </button>
      </div>
      <div className={styles.addInfoBlock}>
        <p className={styles.price}>129,00 ₴</p>
        <div>
          <p className={styles.countAssessment}>
            <span>
              <IconStar className={styles.icon} />
            </span>
            <span>
              <IconStar className={styles.icon} />
            </span>
            <span>
              <IconStar className={styles.icon} />
            </span>
            <span>
              <IconStar className={styles.icon} />
            </span>
            <span>
              <IconStar className={styles.iconNoFill} />
            </span>
            <span className={styles.countFeedbacks}>(17)</span>
          </p>
          <button type="button" className={styles.addFeedback}>
            Добавить отзыв
          </button>
        </div>
      </div>
      <hr className={`${styles.lineOne} ${styles.line}`} />
      <p className={styles.colors}>
        Цвета <span className={styles.color} />
      </p>
      <div className={styles.szes}>
        <p className={styles.sizesTitle}>
          Размер <span className={styles.size}>1</span>
        </p>
        <p className={styles.sizeDesc}>Размерная сетка</p>
      </div>
      <div className={styles.counterBlock}>
        <p className={styles.countProductTitle}>Кол-во</p>
        <div className={styles.counterProducts}>
          <button
            onClick={() => setCountProducts(countProducts - 1)}
            className={styles.buttonChangeCount}
            type="button"
          >
            -
          </button>
          <p className={styles.countProductIndicator}>{countProducts}</p>
          <button
            onClick={() => setCountProducts(countProducts + 1)}
            className={styles.buttonChangeCount}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      <hr className={`${styles.lineTwo} ${styles.line}`} />
      <div className={styles.controllButtons}>
        <button
          className={`${styles.controllButton} ${styles.controllButtonAddToCard}`}
          type="button"
        >
          Добавить в корзину
        </button>
        <button
          className={`${styles.controllButton} ${styles.controllButtonBuyNow}`}
          type="button"
        >
          Купить в один клик
        </button>
      </div>
      <button type="button" className={styles.subscribeButton}>
        Подписаться на оповещение по цене
      </button>
      <div className={styles.featuresBlock}>
        <article className={styles.featuresItem}>
          <IconClothes className={styles.featuresIcon} />
          <p className={styles.featuresDesc}>
            Самовывоз из более 60 <br />
            магазинов по Украине
          </p>
        </article>
        <article className={styles.featuresItem}>
          <IconSale className={styles.featuresIcon} />
          <p className={styles.featuresDesc}>
            Низкие цены <br />
            от производителя
          </p>
        </article>
        <article className={styles.featuresItem}>
          <IconDelivery className={styles.featuresIcon} />
          <p
            className={`${styles.featuresDesc} ${styles.featuresDescNoBorder}`}
          >
            Бесплатная доставка <br />
            при заказе от 500 грн
          </p>
        </article>
      </div>
    </div>
  );
};

export default ProductDetails;
