import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Counter from '../../Layout/Counter/Counter';
import Button from '../../Layout/Button/Button';
import { data } from './data';

const CartItem = ({ item }) => (
  <div className={styles.cartItem}>
    <div className={styles.cartItemChooseProduct}>
      <img src={item.src} alt={item.name} />
      <div className={styles.cartItemMainInfo}>
        <h5>{item.name}</h5>
        <p className={styles.cartItemSeries}>KT-1005989</p>
        <div className={styles.cartItemMainInfoDetails}>
          <p className={styles.cartItemSize}>
            Размер:
            <span className={styles.cartItemSizeValue}>{item.size}</span>
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
          <p className={styles.cartItemColorName}>{item.nameColor}</p>
        </div>
      </div>
      <div className={styles.cartItemButtons}>
        <Button
          buttonType="button"
          title="В избранное"
          viewType="addToFavourite"
        />
        <button className={styles.cartItemButtonDelete} type="button">
          Удалить
        </button>
      </div>
    </div>
    <Counter classNameForCounter={styles.cartItemCounterWrapper} />
    <p className={styles.cartItemPrice}>{item.price} ₴</p>
  </div>
);

const Cart = () => (
  <MainLayout>
    <div className={styles.content}>
      <BreadCrumbs items={['Главная', 'Корзина']} />
      <div className={styles.cart}>
        <h4>Корзина</h4>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <p className={styles.tableTitleOne}>Выбранные товары</p>
            <p className={styles.tableTitleTwo}>Количество</p>
            <p className={styles.tableTitleThree}>Цена</p>
          </div>
          <hr className={styles.line} />
          <div>
            {data.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <hr className={`${styles.line} ${styles.lineSecond}`} />
          <div className={styles.totalPriceWrapper}>
            <p className={styles.totalPrice}>
              Итого: <span className={styles.price}>278,00 ₴</span>
            </p>
          </div>
          <div className={styles.buttons}>
            <Button
              width="336px"
              title="Продолжить покупки"
              buttonType="button"
              viewType="white"
            />
            <Button
              width="336px"
              title="Оформить заказ"
              buttonType="button"
              viewType="black"
            />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

CartItem.propTypes = {
  item: PropTypes.object,
};

export default Cart;
