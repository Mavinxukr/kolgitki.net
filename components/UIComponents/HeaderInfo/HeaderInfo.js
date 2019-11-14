import React from 'react';
import Styles from './HeaderInfo.module.scss';
import IconClothes from '../../../assets/svg/clothes.svg';
import IconSale from '../../../assets/svg/sale.svg';
import IconDelivery from '../../../assets/svg/free-delivery.svg';

const HeaderInfo = () => (
  <div className={Styles.HeaderInfo}>
    <div className={Styles.HeaderInfo__Container}>
      <div className={Styles.HeaderInfo__Item}>
        <p className={`${Styles.HeaderInfo__Text} ${Styles.HeaderInfo__Number}`}>044 495 523 395</p>
      </div>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockOne}>
          <IconClothes className={Styles.HeaderInfo__Icon} />
        </p>
        <p className={Styles.HeaderInfo__Text}>Магазин в вашем городе</p>
      </div>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockTwo}>
          <IconSale className={Styles.HeaderInfo__IconBlockOne} />
        </p>
        <p className={Styles.HeaderInfo__Text}>Низкие цены</p>
      </div>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockThree}>
          <IconDelivery className={Styles.HeaderInfo__Icon} />
        </p>
        <p className={Styles.HeaderInfo__Text}>Бесплатная доставка от 500 грн</p>
      </div>
    </div>
  </div>
);

export default HeaderInfo;
