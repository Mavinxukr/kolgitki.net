import React from 'react';
import Styles from './HeaderInfo.module.scss';
import IconClothes from '../../../assets/svg/clothes.svg';
import IconSale from '../../../assets/svg/sale.svg';
import IconDelivery from '../../../assets/svg/free-delivery.svg';
import IconPhone from '../../../assets/svg/call-answer.svg';

const HeaderInfo = () => (
  <div className={Styles.HeaderInfo}>
    <div className={Styles.HeaderInfo__Container}>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockPhone}>
          <IconPhone className={Styles.HeaderInfo__Icon} />
        </p>
        <p className={Styles.HeaderInfo__Text}>044 495 523 395</p>
      </div>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockClother}>
          <IconClothes className={Styles.HeaderInfo__Icon} />
        </p>
        <p className={Styles.HeaderInfo__Text}>Магазин в вашем городе</p>
      </div>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockSale}>
          <IconSale className={`${Styles.HeaderInfo__Icon} ${Styles.HeaderInfo__IconBlockClother}`} />
        </p>
        <p className={Styles.HeaderInfo__Text}>Низкие цены</p>
      </div>
      <div className={Styles.HeaderInfo__Item}>
        <p className={Styles.HeaderInfo__IconBlockDelivery}>
          <IconDelivery className={Styles.HeaderInfo__Icon} />
        </p>
        <p className={Styles.HeaderInfo__Text}>Бесплатная доставка от 500 грн</p>
      </div>
    </div>
  </div>
);

export default HeaderInfo;
