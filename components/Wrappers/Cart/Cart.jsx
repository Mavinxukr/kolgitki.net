import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCartData,
  deleteFromCart,
  updateCartData,
} from '../../../redux/actions/cart';
import { calculateTotalSum } from '../../../utils/totalSum';
import styles from './Cart.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Counter from '../../Layout/Counter/Counter';
import Loader from '../../Loader/Loader';

const CartItem = ({ item, dispatch }) => {
  const [count, setCount] = useState(item.count);

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemChooseProduct}>
        <img
          className={styles.cartItemImage}
          src={item.good.images[0].image_link}
          alt={item.good.images[0].image_link}
        />
        <div className={styles.cartItemMainInfo}>
          <h5>{item.good.name}</h5>
          <p className={styles.cartItemSeries}>{item.good.vendor_code}</p>
          <div className={styles.cartItemMainInfoDetails}>
            <p className={styles.cartItemSize}>
              Размер:
              <span className={styles.cartItemSizeValue}>2Etra</span>
            </p>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: `${item.good.images[0].colors.hex}`,
                display: 'inline-block',
                marginRight: '10px',
                marginLeft: '19px',
              }}
            />
            <p className={styles.cartItemColorName}>
              {item.good.images[0].colors.name}
            </p>
          </div>
        </div>
        <button
          className={styles.cartItemButtonDelete}
          type="button"
          onClick={() => {
            dispatch(
              deleteFromCart({
                params: {},
                body: {
                  good_id: item.good.id,
                },
              }),
            );
          }}
        >
          Удалить
        </button>
      </div>
      <Counter
        count={item.good.count}
        amountOfProduct={count}
        setAmountOfProduct={setCount}
        classNameForCounter={styles.cartItemCounterWrapper}
        updateCount={(amountOfProduct) => {
          dispatch(updateCartData({
            params: {},
            body: {
              good_id: item.good.id,
              count: amountOfProduct,
            },
          }));
        }}
      />
      <p className={styles.cartItemPrice}>
        {item.good.price * item.count},00 ₴
      </p>
    </div>
  );
};

const isDataReceivedSelector = createSelector(
  state => state.cart.isDataReceived,
  isDataReceived => isDataReceived,
);

const cartDataSelector = createSelector(
  state => state.cart.cartData,
  cartData => cartData,
);

const Cart = () => {
  const isDataReceived = useSelector(isDataReceivedSelector);
  const cartData = useSelector(cartDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs items={['Главная', 'Корзина']} />
        <div className={styles.cart}>
          <h4>Корзина</h4>
          <div className={styles.table}>
            {cartData.length === 0 ? (
              <div className={styles.noProductsBlock}>
                <h4>
                  К сожалению в корзине ничего нет, возможно вы посмотрите наши
                  новинки?
                </h4>
                <Link href="/">
                  <a className={styles.linkShowNews}>Посмотреть новинки</a>
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.tableHeader}>
                  <p className={styles.tableTitleOne}>Выбранные товары</p>
                  <p className={styles.tableTitleTwo}>Количество</p>
                  <p className={styles.tableTitleThree}>Цена</p>
                </div>
                <hr className={styles.line} />
                <div>
                  {cartData.map(item => (
                    <CartItem key={item.id} item={item} dispatch={dispatch} />
                  ))}
                </div>
                <hr className={`${styles.line} ${styles.lineSecond}`} />
                <div className={styles.totalPriceWrapper}>
                  <p className={styles.totalPrice}>
                    Итого:{' '}
                    <span className={styles.price}>
                      {calculateTotalSum(cartData)},00 ₴
                    </span>
                  </p>
                </div>
                <div className={styles.buttons}>
                  <Link href="/">
                    <a className={styles.linkContinue}>Продолжить покупки</a>
                  </Link>
                  <Link href="/order">
                    <a className={styles.linkMakeOrder}>Оформить заказ</a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    count: PropTypes.number,
    good: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string,
      vendor_code: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
      id: PropTypes.number,
    }),
  }),
  dispatch: PropTypes.func,
};

export default Cart;
