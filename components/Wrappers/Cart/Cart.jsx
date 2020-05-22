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
import { calculateTotalSum, getCorrectPrice } from '../../../utils/helpers';
import {
  isAuthSelector,
  isDataReceivedSelectorForCart,
  isDataReceivedSelectorForProducts,
  productsSelector,
  cartDataSelector,
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';
import styles from './Cart.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Button from '../../Layout/Button/Button';
import Counter from '../../Layout/Counter/Counter';
import Loader from '../../Loader/Loader';
import IconDelete from '../../../public/svg/Group600.svg';

const updateCartForNotAuthUser = (selectItem, count) => {
  const newItem = selectItem.good || selectItem.present;
  const key = selectItem.present ? 'arrOfIdPresent' : 'arrOfIdProduct';
  const arrOfIdProduct = JSON.parse(localStorage.getItem(key));
  const newArr = arrOfIdProduct.map(item => (item.good_id === newItem.id || item.present_id === newItem.id)
    && item.color_id === selectItem.color.id
    && item.size_id === selectItem.size.id
    ? { ...item, count }
    : item);
  localStorage.setItem(key, JSON.stringify(newArr));
};

const deleteFromCartForNOtAuthUser = (selectItem) => {
  const newItem = selectItem.good || selectItem.present;
  const key = selectItem.present ? 'arrOfIdPresent' : 'arrOfIdProduct';
  const arrOfIdProduct = JSON.parse(localStorage.getItem(key));
  const newArr = arrOfIdProduct.filter(
    item => (item.good_id !== newItem.id && item.present_id !== newItem.id)
      || item.color_id !== selectItem.color.id
      || item.size_id !== selectItem.size.id,
  );
  localStorage.setItem(key, JSON.stringify(newArr));
};

const CartItem = ({
  item,
  dispatch,
  isAuth,
  isSmallMobileScreen,
  isDesktopScreen,
}) => {
  const [count, setCount] = useState(item.count);
  const newItem = item.good || item.present;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemChooseProduct}>
        <img
          className={styles.cartItemImage}
          src={newItem.img_link}
          alt={newItem.img_link}
        />
        <div className={styles.cartItemMainInfo}>
          <h5 className={styles.cartItemTitle}>{newItem.name}</h5>
          <p className={styles.cartItemSeries}>{newItem.vendor_code}</p>
          <div className={styles.cartItemMainInfoDetails}>
            <p className={styles.cartItemSize}>
              Размер:
              <span className={styles.cartItemSizeValue}>{item.size.size}</span>
            </p>
            <div className={styles.colorInfoWrapper}>
              {isSmallMobileScreen && <p className={styles.colorText}>Цвет:</p>}
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
              deleteFromCartForNOtAuthUser(item);
              dispatch(
                getProductsData(
                  {},
                  {
                    goods: localStorage.getItem('arrOfIdProduct') || '[]',
                    presents: localStorage.getItem('arrOfIdPresent') || '[]',
                  },
                ),
              );
            }
          }}
        >
          {(!isDesktopScreen && (
            <IconDelete className={styles.iconDelete} />
          ))
            || 'Удалить'}
        </button>
      </div>
      <div className={styles.counterWrapper}>
        {isSmallMobileScreen && <p className={styles.countText}>Кол-во:</p>}
        <Counter
          count={newItem.count}
          amountOfProduct={count}
          setAmountOfProduct={setCount}
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
              updateCartForNotAuthUser(item, amountOfProduct);
              dispatch(
                getProductsData(
                  {},
                  {
                    goods: localStorage.getItem('arrOfIdProduct') || '[]',
                    presents: localStorage.getItem('arrOfIdPresent') || '[]',
                  },
                ),
              );
            }
          }}
        />
      </div>
      <p className={styles.cartItemPrice}>
        {(!newItem.new_price
          && `${getCorrectPrice(
            (newItem.price * item.count).toFixed(2),
          )} грн.`) || (
          <>
            <span className={styles.oldPrice}>
              {getCorrectPrice((newItem.price * item.count).toFixed(2))}{' '}
              грн.
            </span>
            <span className={styles.stockPrice}>
              {getCorrectPrice((newItem.new_price * item.count).toFixed(2))}{' '}
              грн.
            </span>
          </>
        )}
      </p>
    </div>
  );
};

const Cart = ({ isMobileScreen, isSmallMobileScreen, isDesktopScreen }) => {
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
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct') || '[]',
            presents: localStorage.getItem('arrOfIdPresent') || '[]',
          },
        ),
      );
    }
  }, [isAuth]);

  if (!isDataReceivedForProducts && !isDataReceivedForCart) {
    return <Loader />;
  }

  const getArrOfProducts = () => {
    const arrProducts = isAuth ? cartData : products;
    return arrProducts.map(item => (
      <CartItem
        key={item.id}
        item={item}
        isAuth={isAuth}
        dispatch={dispatch}
        isSmallMobileScreen={isSmallMobileScreen}
        isDesktopScreen={isDesktopScreen}
      />
    ));
  };

  return (
    <MainLayout>
      {cartData.length || products.length ? (
        <div className={styles.content}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                pathname: '/',
              },
              {
                id: 2,
                name: 'Корзина',
              },
            ]}
          />
          <div className={styles.cart}>
            <div className={styles.cartHeader}>
              <h5 className={styles.cartTitle}>Корзина</h5>
              {isMobileScreen && (
                <p className={styles.countTextFirst}>
                  {cartData.length || products.length} Товара
                </p>
              )}
            </div>
            <div className={styles.table}>
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
                      {getCorrectPrice(calculateTotalSum(cartData, products))}{' '}
                      грн.
                    </span>
                  </p>
                </div>
                <div className={styles.buttons}>
                  <Link href="/" prefetch={false}>
                    <Button
                      href
                      title="Продолжить покупки"
                      viewType="white"
                      classNameWrapper={styles.linkWrapper}
                    />
                  </Link>
                  <Link
                    href={isAuth ? '/order' : '/cart-entry'}
                    prefetch={false}
                  >
                    <Button
                      href
                      title="Оформить заказ"
                      viewType="black"
                      classNameWrapper={styles.linkWrapper}
                    />
                  </Link>
                </div>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noProductsBlock}>
          <h5 className={styles.noProductsTitle}>
            {(isDesktopScreen
              && 'К сожалению в корзине ничего нет, возможно вы посмотрите наши новинки?')
              || 'Корзина пустая'}
          </h5>
          <Link
            href={{
              pathname: '/Products',
              query: {
                sort_date: 'desc',
              },
            }}
            prefetch={false}
          >
            <Button
              href
              title={
                (isDesktopScreen && 'Посмотреть новинки')
                || 'Продолжить покупки'
              }
              viewType={(isDesktopScreen && 'white') || 'black'}
              classNameWrapper={styles.linkWrapperNews}
            />
          </Link>
        </div>
      )}
    </MainLayout>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    good: PropTypes.object,
    present: PropTypes.object,
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
  isSmallMobileScreen: PropTypes.bool,
};

Cart.propTypes = {
  isMobileScreen: PropTypes.bool,
  isSmallMobileScreen: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Cart);
