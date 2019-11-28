import React from 'react';
import { data } from "./data";
import Styles from './BonusComponent.module.scss';

const BonusComponent = () => (
  <div className={Styles.BonusComponent}>
    <h2 className={Styles.BonusComponent__Title}>Бонусы</h2>
    <div className={Styles.BonusComponent__AllBonuses}>
      <p className={Styles.BonusComponent__AllBonunesPrice}>1 590,00 ₴</p>
      <p className={Styles.BonusComponent__AllBonunesText}>Количество бонусов</p>
    </div>
    <h2 className={Styles.BonusComponent__HistoryTitle}>История</h2>
    <div className={Styles.BonusComponent__HeaderTable}>
      <p className={Styles.BonusComponent__TableSumm}>Сумма</p>
      <p className={Styles.BonusComponent__TableDate}>Дата</p>
      <p className={Styles.BonusComponent__TableEvent}>Событие</p>
    </div>
    {
      data.map(item => (
        <div className={Styles.BonusComponent__TableItem} key={item.id}>
          <p className={Styles.BonusComponent__TableItemPrice}>{item.price}</p>
          <p className={Styles.BonusComponent__TableItemDate}>{item.date} <span className={Styles.BonusComponent__TableItemTime}>{item.time}</span></p>
          <p className={Styles.BonusComponent__TableItemEvent}>{item.event} <span className={Styles.BonusComponent__TableItemEventPrice}>{item.eventPrice}</span></p>
          <a href="/" className={Styles.BonusComponent__TableLink}>Дополнительно: {item.addInfo}</a>
        </div>
      ))
    }
  </div>
);

export default BonusComponent;
