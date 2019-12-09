import React from 'react';
import { data } from './data';
import Styles from './ProfileWholesaleOrderAddInfo.module.scss';

const ProfileWholesaleOrderAddInfo = ({ id }) => (
  <div>
    <input type="checkbox" className={Styles.ProfileWholesaleOrderAddInfo__Field} id={`item${id}`} />
    <div className={Styles.ProfileWholesaleOrderAddInfo__Header}>
      <button className={Styles.ProfileWholesaleOrderAddInfo__ButtonPrint} type="button">Распечатать документ по заказу</button>
      <label className={Styles.ProfileWholesaleOrderAddInfo__ControllerPhoto} htmlFor={`item${id}`}>Показать с фото</label>
    </div>
    <ul className={Styles.ProfileWholesaleOrderAddInfo__List}>
      {
        data.map(item => (
          <li className={Styles.ProfileWholesaleOrderAddInfo__Item} key={item.id}>
            <div className={Styles.ProfileWholesaleOrderAddInfo__MainInfo}>
              <img src={item.src} alt={item.model} className={Styles.ProfileWholesaleOrderAddInfo__Image} />
              <div>
                <a className={Styles.ProfileWholesaleOrderAddInfo__Model} href="/">{item.name}</a>
                <p className={Styles.ProfileWholesaleOrderAddInfo__Series}>KT-1005989</p>
              </div>
            </div>
            <div className={Styles.ProfileWholesaleOrderAddInfo__Details}>
              <p className={Styles.ProfileWholesaleOrderAddInfo__Size}>Размер: {item.size}</p>
              <div style={{
                width: '20px', height: '20px', borderRadius: '6px', background: `${item.color}`, display: 'inline-block', marginRight: '10px', marginLeft: '19px',
              }}
              />
              <p className={Styles.ProfileOrderAddInfo__ColorName}>{item.nameColor}</p>
            </div>
            <p className={Styles.ProfileWholesaleOrderAddInfo__CountProducts}>{item.count} шт</p>
            <p className={Styles.ProfileWholesaleOrderAddInfo__Price}>{item.price},00 ₴</p>
            <p className={Styles.ProfileWholesaleOrderAddInfo__Price}>{+item.count * +item.price},00 ₴</p>
          </li>
        ))
      }
    </ul>
    <div className={Styles.ProfileWholesaleOrderAddInfo__TotalInfoWrapper}>
      <div className={Styles.ProfileWholesaleOrderAddInfo__TotalInfo}>
        <p className={Styles.ProfileWholesaleOrderAddInfo__TotalInfoText}>Итого:</p>
        <p className={Styles.ProfileWholesaleOrderAddInfo__TotalInfoPrice}>560,00 ₴</p>
      </div>
    </div>
  </div>
);

export default ProfileWholesaleOrderAddInfo;
