import React from 'react';
import IconClothes from '../../../assets/svg/clothes1.svg';
import IconSale from '../../../assets/svg/sale1.svg';
import IconDelivery from '../../../assets/svg/free-delivery1.svg';
import Styles from './FeaturesCard.module.scss';

const FeaturesCard = () => (
  <div className={Styles.FeaturesCard}>
    <div className={Styles.FeaturesCard__Container}>
      <article className={Styles.FeaturesCard__Card}>
        <IconClothes className={Styles.FeaturesCard__Icon} />
        <h2 className={Styles.FeaturesCard__CardTitle}>
          Самовывоз из более 60 <br />
          магазинов по Украине
        </h2>
        <hr className={Styles.FeaturesCard__Line} />
        <button type="button" className={Styles.FeaturesCard__Button}>Показать магазины</button>
      </article>
      <article className={Styles.FeaturesCard__Card}>
        <IconSale className={Styles.FeaturesCard__Icon} />
        <h2 className={Styles.FeaturesCard__CardTitle}>
          Низкие цены <br />
          от производителя
        </h2>
        <hr className={Styles.FeaturesCard__Line} />
        <button type="button" className={Styles.FeaturesCard__Button}>Все акции</button>
      </article>
      <article className={Styles.FeaturesCard__Card}>
        <IconDelivery className={Styles.FeaturesCard__Icon} />
        <h2 className={Styles.FeaturesCard__CardTitle}>
          Бесплатная доставка <br />
          при заказе от 500 грн
        </h2>
        <hr className={Styles.FeaturesCard__Line} />
        <button type="button" className={Styles.FeaturesCard__Button}>Выбрать товар</button>
      </article>
    </div>
  </div>
);

export default FeaturesCard;
