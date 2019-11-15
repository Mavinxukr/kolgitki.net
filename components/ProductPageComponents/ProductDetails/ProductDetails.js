import React from 'react';
import IconLike from '../../../assets/svg/like-border.svg';
import Styles from './ProductDetails.module.scss';
import IconStar from '../../../assets/svg/star.svg';

const ProductDetails = () => (
  <div className={Styles.ProductDetails}>
    <div className={Styles.ProductDetails__Header}>
      <div>
        <h2 className={Styles.ProductDetails__Model}>Rio 150 model 5 <span className={Styles.ProductDetails__AddInfo}>KT-1005989</span></h2>
        <p className={Styles.ProductDetails__DescModel}>Тонкие колготки с кружевным поясом Giulia™</p>
      </div>
      <button className={Styles.ProductDetails__ButtonLike} type="button">
        <IconLike className={Styles.ProductDetails__Icon} />
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
  </div>
);

export default ProductDetails;
