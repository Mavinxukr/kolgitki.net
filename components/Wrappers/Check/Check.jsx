import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  ordersDataSelector,
  isDataReceivedForOrders,
} from '../../../utils/selectors';
import Loader from '../../Loader/Loader';
import { getOrdersData } from '../../../redux/actions/order';
import styles from './Check.scss';

const LiItemUserInfo = ({ label, value }) => (
  <li className={styles.userInfoDeliveryItem}>
    <p className={styles.userInfoDeliveryTextOne}>{label}</p>
    <p className={styles.userInfoDeliveryTextTwo}>{value}</p>
  </li>
);

const LiItemPrices = ({ label, value }) => (
  <li className={styles.userInfoPricesItem}>
    <p className={styles.userInfoPricesText}>{label}</p>
    <p className={styles.userInfoPricesPrice}>{value}</p>
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
  }, []);

  useEffect(() => {
    if (isDataReceived) {
      setSelectedItem(orders.find(item => item.id === Number(router.query.orderId)));
    }
  }, [isDataReceived]);

  if (!isDataReceived || !selectedItem) {
    return <Loader />;
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Заказ №{selectedItem.id}</h2>
      <div className={styles.chooseProductsCards}>
        {selectedItem.goods.map((good, index) => (
          <div key={index} className={styles.chooseProduct}>
            <div className={styles.chooseProductGroup}>
              <img
                src={good.good.img_link}
                className={styles.orderImage}
                alt="name"
              />
              <div className={styles.mainInfo}>
                <p className={styles.model}>{good.good.name}</p>
                <p className={styles.series}>{good.good.vendor_code}</p>
                <div className={styles.mainInfoDetails}>
                  <p className={styles.size}>
                    Размер:{' '}
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
            <p className={styles.price}>{good.price},00 ₴</p>
          </div>
        ))}
      </div>
      <div className={styles.userInfo}>
        <ul className={styles.userInfoDeliveryItems}>
          <LiItemUserInfo
            label="Способ оплаты:"
            value={selectedItem.payment === 'card' ? 'картой' : 'наложним платежом'}
          />
          {selectedItem.delivery_post_office && (
            <LiItemUserInfo label="Служба доставки:" value="Новая Почта" />
          )}
          <LiItemUserInfo label="Способ доставки:" value={selectedItem.delivery} />
        </ul>
        <div className={styles.userInfoDetails}>
          <p className={styles.userInfoDetailsText}>
            {`${selectedItem.user_name} ${selectedItem.user_surname} ${selectedItem.user_patronymic}`}
          </p>
          <p className={styles.userInfoDetailsText}>{selectedItem.user_phone}</p>
          {selectedItem.delivery_address && (
            <p className={styles.userInfoDetailsText}>
              {selectedItem.delivery_address}
            </p>
          )}
          <p className={styles.userInfoDetailsText}>{selectedItem.user_email}</p>
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
            value={`${selectedItem.total_goods_sum || 0},00 ₴`}
          />
          <LiItemPrices label="Скидка" value={`${selectedItem.discount || 0},00 ₴`} />
          <LiItemPrices
            label="Оплачено бонусами"
            value={`${selectedItem.use_bonuses || 0},00 ₴`}
          />
          <LiItemPrices
            label="Сумма заказа"
            value={`${selectedItem.total_amount || 0},00 ₴`}
          />
          <LiItemPrices
            label="Доставка"
            value={`${selectedItem.delivery_cost},00 ₴ `}
          />
          <hr className={styles.line} />
          <li className={styles.userInfoPricesItemTotal}>
            <p className={styles.userInfoPricesItemTotalText}>Итого</p>
            <p className={styles.userInfoPricesPrice}>
              {selectedItem.total_amount},00 ₴
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Check;
