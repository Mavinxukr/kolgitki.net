import React from 'react';
import Styles from './SaleDelivery.module.scss';
import IconArrow from '../../../assets/svg/Path 193.svg';

const SaleDelivery = () => (
  <>
    <input type="checkbox" id="deliveryOpen" className={Styles.SaleDelivery__Field} />
    <div className={Styles.SaleDelivery}>
      <div className={Styles.SaleDelivery__Content}>
        <div className={Styles.SaleDelivery__RadioButtons}>
          <input className={Styles.SaleDelivery__Field} type="radio" name="selectDelivery" id="postMan" />
          <label htmlFor="postMan" className={Styles.SaleDelivery__Controller}><span className={Styles.SaleDelivery__ControllerBlock} /> Новая Почта, курьером до дверей</label>
          <input className={Styles.SaleDelivery__Field} type="radio" name="selectDelivery" id="postOffice" />
          <label htmlFor="postOffice" className={Styles.SaleDelivery__Controller}><span className={Styles.SaleDelivery__ControllerBlock} /> Новая Почта, до отделения</label>
          <input className={Styles.SaleDelivery__Field} type="radio" name="selectDelivery" id="pickup" />
          <label htmlFor="pickup" className={Styles.SaleDelivery__Controller}><span className={Styles.SaleDelivery__ControllerBlock} /> Самовывоз из магазина GIULIA</label>
        </div>
        <div className={Styles.SaleDelivery__Selectors}>
          <div className={Styles.SaleDelivery__SelectorsItem}>
            Область <span className={Styles.SaleDelivery__SelectrorsIcon}><IconArrow /></span>
          </div>
          <div className={Styles.SaleDelivery__SelectorsItem}>
            Город <span className={Styles.SaleDelivery__SelectrorsIcon}><IconArrow /></span>
          </div>
          <div className={`${Styles.SaleDelivery__SelectorsItem} ${Styles.SaleDelivery__SelectorsItemBig}`}>
            Отделение НП <span className={Styles.SaleDelivery__SelectrorsIcon}><IconArrow /></span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SaleDelivery;
