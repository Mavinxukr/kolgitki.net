import React from 'react';
import Styles from './SaleTotalBlock.module.scss';

const SaleTotalBlock = () => (
  <div className={Styles.SaleTotalBlock}>
    <div className={Styles.SaleTotalBlock__TotalPriceItemTitle}>
      <h2 className={Styles.SaleTotalBlock__Title}>4 Товара на сумму:</h2>
      <button className={Styles.SaleTotalBlock__ButtonEdit} type="button">Изменить</button>
    </div>
    <hr className={Styles.SaleTotalBlock__TotalPriceLineFirst} />
    <div className={Styles.SaleTotalBlock__TotalPriceItem}>
      <p className={Styles.SaleTotalBlock__TotalPriceDesc}>Доставка:</p>
      <p className={Styles.SaleTotalBlock__TotalPriceValue}>278,00 ₴</p>
    </div>
    <div className={Styles.SaleTotalBlock__TotalPriceItem}>
      <p className={Styles.SaleTotalBlock__TotalPriceDesc}>Сумма заказа:</p>
      <p className={Styles.SaleTotalBlock__TotalPriceValue}>36,00 ₴</p>
    </div>
    <hr className={Styles.SaleTotalBlock__TotalPriceLineSecond} />
    <div className={Styles.SaleTotalBlock__TotalPriceItemAll}>
      <p className={Styles.SaleTotalBlock__TotalPriceDescAll}>Итого:</p>
      <p className={Styles.SaleTotalBlock__TotalPriceValue}>570,00 ₴</p>
    </div>
    <button className={Styles.SaleTotalBlock__TotalPriceButton} type="button">Оформить заказ</button>
    <input type="checkbox" className={Styles.SaleTotalBlock__Field} id="call" />
    <label className={Styles.SaleTotalBlock__TotalPriceController} htmlFor="call"><span className={Styles.SaleTotalBlock__TotalPriceCotrollerBlock} /> Не звонить для подтверждения заказа</label>
    <hr className={Styles.SaleTotalBlock__TotalPriceLineThird} />
    <input type="checkbox" id="openDetails" className={Styles.SaleTotalBlock__Field} />
    <div className={Styles.SaleTotalBlock__DiscontContentWrapper}>
      <label className={Styles.SaleTotalBlock__ControllerDetails} htmlFor="openDetails">Подробно</label>
      <div className={Styles.SaleTotalBlock__DiscontContent}>
        <div className={Styles.SaleTotalBlock__DiscontContentItem}>
          <p className={Styles.SaleTotalBlock__DiscontContentDesc}>Без скидки:</p>
          <p className={Styles.SaleTotalBlock__DiscontContentPrice}>320,00 ₴</p>
        </div>
        <div className={Styles.SaleTotalBlock__DiscontContentItem}>
          <p className={Styles.SaleTotalBlock__DiscontContentDescRed}>Скидка:</p>
          <p className={Styles.SaleTotalBlock__DiscontContentPriceRed}>-24,00 ₴</p>
        </div>
        <div className={Styles.SaleTotalBlock__DiscontContentItem}>
          <p className={Styles.SaleTotalBlock__DiscontContentDesc}>Оплачено бонусами:</p>
          <p className={Styles.SaleTotalBlock__DiscontContentPrice}>-100,00 ₴</p>
        </div>
        <hr className={Styles.SaleTotalBlock__DiscontContentLine} />
        <div className={Styles.SaleTotalBlock__DiscontContentItem}>
          <p className={Styles.SaleTotalBlock__DiscontContentDescGreen}>Начислено бонусов:</p>
          <p className={Styles.SaleTotalBlock__DiscontContentPriceGreen}>+59,70 ₴</p>
        </div>
      </div>
    </div>
  </div>
);

export default SaleTotalBlock;
