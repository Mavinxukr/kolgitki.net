import React, { useEffect } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  ordersDataSelector,
  isDataReceivedForOrders
} from '../../../../utils/selectors';
import { cookies } from '../../../../utils/getCookies';
import { parseText, getCorrectPrice } from '../../../../utils/helpers';
import { getOrdersData } from '../../../../redux/actions/order';
import ProfileOrderHeader from '../../../ProfileOrderHeader/ProfileOrderHeader';
import ButtonFavourite from '../../../ButtonFavourite/ButtonFavourite';
import Loader from '../../../Loader/Loader';
import styles from './Orders.scss';

const LiItemUserInfo = ({ label, value, labelUk, valueUk }) => (
  <li className={styles.userInfoDeliveryItem}>
    <p className={styles.userInfoDeliveryTextOne}>
      {parseText(cookies, label, labelUk)}
    </p>
    <p className={styles.userInfoDeliveryTextTwo}>
      {parseText(cookies, value, valueUk)}
    </p>
  </li>
);

const LiItemPrices = ({ label, labelUk, value, valueUk }) => (
  <li className={styles.userInfoPricesItem}>
    <p className={styles.userInfoPricesText}>
      {parseText(cookies, label, labelUk)}
    </p>
    <p className={styles.userInfoPricesPrice}>
      {parseText(cookies, value, valueUk)}
    </p>
  </li>
);

const Orders = () => {
  const orders = useSelector(ordersDataSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData({}));
  }, []);

  if (!isDataReceived) {
    return <Loader isSmallPage />;
  }

  if (document.location.search) {
    setTimeout(() => {
      const heightScroll = document.querySelector('.uk-open').offsetTop;
      scroll.scrollTo(heightScroll, {
        duration: 600
      });
    }, 1000);
  }

  return (
    <div className={styles.profileOrder}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Заказы', 'Замовлення')}
      </h3>
      <div className={styles.accordionWrapper} uk-accordion="multiple: true">
        {orders.map(item => {
          return (
            <ProfileOrderHeader
              key={item.id}
              classNameActive={styles.active}
              isToggled={Number(router.query.idOrder) === item.id}
              item={item}
            >
              <div className={styles.chooseProductsCards}>
                {item.goods.map((good, index) => {
                  const itemGood = good.good || good.present;
                  console.log(good);
                  const href = good.good
                    ? `/product/${itemGood.id}`
                    : {
                        pathname: `/product/${itemGood.id}`,
                        query: {
                          present: true
                        }
                      };

                  return (
                    <Link href={href} prefetch={false} passHref>
                      <div key={index} className={styles.chooseProduct}>
                        <div className={styles.chooseProductGroup}>
                          <img
                            src={itemGood.img_link}
                            className={styles.orderImage}
                            alt="name"
                          />
                          <div className={styles.mainInfo}>
                            <p className={styles.model}>
                              {parseText(
                                cookies,
                                itemGood.name,
                                itemGood.name_uk
                              )}
                            </p>
                            {itemGood.vendor_code && (
                              <p className={styles.series}>
                                {itemGood.vendor_code}
                              </p>
                            )}
                            <div className={styles.mainInfoDetails}>
                              <p className={styles.size}>
                                {parseText(cookies, 'Размер', 'Розмір')}:{' '}
                                <span className={styles.sizeValue}>
                                  {good.size.name}
                                </span>
                              </p>
                              <div
                                className={cx({
                                  [styles.withBorder]:
                                    good.color.name === 'White'
                                })}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  background: good.color.hex
                                    ? `${good.color.hex}`
                                    : `url(${good.color.img_link})`,
                                  display: 'inline-block',
                                  marginRight: '10px',
                                  marginLeft: '19px'
                                }}
                              />
                              <p className={styles.colorName}>
                                {good.color.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={styles.addInfo}>
                          <p className={styles.countProducts}>
                            {good.count} шт
                          </p>
                          <ButtonFavourite
                            classNameWrapper={styles.buttonFavourite}
                            item={good}
                            newItem={itemGood}
                          />
                          <p className={styles.price}>
                            {getCorrectPrice(good.price)} грн
                          </p>
                          <p className={styles.priceTotal}>
                            {getCorrectPrice(good.total)} грн
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className={styles.userInfo}>
                <ul className={styles.userInfoDeliveryItems}>
                  <LiItemUserInfo
                    label="Способ оплаты:"
                    labelUk="Спосіб оплати:"
                    value={
                      item.payment === 'card' ? 'Картой' : 'Наложений платеж'
                    }
                    valueUk={
                      item.payment === 'card' ? 'Картою' : 'Накладений платіж'
                    }
                  />
                  <LiItemUserInfo
                    label="Служба доставки:"
                    labelUk="Служба доставки:"
                    value={item.delivery}
                  />
                  {item.delivery_post_office && (
                    <LiItemUserInfo
                      label="Способ доставки:"
                      labelUk="Спосіб доставки:"
                      value="В отделении"
                      valueUk="У відділенні"
                    />
                  )}
                </ul>
                <div className={styles.userInfoDetails}>
                  <p className={styles.userInfoDetailsText}>
                    {`${item.user_name} ${item.user_surname} ${item.user_patronymic}`}
                  </p>
                  <p className={styles.userInfoDetailsText}>
                    {item.user_phone}
                  </p>
                  {item.delivery_address && (
                    <p className={styles.userInfoDetailsText}>
                      {item.delivery_address}
                    </p>
                  )}
                  {item.delivery_post_office && (
                    <>
                      <p className={styles.userInfoDetailsText}>
                        {item.delivery_city}
                      </p>
                      <p className={styles.userInfoDetailsText}>
                        {item.delivery_post_office}
                      </p>
                    </>
                  )}
                  <p className={styles.userInfoDetailsText}>
                    {item.user_email}
                  </p>
                  {item.invoice_number && (
                    <div className={styles.userInfoDetailsNumbers}>
                      <p className={styles.userInfoDetailsNumberText}>
                        Номер ТТН:
                      </p>
                      <p className={styles.userInfoDetailsNumberId}>
                        {item.invoice_number}
                      </p>
                    </div>
                  )}
                </div>
                <ul className={styles.userInfoPrices}>
                  <LiItemPrices
                    label="Сумма за товар"
                    labelUk="Сума за товар"
                    value={`${(item.total_goods_sum &&
                      getCorrectPrice(item.total_goods_sum)) ||
                      '0'} грн`}
                  />
                  <LiItemPrices
                    label="Скидка"
                    labelUk="Знижка"
                    value={`${(item.discount &&
                      getCorrectPrice(item.discount)) ||
                      '0'} грн`}
                  />
                  <LiItemPrices
                    label="Оплачено бонусами"
                    labelUk="Сплачено бонусами"
                    value={`${(item.use_bonuses &&
                      getCorrectPrice(item.use_bonuses)) ||
                      '0'} грн`}
                  />
                  <LiItemPrices
                    label="Сумма заказа"
                    labelUk="Сума замовлення"
                    value={`${(item.total_amount &&
                      getCorrectPrice(item.total_amount)) ||
                      '0'} грн`}
                  />
                  <LiItemPrices
                    label="Доставка"
                    labelUk="Доставка"
                    value={`${getCorrectPrice(item.delivery_cost)} грн `}
                  />
                  <hr className={styles.line} />
                  <li className={styles.userInfoPricesItemTotal}>
                    <p className={styles.userInfoPricesItemTotalText}>
                      {parseText(cookies, 'Итого', 'Разом')}:
                    </p>
                    <p className={styles.userInfoPricesPrice}>
                      {getCorrectPrice(item.total_amount)} грн
                    </p>
                  </li>
                </ul>
              </div>
            </ProfileOrderHeader>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
