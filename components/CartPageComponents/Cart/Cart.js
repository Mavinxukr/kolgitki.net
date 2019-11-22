import React from 'react';
import CartItem from '../CartItem/CartItem';
import { cartData } from "./cartData";
import Styles from './Cart.module.scss';

const Cart = () => (
  <div className={Styles.Cart}>
    <h2 className={Styles.Cart__Title}>Корзина</h2>
    <div className={Styles.Cart__Table}>
      <div className={Styles.Cart__TableHeader}>
        <p className={Styles.Cart__TableTitleOne}>Выбранные товары</p>
        <p className={Styles.Cart__TableTitleTwo}>Количество</p>
        <p className={Styles.Cart__TableTitleThree}>Цена</p>
      </div>
      <hr className={Styles.Cart__Line} />
      <div>
        {
          cartData.map(item => (
            <div className={Styles.Cart__Card} key={item.id}>
              <CartItem item={item} />
            </div>
          ))
        }
      </div>
      <hr className={`${Styles.Cart__Line} ${Styles.Cart__LineSecond}`} />
      <div className={Styles.Cart__TotalPriceWrapper}>
        <p className={Styles.Cart__TotalPrice}>Итого: <span className={Styles.Cart__Price}>278,00 ₴</span></p>
      </div>
      <div className={Styles.Cart__Buttons}>
        <button className={Styles.Cart__ButtonContinue} type="button">Продолжить покупки</button>
        <button className={Styles.Cart__ButtonOrder} type="button">Оформить заказ</button>
      </div>
    </div>
  </div>
);

export default Cart;
