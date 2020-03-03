import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCartData,
  deleteFromCart,
  updateCartData,
} from '../../../redux/actions/cart';
import { getProductsData } from '../../../redux/actions/products';
import {
  calculateTotalSum,
  createArrForRequestProducts,
} from '../../../utils/helpers';
import {
  isAuthSelector,
  isDataReceivedSelectorForCart,
  isDataReceivedSelectorForProducts,
  productsSelector,
  cartDataSelector,
  userDataSelector,
} from '../../../utils/selectors';
import styles from './Cart.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Button from '../../Layout/Button/Button';
import Counter from '../../Layout/Counter/Counter';
import Loader from '../../Loader/Loader';

const updateCartForNotAuthUser = (id, count) => {
  const arrOfIdProduct = JSON.parse(localStorage.getItem('arrOfIdProduct'));
  const findItem = arrOfIdProduct.find(item => item.id === id);
  const newArr = arrOfIdProduct.map(item => item.id === findItem.id ? { ...item, count } : item);
  localStorage.setItem('arrOfIdProduct', JSON.stringify(newArr));
};

const deleteFromCartForNOtAuthUser = (id) => {
  const arrOfIdProduct = JSON.parse(localStorage.getItem('arrOfIdProduct'));
  const newArr = arrOfIdProduct.filter(item => item.id !== id);
  localStorage.setItem('arrOfIdProduct', JSON.stringify(newArr));
};

const CartItem = ({ item, dispatch, isAuth }) => {
  const [count, setCount] = useState(item.count);

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemChooseProduct}>
        <img
          className={styles.cartItemImage}
          src={item.good.img_link}
          alt={item.good.img_link}
        />
        <div className={styles.cartItemMainInfo}>
          <h5>{item.good.name}</h5>
          <p className={styles.cartItemSeries}>{item.good.vendor_code}</p>
          <div className={styles.cartItemMainInfoDetails}>
            <p className={styles.cartItemSize}>
              Размер:
              <span className={styles.cartItemSizeValue}>{item.size.size}</span>
            </p>
            <div
              className={styles.colorBock}
              style={{
                background: item.color.hex
                  ? `${item.color.hex}`
                  : `url(${item.color.img_link})`,
              }}
            />
            <p className={styles.cartItemColorName}>{item.color.name}</p>
          </div>
        </div>
        <button
          className={styles.cartItemButtonDelete}
          type="button"
          onClick={() => {
            if (isAuth) {
              dispatch(
                deleteFromCart({
                  params: {},
                  body: {
                    cart_id: item.id,
                  },
                }),
              );
            } else {
              deleteFromCartForNOtAuthUser(item.good.id);
              dispatch(
                getProductsData({
                  good_ids: createArrForRequestProducts('arrOfIdProduct'),
                }),
              );
            }
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
          if (isAuth) {
            dispatch(
              updateCartData({
                params: {},
                body: {
                  cart_id: item.id,
                  count: amountOfProduct,
                },
              }),
            );
          } else {
            updateCartForNotAuthUser(item.good.id, amountOfProduct);
            dispatch(
              getProductsData({
                good_ids: createArrForRequestProducts('arrOfIdProduct'),
              }),
            );
          }
        }}
      />
      <p className={styles.cartItemPrice}>
        {item.good.price * item.count},00 ₴
      </p>
    </div>
  );
};

const Cart = () => {
  const isDataReceivedForCart = useSelector(isDataReceivedSelectorForCart);
  const isDataReceivedForProducts = useSelector(
    isDataReceivedSelectorForProducts,
  );
  const cartData = useSelector(cartDataSelector);
  const products = useSelector(productsSelector);
  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
    } else {
      dispatch(
        getProductsData({
          good_ids: createArrForRequestProducts('arrOfIdProduct'),
        }),
      );
    }
  }, [isAuth]);

  if (!isDataReceivedForProducts && !isDataReceivedForCart) {
    return <Loader />;
  }

  const getArrOfProducts = () => {
    const arrProducts = isAuth ? cartData : products;
    return arrProducts.map((item, index) => {
      const itemFromStorage =
        localStorage.getItem('arrOfIdProduct')
        && JSON.parse(localStorage.getItem('arrOfIdProduct'))[index];
      const itemProduct = (item.good && item) || {
        good: item,
        count: itemFromStorage.count,
        color: itemFromStorage.color,
        size: itemFromStorage.size,
      };

      return (
        <CartItem
          key={item.id}
          item={itemProduct}
          isAuth={isAuth}
          dispatch={dispatch}
        />
      );
    });
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs items={['Главная', 'Корзина']} />
        <div className={styles.cart}>
          <h4>Корзина</h4>
          <div className={styles.table}>
            {!cartData.length && !products.length ? (
              <div className={styles.noProductsBlock}>
                <h4>
                  К сожалению в корзине ничего нет, возможно вы посмотрите наши
                  новинки?
                </h4>
                <Link href="/">
                  <Button
                    href
                    title="Посмотреть новинки"
                    viewType="white"
                    classNameWrapper={styles.linkWrapperNews}
                  />
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
                <div>{getArrOfProducts()}</div>
                <hr className={`${styles.line} ${styles.lineSecond}`} />
                <div className={styles.totalPriceWrapper}>
                  <p className={styles.totalPrice}>
                    Итого:{' '}
                    <span className={styles.price}>
                      {calculateTotalSum(cartData, products)},00 ₴
                    </span>
                  </p>
                </div>
                <div className={styles.buttons}>
                  <Link href="/">
                    <Button
                      href
                      title="Продолжить покупки"
                      viewType="white"
                      classNameWrapper={styles.linkWrapper}
                    />
                  </Link>
                  <Link href="/order">
                    <Button
                      href
                      title="Оформить заказ"
                      viewType="black"
                      classNameWrapper={styles.linkWrapper}
                    />
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
    good: PropTypes.shape({
      name: PropTypes.string,
      vendor_code: PropTypes.string,
      price: PropTypes.number,
      id: PropTypes.number,
      img_link: PropTypes.string,
      count: PropTypes.number,
    }),
    count: PropTypes.number,
    color: PropTypes.shape({
      name: PropTypes.string,
      hex: PropTypes.string,
      img_link: PropTypes.string,
    }),
    size: PropTypes.shape({
      size: PropTypes.string,
    }),
    id: PropTypes.number,
  }),
  dispatch: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default Cart;
