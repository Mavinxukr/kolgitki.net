import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCartData,
  deleteFromCart,
  updateCartData,
} from '../../../redux/actions/cart';
import { getProductsData } from '../../../redux/actions/products';
import {
  calculateTotalSum,
  createCleanUrl,
  getCorrectPrice,
  setFiltersInCookies,
  getCorrectWordCount,
  parseText,
} from '../../../utils/helpers';
import {
  isAuthSelector,
  isDataReceivedSelectorForCart,
  isDataReceivedSelectorForProducts,
  productsSelector,
  cartDataSelector,
} from '../../../utils/selectors';
import { cookies } from '../../../utils/getCookies';
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
              {parseText(cookies, 'Размер', 'Розмір')}:
              <span className={styles.cartItemSizeValue}>{item.size.size}</span>
            </p>
            <div className={styles.colorInfoWrapper}>
              {isSmallMobileScreen && <p className={styles.colorText}>Цвет:</p>}
              <div
                className={cx(styles.colorBock, {
                  [styles.withBorder]: item.color.name === 'White',
                })}
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
          {(!isDesktopScreen && <IconDelete className={styles.iconDelete} />)
            || parseText(cookies, 'Удалить', 'Видалити')}
        </button>
      </div>
      <div className={styles.counterWrapper}>
        {isSmallMobileScreen && (
          <p className={styles.countText}>
            {parseText(cookies, 'Кол-во:', 'К-сть')}
          </p>
        )}
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
        {(!newItem.new_price && !newItem.price_for_3
          && `${getCorrectPrice(
            (newItem.price * item.count).toFixed(2),
          )} грн.`) || newItem.price_for_3 && newItem.new_price && (
          <>
            <span className={styles.oldPrice}>
              {getCorrectPrice((newItem.price * item.count).toFixed(2))} грн.
            </span>
            <span className={styles.stockPrice}>
              {getCorrectPrice(
                (
                  ((item.count % 3) * newItem.new_price)
                  + ((item.count - (item.count % 3)) * newItem.price_for_3)
                ).toFixed(2),
              )}{' '}
              грн.
            </span>
          </>
        ) || newItem.new_price && !newItem.price_for_3 && (
          <>
            <span className={styles.oldPrice}>
              {getCorrectPrice((newItem.price * item.count).toFixed(2))} грн.
            </span>
            <span className={styles.stockPrice}>
              {getCorrectPrice((newItem.new_price * item.count).toFixed(2))}{' '}
              грн.
            </span>
          </>
        ) || !newItem.new_price && newItem.price_for_3 && (
          <>
            <span className={styles.oldPrice}>
              {getCorrectPrice((newItem.price * item.count).toFixed(2))} грн.
            </span>
            <span className={styles.stockPrice}>
              {getCorrectPrice(
                (
                  ((item.count % 3) * newItem.price)
                  + ((item.count - (item.count % 3)) * newItem.price_for_3)
                ).toFixed(2),
              )}{' '}
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
  const router = useRouter();

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
                nameUa: 'Головна',
                pathname: '/',
              },
              {
                id: 2,
                name: 'Корзина',
                nameUa: 'Кошик',
              },
            ]}
          />
          <div className={styles.cart}>
            <div className={styles.cartHeader}>
              <h5 className={styles.cartTitle}>
                {parseText(cookies, 'Корзина', 'Кошик')}
              </h5>
              {isMobileScreen && (
                <p className={styles.countTextFirst}>
                  {getCorrectWordCount(
                    cartData.length || products.length,
                    parseText(
                      cookies,
                      ['Товар', 'Товара', 'Товаров'],
                      ['Товар', 'товари', 'Товарів'],
                    ),
                  )}
                  {}
                </p>
              )}
            </div>
            <div className={styles.table}>
              <>
                <div className={styles.tableHeader}>
                  <p className={styles.tableTitleOne}>
                    {parseText(cookies, 'Выбранные товары', 'Вибрані товари')}
                  </p>
                  <p className={styles.tableTitleTwo}>
                    {parseText(cookies, 'Количество', 'Кількість')}
                  </p>
                  <p className={styles.tableTitleThree}>
                    {parseText(cookies, 'Цена', 'Ціна')}
                  </p>
                </div>
                <hr className={styles.line} />
                <div>{getArrOfProducts()}</div>
                <hr className={`${styles.line} ${styles.lineSecond}`} />
                <div className={styles.totalPriceWrapper}>
                  <p className={styles.totalPrice}>
                    {parseText(cookies, 'Итого', 'Разом')}:{' '}
                    <span className={styles.price}>
                      {getCorrectPrice(calculateTotalSum(cartData, products))}{' '}
                      грн.
                    </span>
                  </p>
                </div>
                <div className={styles.buttons}>
                  <Link href="/Products" prefetch={false}>
                    <Button
                      href
                      title="Продолжить покупки"
                      titleUa="Продовжити покупки"
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
                      titleUa="Оформити замовлення"
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
              && parseText(
                cookies,
                'К сожалению в корзине ничего нет, возможно вы посмотрите наши новинки?',
                'На жаль в кошику нічого немає, можливо ви подивитесь наші новинки?',
              ))
              || parseText(cookies, 'Корзина пустая', 'Кошик порожній')}
          </h5>
          <Button
            href
            buttonType="button"
            title={
              (isDesktopScreen && 'Посмотреть новинки') || 'Продолжить покупки'
            }
            titleUa={
              (isDesktopScreen && 'Переглянути новинки') || 'Продовжити покупки'
            }
            viewType={(isDesktopScreen && 'white') || 'black'}
            classNameWrapper={styles.linkWrapperNews}
            onClick={() => {
              setFiltersInCookies(cookies, { sort_date: 'desc' });
              router.push(
                '/Products',
                `/Products_${createCleanUrl(cookies).join('_')}`,
              );
            }}
          />
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
  isDesktopScreen: PropTypes.bool,
};

Cart.propTypes = {
  isMobileScreen: PropTypes.bool,
  isSmallMobileScreen: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Cart);
