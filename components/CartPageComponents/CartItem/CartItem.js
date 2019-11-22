import React, { useState } from 'react';
import IconLike from '../../../assets/svg/like (1).svg';
import Styles from './CartItem.module.scss';

const CartItem = ({
  item: {
    src, name, color, nameColor, size, count, price,
  },
}) => {
  const [countProducts, setCountProducts] = useState(count);

  return (
    <div className={Styles.CartItem}>
      <div className={Styles.CartItem__ChooseProduct}>
        <img src={src} alt={name} />
        <div className={Styles.CartItem__MainInfo}>
          <p className={Styles.CartItem__Model}>{name}</p>
          <p className={Styles.CartItem__Series}>KT-1005989</p>
          <div className={Styles.CartItem__MainInfoDetails}>
            <p className={Styles.CartItem__Size}>Размер: <span className={Styles.CartItem__SizeValue}>{size}</span></p>
            <div style={{
              width: '20px', height: '20px', borderRadius: '6px', background: `${color}`, display: 'inline-block', marginRight: '10px', marginLeft: '19px',
            }}
            />
            <p className={Styles.CartItem__ColorName}>{nameColor}</p>
          </div>
        </div>
        <div className={Styles.CartItem__Buttons}>
          <button className={Styles.CartItem__ButtonAdd} type="button">
            <IconLike /> <span className={Styles.CartItem__ButtonAddText}>В избранные</span>
          </button>
          <button className={Styles.CartItem__ButtonDelete} type="button">Удалить</button>
        </div>
      </div>
      <div className={Styles.CartItem__CounterProducts}>
        <button onClick={() => setCountProducts(countProducts - 1)} className={Styles.CartItem__ButtonChangeCount} type="button">-</button>
        <p className={Styles.CartItem__CouuntProductIndicator}>{countProducts}</p>
        <button onClick={() => setCountProducts(countProducts + 1)} className={Styles.CartItem__ButtonChangeCount} type="button">+</button>
      </div>
      <p className={Styles.CartItem__Price}>{price} ₴</p>
    </div>
  );
};

export default CartItem;
