import React from 'react';
import { data } from './data';
import Styles from './ProfileOrderAddInfo.module.scss';
import IconLike from '../../../assets/svg/like (1).svg';

const ProfileOrderAddInfo = () => (
  <div className={Styles.ProfileOrderAddInfo}>
    <div className={Styles.ProfileOrderAddInfo__ChooseProductsCards}>
      {
        data.map(item => (
          <div key={item.id} className={Styles.ProfileOrderAddInfo__ChooseProduct}>
            <div className={Styles.ProfileOrderAddInfo__ChooseProductGroup}>
              <img src={item.src} alt={item.name} />
              <div className={Styles.ProfileOrderAddInfo__MainInfo}>
                <p className={Styles.ProfileOrderAddInfo__Model}>{item.name}</p>
                <p className={Styles.ProfileOrderAddInfo__Series}>KT-1005989</p>
                <div className={Styles.ProfileOrderAddInfo__MainInfoDetails}>
                  <p className={Styles.ProfileOrderAddInfo__Size}>Размер: <span className={Styles.ProfileOrderAddInfo__SizeValue}>{item.size}</span></p>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '6px', background: `${item.color}`, display: 'inline-block', marginRight: '10px', marginLeft: '19px',
                  }}
                  />
                  <p className={Styles.ProfileOrderAddInfo__ColorName}>{item.nameColor}</p>
                </div>
              </div>
            </div>
            <p className={Styles.ProfileOrderAddInfo__CountProducts}>{item.count} шт</p>
            <button className={Styles.ProfileOrderAddInfo__ButtonAdd} type="button">
              <IconLike className={Styles.ProfileOrderAddInfo__IconLike} /> <span className={Styles.ProfileOrderAddInfo__ButtonAddText}>В избранные</span>
            </button>
            <p className={Styles.ProfileOrderAddInfo__Price}>{item.price} ₴</p>
          </div>
        ))
      }
    </div>
    <div className={Styles.ProfileOrderAddInfo__UserInfo}>
      <ul className={Styles.ProfileOrderAddInfo__UserInfoDeliveryItems}>
        <li className={Styles.ProfileOrderAddInfo__UserInfoDeliveryItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextOne}>Способ оплаты:</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextTwo}>Наложенный платеж</p>
        </li>
        <li className={Styles.ProfileOrderAddInfo__UserInfoDeliveryItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextOne}>Служба доставки:</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextTwo}>Новая Почта</p>
        </li>
        <li className={Styles.ProfileOrderAddInfo__UserInfoDeliveryItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextOne}>Способ доставки:</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextTwo}>В отделение</p>
        </li>
      </ul>
      <div className={Styles.ProfileOrderAddInfo__UserInfoDetails}>
        <p className={Styles.ProfileOrderAddInfo__UserInfoDetailsText}>Тунчинко Игорь Николаевич</p>
        <p className={Styles.ProfileOrderAddInfo__UserInfoDetailsText}>+380 (097) 790 90 21</p>
        <p className={Styles.ProfileOrderAddInfo__UserInfoDetailsText}>Отделение №18 Николаевская 17/23Б</p>
        <p className={Styles.ProfileOrderAddInfo__UserInfoDetailsText}>ihor@gmail.com</p>
        <div className={Styles.ProfileOrderAddInfo__UserInfoDetailsNumbers}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDetailsNumberText}>Номер ТТН:</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoDetailsNumberId}>007560530543</p>
        </div>
      </div>
      <ul className={Styles.ProfileOrderAddInfo__UserInfoPrices}>
        <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesText}>Сумма за товар</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>405,00 ₴</p>
        </li>
        <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesText}>Скидка</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>45,00 ₴</p>
        </li>
        <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesText}>Оплачено бонусами</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>00,00 ₴</p>
        </li>
        <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesText}>Сумма заказа</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>540,00 ₴</p>
        </li>
        <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItem}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesText}>Доставка</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>84,00 ₴</p>
        </li>
        <hr className={Styles.ProfileOrderAddInfo__Line} />
        <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItemTotal}>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesItemTotalText}>Итого</p>
          <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>560,00 ₴</p>
        </li>
      </ul>
    </div>
  </div>
);

export default ProfileOrderAddInfo;
