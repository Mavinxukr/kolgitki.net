import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import {
  ordersDataSelector,
  isDataReceivedForOrders,
} from '../../../utils/selectors';
import Loader from '../../Loader/Loader';
import { getOrdersData } from '../../../redux/actions/order';
import styles from './Check.scss';

const LiItemUserInfo = ({
  label, labelUa, value, valueUa,
}) => (
  <li className={styles.userInfoDeliveryItem}>
    <p className={styles.userInfoDeliveryTextOne}>
      {parseText(cookies, label, labelUa)}
    </p>
    <p className={styles.userInfoDeliveryTextTwo}>
      {parseText(cookies, value, valueUa)}
    </p>
  </li>
);

const LiItemPrices = ({
  label, labelUa, value, valueUa,
}) => (
  <li className={styles.userInfoPricesItem}>
    <p className={styles.userInfoPricesText}>
      {parseText(cookies, label, labelUa)}
    </p>
    <p className={styles.userInfoPricesPrice}>
      {parseText(cookies, value, valueUa)}
    </p>
  </li>
);

const Check = () => {
  const orders = useSelector(ordersDataSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getOrdersData({}));
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  useEffect(() => {
    if (isDataReceived) {
      setSelectedItem(
        orders.find(item => item.id === Number(router.query.orderId)),
      );
    }
  }, [isDataReceived]);

  if (!isDataReceived || !selectedItem) {
    return <Loader />;
  }
  console.log(selectedItem)
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>
        {parseText(cookies, 'Заказ', 'Замовлення')} №{selectedItem.id}
      </h2>
      <div className={styles.chooseProductsCards}>
        {selectedItem.goods.map((good, index) => (
          <div key={index} className={styles.chooseProduct}>
            <div className={styles.chooseProductGroup}>
              <img
                src={good?.good?.img_link || '/images/logo_cut.png'}
                className={styles.orderImage}
                alt="name"
                style={{ objectFit: 'contain' }}
              />
              <div className={styles.mainInfo}>
                <p className={styles.model}>{good?.good?.name}</p>
                <p className={styles.series}>{good?.good?.vendor_code}</p>
                <div className={styles.mainInfoDetails}>
                  <p className={styles.size}>
                    {parseText(cookies, 'Размер', 'Розмір')}:{' '}
                    <span className={styles.sizeValue}>{good.size.size}</span>
                  </p>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      background: good.color.hex
                        ? `${good.color.hex}`
                        : `url(${good.color.img_link})`,
                      display: 'inline-block',
                      marginRight: '10px',
                      marginLeft: '19px',
                    }}
                  />
                  <p className={styles.colorName}>{good.color.name}</p>
                </div>
              </div>
            </div>
            <p className={styles.countProducts}>{good.count} шт</p>
            <p className={styles.price}>{good.price},00 грн</p>
          </div>
        ))}
      </div>
      <div className={styles.userInfo}>
        <ul className={styles.userInfoDeliveryItems}>
          <LiItemUserInfo
            label="Способ оплаты:"
            labelUa="Спосіб оплати:"
            value={
              selectedItem.payment === 'card' ? 'картой' : 'наложним платежом'
            }
            valueUa={
              selectedItem.payment === 'card' ? 'картой' : 'накладеним платежем'
            }
          />
          {selectedItem.delivery_post_office && (
            <LiItemUserInfo
              label="Служба доставки:"
              labelUa="Служба доставки:"
              value="Новая Почта"
              valueUa="Нова Пошта"
            />
          )}
          <LiItemUserInfo
            label="Способ доставки:"
            labelUa="Спосіб доставки:"
            value={selectedItem.delivery}
          />
        </ul>
        <div className={styles.userInfoDetails}>
          <p className={styles.userInfoDetailsText}>
            {`${selectedItem.user_name} ${selectedItem.user_surname} ${selectedItem.user_patronymic}`}
          </p>
          <p className={styles.userInfoDetailsText}>
            {selectedItem.user_phone}
          </p>
          {selectedItem.delivery_city && (
            <p className={styles.userInfoDetailsText}>
              {`${selectedItem.delivery_city}, ${selectedItem.delivery_post_office}`}
            </p>
          )}
          <p className={styles.userInfoDetailsText}>
            {selectedItem.user_email}
          </p>
          {selectedItem.invoice_number && (
            <div className={styles.userInfoDetailsNumbers}>
              <p className={styles.userInfoDetailsNumberText}>Номер ТТН:</p>
              <p className={styles.userInfoDetailsNumberId}>
                {selectedItem.invoice_number}
              </p>
            </div>
          )}
        </div>
        <ul className={styles.userInfoPrices}>
          <LiItemPrices
            label="Сумма за товар"
            labelUa="Сума за товар"
            value={`${selectedItem.total_goods_sum || 0} грн`}
            valueUa={`${selectedItem.total_goods_sum || 0} грн`}
          />
          <LiItemPrices
            label="Скидка"
            labelUa="Знижка"
            value={`${selectedItem.discount || 0} грн`}
            valueUa={`${selectedItem.discount || 0} грн`}
          />
          <LiItemPrices
            label="Оплачено бонусами"
            labelUa="Оплачено бонусами"
            value={`${selectedItem.use_bonuses || 0},00 грн`}
            valueUa={`${selectedItem.use_bonuses || 0},00 грн`}
          />
          <LiItemPrices
            label="Сумма заказа"
            labelUa="Сума замовлення"
            value={`${selectedItem.total_amount || 0},00 грн`}
            valueUa={`${selectedItem.total_amount || 0},00 грн`}
          />
          <LiItemPrices
            label="Доставка"
            labelUa="Доставка"
            value={`${selectedItem.delivery_cost},00 грн `}
            valueUa={`${selectedItem.delivery_cost},00 грн `}
          />
          <hr className={styles.line} />
          <li className={styles.userInfoPricesItemTotal}>
            <p className={styles.userInfoPricesItemTotalText}>
              {parseText(cookies, 'Итого', 'Разом')}
            </p>
            <p className={styles.userInfoPricesPrice}>
              {selectedItem.total_amount},00 грн
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Check;
