import React from 'react';
import { data } from './data';
import Styles from './ProfileOrderAddInfo.module.scss';
import IconLike from '../../../assets/svg/like (1).svg';

const LiItemUserInfo = ({ label, value }) => (
  <li className={Styles.ProfileOrderAddInfo__UserInfoDeliveryItem}>
    <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextOne}>{label}</p>
    <p className={Styles.ProfileOrderAddInfo__UserInfoDeliveryTextTwo}>{value}</p>
  </li>
);

const LiItemPrices = ({ label, value }) => (
  <li className={Styles.ProfileOrderAddInfo__UserInfoPricesItem}>
    <p className={Styles.ProfileOrderAddInfo__UserInfoPricesText}>{label}</p>
    <p className={Styles.ProfileOrderAddInfo__UserInfoPricesPrice}>{value}</p>
  </li>
);

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
        <LiItemUserInfo label="Способ оплаты:" value="Наложенный платеж" />
        <LiItemUserInfo label="Служба доставки:" value="Новая Почта" />
        <LiItemUserInfo label="Способ доставки:" value="В отделение" />
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
        <LiItemPrices label="Сумма за товар" value="405,00 ₴" />
        <LiItemPrices label="Скидка" value="45,00 ₴" />
        <LiItemPrices label="Оплачено бонусами" value="00,00 ₴" />
        <LiItemPrices label="Сумма заказа" value="540,00 ₴" />
        <LiItemPrices label="Доставка" value="84,00 ₴" />
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
