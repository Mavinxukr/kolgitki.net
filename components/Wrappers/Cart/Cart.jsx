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
import { getProductsData } from '../../../redux/actions/products';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import { calculateTotalSum } from '../../../utils/helpers';
import { createArrForRequestProducts } from '../../../utils/helpers';
import styles from './Cart.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Button from '../../Layout/Button/Button';
import Counter from '../../Layout/Counter/Counter';
import Loader from '../../Loader/Loader';

const updateCartForNotAuthUser = (id, count) => {
  const arrOfIdProduct = JSON.parse(localStorage.getItem('arrOfIdProduct'));
  const findItem = arrOfIdProduct.find(item => item.id === id);
  const newArr = arrOfIdProduct.map(item => item.id === findItem.id ? { id: findItem.id, count } : item);
  localStorage.setItem('arrOfIdProduct', JSON.stringify(newArr));
};

const deleteFromCartForNOtAuthUser = (id) => {
  const arrOfIdProduct = JSON.parse(localStorage.getItem('arrOfIdProduct'));
  const newArr = arrOfIdProduct.filter(item => item.id !== id);
  localStorage.setItem('arrOfIdProduct', JSON.stringify(newArr));
};

const CartItem = ({
  item, dispatch, isAuth, countProducts,
}) => {
  const [count, setCount] = useState(countProducts);

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemChooseProduct}>
        <img
          className={styles.cartItemImage}
          src={item.images[0].image_link}
          alt={item.images[0].image_link}
        />
        <div className={styles.cartItemMainInfo}>
          <h5>{item.name}</h5>
          <p className={styles.cartItemSeries}>{item.vendor_code}</p>
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
                background: `${item.images[0].colors.hex}`,
                display: 'inline-block',
                marginRight: '10px',
                marginLeft: '19px',
              }}
            />
            <p className={styles.cartItemColorName}>
              {item.images[0].colors.name}
            </p>
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
                    good_id: item.id,
                  },
                }),
              );
            } else {
              deleteFromCartForNOtAuthUser(item.id);
              dispatch(getProductsData({
                good_ids: createArrForRequestProducts('arrOfIdProduct'),
              }));
            }
          }}
        >
          Удалить
        </button>
      </div>
      <Counter
        count={item.count}
        amountOfProduct={count}
        setAmountOfProduct={setCount}
        classNameForCounter={styles.cartItemCounterWrapper}
        updateCount={(amountOfProduct) => {
          if (isAuth) {
            dispatch(
              updateCartData({
                params: {},
                body: {
                  good_id: item.id,
                  count: amountOfProduct,
                },
              }),
            );
          } else {
            updateCartForNotAuthUser(item.id, amountOfProduct);
            dispatch(getProductsData({
              good_ids: createArrForRequestProducts('arrOfIdProduct'),
            }));
          }
        }}
      />
      <p className={styles.cartItemPrice}>{item.price * countProducts},00 ₴</p>
    </div>
  );
};

const isDataReceivedSelectorForCart = createSelector(
  state => state.cart.isDataReceived,
  isDataReceived => isDataReceived,
);

const cartDataSelector = createSelector(
  state => state.cart.cartData,
  cartData => cartData,
);

const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth,
);

const productsSelector = createSelector(
  state => state.products.products,
  products => products,
);

const isDataReceivedSelectorForProducts = createSelector(
  state => state.products.isDataReceived,
  isDataReceived => isDataReceived,
);

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
    dispatch(sendCurrentUserData({}));
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
    }
    if (!isAuth && localStorage.getItem('arrOfIdProduct')) {
      dispatch(
        getProductsData({
          good_ids: createArrForRequestProducts('arrOfIdProduct'),
        }),
      );
    }
  }, [isAuth]);

  if (
    (!isDataReceivedForCart && isAuth)
    || (!isDataReceivedForProducts && !isAuth)
  ) {
    return <Loader />;
  }

  const getArrOfProducts = () => {
    const arrProducts = isAuth ? cartData : products;
    return arrProducts.map((item, index) => {
      const itemProduct = item.good || item;
      const countProducts = isAuth
        ? item.count
        : JSON.parse(localStorage.getItem('arrOfIdProduct'))[index].count;

      return (
        <CartItem
          key={item.id}
          item={itemProduct}
          isAuth={isAuth}
          dispatch={dispatch}
          countProducts={countProducts}
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
    count: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    vendor_code: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
  }),
  countProducts: PropTypes.number,
  dispatch: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default Cart;
