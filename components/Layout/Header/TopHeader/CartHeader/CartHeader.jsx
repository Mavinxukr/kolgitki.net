import React from 'react';
import Link from 'next/link';
import IconCart from '../../../../../public/svg/cart.svg';
import IconExit from '../../../../../public/svg/Group795.svg';
import styles from './CartHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartDataSelector,
  isAuthSelector,
  productsSelector
} from '../../../../../utils/selectors';
import { calculateTotalSum, parseText } from '../../../../../utils/helpers';
import { cookies } from '../../../../../utils/getCookies';
import Button from '../../../Button/Button';
import { deleteFromCart } from '../../../../../redux/actions/cart';
import { getProductsData } from '../../../../../redux/actions/products';

const deleteFromCartForNOtAuthUser = selectItem => {
  const newItem = selectItem.good || selectItem.present;
  const key = selectItem.present ? 'arrOfIdPresent' : 'arrOfIdProduct';
  const arrOfIdProduct = JSON.parse(localStorage.getItem(key));
  const newArr = arrOfIdProduct.filter(
    item =>
      (item.good_id !== newItem.id && item.present_id !== newItem.id) ||
      item.color_id !== selectItem.color.id ||
      item.size_id !== selectItem.size.id
  );
  localStorage.setItem(key, JSON.stringify(newArr));
};

export const CartHeader = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const cartData = useSelector(cartDataSelector);
  const products = useSelector(productsSelector);

  return (
    <div className={styles.cart}>
      <Link href="/cart" prefetch={false} passHref>
        <a className={styles.cart_link}>
          <IconCart className={styles.icon}></IconCart>
          {products.length > 0 || cartData.length > 0 ? (
            <span className={styles.cart_count}>
              {cartData.length || products.length}
            </span>
          ) : null}
        </a>
      </Link>

      <div className={styles.cart_wrapper}>
        {calculateTotalSum(cartData, products) > 0 ? (
          <>
            <div className={styles.cart_list}>
              {(isAuth ? cartData : products).map((item, index) => {
                const newItem = item.good || item.present;
                return (
                  <li
                    key={`${index}-${item.good.id}`}
                    className={styles.cart_item}
                  >
                    <button
                      type="button"
                      className={styles.cart_item_delete}
                      onClick={() => {
                        if (isAuth) {
                          dispatch(
                            deleteFromCart({
                              params: {},
                              body: {
                                cart_id: item.id
                              }
                            })
                          );
                        } else {
                          deleteFromCartForNOtAuthUser(item);
                          dispatch(
                            getProductsData(
                              {},
                              {
                                goods:
                                  localStorage.getItem('arrOfIdProduct') ||
                                  '[]',
                                presents:
                                  localStorage.getItem('arrOfIdPresent') || '[]'
                              }
                            )
                          );
                        }
                      }}
                    >
                      <IconExit className={styles.icon} />
                    </button>
                    <div className={styles.cart_item_image}>
                      <Link href="/cart" prefetch={false} passHref>
                        <img
                          className={styles.cart_item_link}
                          src={newItem.img_link}
                          alt={newItem.img_link}
                        />
                      </Link>
                    </div>
                    <div className={styles.cart_item_footer}>
                      <Link href="/cart" prefetch={false} passHref>
                        <h6>
                          {parseText(cookies, newItem.name, newItem.name_uk)}
                        </h6>
                      </Link>
                      <div className={styles.cart_item_info}>
                        <p className={styles.cart_item_size}>
                          {parseText(cookies, 'Размер', 'Розмір')}:{' '}
                          <span className={styles.cart_item_text}>
                            {item.size.name}
                          </span>
                        </p>
                        <p className={styles.cart_item_color}>
                          {parseText(cookies, 'Цвет', 'Колір')}:{' '}
                          <span className={styles.cart_item_text}>
                            {item.color.name}
                          </span>
                        </p>
                        <p className={styles.cart_item_price}>
                          {parseText(cookies, 'Цена', 'Ціна')}:{' '}
                          <span className={styles.cart_item_text}>
                            {newItem.price || item?.good?.price} грн
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
            <div className={styles.cart_total}>
              <span>{parseText(cookies, 'Итого', 'Разом')}:</span>
              <span>{calculateTotalSum(cartData, products)} грн</span>
            </div>
          </>
        ) : (
          <p className={styles.cart_empty}>
            {parseText(
              cookies,
              'Ваша корзина пока пуста',
              'Ваш кошик порожній'
            )}
          </p>
        )}
        {calculateTotalSum(cartData, products) > 0 ? (
          <Link href="/cart" prefetch={false}>
            <Button
              href
              title="Оформить заказ"
              titleUa="Оформити замовлення"
              viewType="black"
              classNameWrapper={styles.cart_button}
            />
          </Link>
        ) : (
          <Link href="/stock" prefetch={false}>
            <Button
              href
              title="Посмотреть акции"
              titleUa="Переглянути акції"
              viewType="black"
              classNameWrapper={styles.cart_button}
            />
          </Link>
        )}
      </div>
    </div>
  );
};
