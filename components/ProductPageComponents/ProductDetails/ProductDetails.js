import React, { useState } from 'react';
import IconLike from '../../../assets/svg/like-border.svg';
import Styles from './ProductDetails.module.scss';
import IconStar from '../../../assets/svg/star.svg';
import IconClothes from '../../../assets/svg/clothes1.svg';
import IconSale from '../../../assets/svg/sale1.svg';
import IconDelivery from '../../../assets/svg/free-delivery1.svg';

const ProductDetails = () => {
  const [countProducts, setCountProducts] = useState(0);

  return (
    <div className={Styles.ProductDetails}>
      <div className={Styles.ProductDetails__Header}>
        <div>
          <h2 className={Styles.ProductDetails__Model}>Rio 150 model 5 <span className={Styles.ProductDetails__AddInfo}>KT-1005989</span></h2>
          <p className={Styles.ProductDetails__DescModel}>Тонкие колготки с кружевным поясом Giulia™</p>
        </div>
        <button className={Styles.ProductDetails__ButtonLike} type="button">
          <IconLike className={Styles.ProductDetails__IconLike} />
        </button>
      </div>
      <div className={Styles.ProductDetails__AddInfoBlock}>
        <p className={Styles.ProductDetails__Price}>129,00 ₴</p>
        <div>
          <p className={Styles.ProductDetails__CountAssessment}>
            <span>
              <IconStar className={Styles.ProductDetails__Icon} />
            </span>
            <span>
              <IconStar className={Styles.ProductDetails__Icon} />
            </span>
            <span>
              <IconStar className={Styles.ProductDetails__Icon} />
            </span>
            <span>
              <IconStar className={Styles.ProductDetails__Icon} />
            </span>
            <span>
              <IconStar className={Styles.ProductDetails__IconNoFill} />
            </span>
            <span className={Styles.ProductDetails__CountFeedbacks}>(17)</span>
          </p>
          <button type="button" className={Styles.ProductDetails__AddFeedback}>Добавить отзыв</button>
        </div>
      </div>
      <hr className={`${Styles.ProductDetails__LineOne} ${Styles.ProductDetails__Line}`} />
      <p className={Styles.ProductDetails__Colors}>Цвета <span className={Styles.ProductDetails__Color} /></p>
      <div className={Styles.ProductDetails__Sizes}>
        <p className={Styles.ProductDetails__SizesTitle}>Размер <span className={Styles.ProductDetails__Size}>1</span></p>
        <p className={Styles.ProductDetails__SizeDesc}>Размерная сетка</p>
      </div>
      <div className={Styles.ProductDetails__CounterBlock}>
        <p className={Styles.ProductDetails__CountProductTitle}>Кол-во</p>
        <div className={Styles.ProductDetails__CounterProducts}>
          <button onClick={() => setCountProducts(countProducts - 1)} className={Styles.ProductDetails__ButtonChangeCount} type="button">-</button>
          <p className={Styles.ProductDetails__CouuntProductIndicator}>{countProducts}</p>
          <button onClick={() => setCountProducts(countProducts + 1)} className={Styles.ProductDetails__ButtonChangeCount} type="button">+</button>
        </div>
      </div>
      <hr className={`${Styles.ProductDetails__LineTwo} ${Styles.ProductDetails__Line}`} />
      <div className={Styles.ProductDetails__ControllButtons}>
        <button className={`${Styles.ProductDetails__ControllButton} ${Styles.ProductDetails__ControllButtonAddToCard}`} type="button">Добавить в корзину</button>
        <button className={`${Styles.ProductDetails__ControllButton} ${Styles.ProductDetails__ControllButtonBuyNow}`} type="button">Купить в один клик</button>
      </div>
      <button type="button" className={Styles.ProductDetails__SubscribeButton}>Подписаться на оповещение по цене</button>
      <div className={Styles.ProductDetails__FeaturesBlock}>
        <article className={Styles.ProductDetails__FeaturesItem}>
          <IconClothes className={Styles.ProductDetails__FeaturesIcon} />
          <p className={Styles.ProductDetails__FeaturesDesc}>
            Самовывоз из более 60 <br />
            магазинов по Украине
          </p>
        </article>
        <article className={Styles.ProductDetails__FeaturesItem}>
          <IconSale className={Styles.ProductDetails__FeaturesIcon} />
          <p className={Styles.ProductDetails__FeaturesDesc}>
            Низкие цены <br />
            от производителя
          </p>
        </article>
        <article className={Styles.ProductDetails__FeaturesItem}>
          <IconDelivery className={Styles.ProductDetails__FeaturesIcon} />
          <p className={`${Styles.ProductDetails__FeaturesDesc} ${Styles.ProductDetails__FeaturesDescNoBorder}`}>
            Бесплатная доставка <br />
            при заказе от 500 грн
          </p>
        </article>
      </div>
    </div>
  );
};

export default ProductDetails;
