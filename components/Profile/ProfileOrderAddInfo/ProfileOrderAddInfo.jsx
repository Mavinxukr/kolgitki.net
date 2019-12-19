import React from 'react';
import { data } from './data';
import styles from './ProfileOrderAddInfo.scss';
import IconLike from '../../../assets/svg/like (1).svg';

const LiItemUserInfo = ({ label, value }) => (
  <li className={styles.userInfoDeliveryItem}>
    <p className={styles.userInfoDeliveryTextOne}>{label}</p>
    <p className={styles.userInfoDeliveryTextTwo}>{value}</p>
  </li>
);

const LiItemPrices = ({ label, value }) => (
  <li className={styles.userInfoPricesItem}>
    <p className={styles.userInfoPricesText}>{label}</p>
    <p className={styles.userInfoPricesPrice}>{value}</p>
  </li>
);

const ProfileOrderAddInfo = () => (
  <div className={styles.profileOrderAddInfo}>
    <div className={styles.ChooseProductsCards}>
      {data.map(item => (
        <div key={item.id} className={styles.chooseProduct}>
          <div className={styles.chooseProductGroup}>
            <img src={item.src} alt={item.name} />
            <div className={styles.mainInfo}>
              <p className={styles.model}>{item.name}</p>
              <p className={styles.series}>KT-1005989</p>
              <div className={styles.mainInfoDetails}>
                <p className={styles.size}>
                  Размер: <span className={styles.sizeValue}>{item.size}</span>
                </p>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    background: `${item.color}`,
                    display: 'inline-block',
                    marginRight: '10px',
                    marginLeft: '19px',
                  }}
                />
                <p className={styles.colorName}>{item.nameColor}</p>
              </div>
            </div>
          </div>
          <p className={styles.countProducts}>{item.count} шт</p>
          <button className={styles.buttonAdd} type="button">
            <IconLike className={styles.IconLike} />{' '}
            <span className={styles.buttonAddText}>В избранные</span>
          </button>
          <p className={styles.price}>{item.price} ₴</p>
        </div>
      ))}
    </div>
    <div className={styles.userInfo}>
      <ul className={styles.userInfoDeliveryItems}>
        <LiItemUserInfo label="Способ оплаты:" value="Наложенный платеж" />
        <LiItemUserInfo label="Служба доставки:" value="Новая Почта" />
        <LiItemUserInfo label="Способ доставки:" value="В отделение" />
      </ul>
      <div className={styles.userInfoDetails}>
        <p className={styles.userInfoDetailsText}>Тунчинко Игорь Николаевич</p>
        <p className={styles.userInfoDetailsText}>+380 (097) 790 90 21</p>
        <p className={styles.userInfoDetailsText}>
          Отделение №18 Николаевская 17/23Б
        </p>
        <p className={styles.userInfoDetailsText}>ihor@gmail.com</p>
        <div className={styles.userInfoDetailsNumbers}>
          <p className={styles.userInfoDetailsNumberText}>Номер ТТН:</p>
          <p className={styles.userInfoDetailsNumberId}>007560530543</p>
        </div>
      </div>
      <ul className={styles.userInfoPrices}>
        <LiItemPrices label="Сумма за товар" value="405,00 ₴" />
        <LiItemPrices label="Скидка" value="45,00 ₴" />
        <LiItemPrices label="Оплачено бонусами" value="00,00 ₴" />
        <LiItemPrices label="Сумма заказа" value="540,00 ₴" />
        <LiItemPrices label="Доставка" value="84,00 ₴" />
        <hr className={styles.line} />
        <li className={styles.userInfoPricesItemTotal}>
          <p className={styles.userInfoPricesItemTotalText}>Итого</p>
          <p className={styles.userInfoPricesPrice}>560,00 ₴</p>
        </li>
      </ul>
    </div>
  </div>
);

export default ProfileOrderAddInfo;
