import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ordersDataSelector,
  isDataReceivedForOrders,
} from '../../../../utils/selectors';
import { getOrdersData } from '../../../../redux/actions/order';
import ProfileOrderHeader from '../../../ProfileOrderHeader/ProfileOrderHeader';
import Loader from '../../../Loader/Loader';
import styles from './Orders.scss';

const mockData = [
  {
    id: 1,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
  {
    id: 2,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
  {
    id: 3,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
  {
    id: 4,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
];

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

const Orders = () => {
  const orders = useSelector(ordersDataSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);

  console.log(orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <div className={styles.profileOrder}>
      <h3>Заказы</h3>
      <ul className={styles.accordionWrapper} uk-accordion="multiple: true">
        {orders.map(item => (
          <ProfileOrderHeader
            key={item.id}
            isIdWithArrow={false}
            isToggled={false}
            item={item}
          >
            <div className={styles.ChooseProductsCards}>
              {
                item.goods.map(good => (
                  <div key={item.id} className={styles.chooseProduct}>
                    <div className={styles.chooseProductGroup}>
                      <img
                        src={good.img_link}
                        alt="name"
                      />
                      <div className={styles.mainInfo}>
                        <p className={styles.model}>{good.name}</p>
                        <p className={styles.series}>{good.vendor_code}</p>
                        <div className={styles.mainInfoDetails}>
                          <p className={styles.size}>
                            Размер: <span className={styles.sizeValue}>{good.size.size}</span>
                          </p>
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '6px',
                              background: `${item.color.hex}` || `url(${item.color.img_link})`,
                              display: 'inline-block',
                              marginRight: '10px',
                              marginLeft: '19px',
                            }}
                          />
                          <p className={styles.colorName}>{item.color.name}</p>
                        </div>
                      </div>
                    </div>
                    <p className={styles.countProducts}>{good.count} шт</p>
                    <p className={styles.price}>{good.price},00 ₴</p>
                  </div>
                ))
              }
            </div>
            <div className={styles.userInfo}>
              <ul className={styles.userInfoDeliveryItems}>
                <LiItemUserInfo
                  label="Способ оплаты:"
                  value={item.payment === 'card' ? 'картой' : 'наложним платежом'}
                />
                <LiItemUserInfo label="Служба доставки:" value="Новая Почта" />
                <LiItemUserInfo label="Способ доставки:" value="В отделение" />
              </ul>
              <div className={styles.userInfoDetails}>
                <p className={styles.userInfoDetailsText}>
                  Тунчинко Игорь Николаевич
                </p>
                <p className={styles.userInfoDetailsText}>
                  +380 (097) 790 90 21
                </p>
                <p className={styles.userInfoDetailsText}>
                  Отделение №18 Николаевская 17/23Б
                </p>
                <p className={styles.userInfoDetailsText}>ihor@gmail.com</p>
                <div className={styles.userInfoDetailsNumbers}>
                  <p className={styles.userInfoDetailsNumberText}>Номер ТТН:</p>
                  <p className={styles.userInfoDetailsNumberId}>007560530543</p>
                </div>
              </div>
              <ul className={styles.userInfoPrices}>
                <LiItemPrices label="Сумма за товар" value="405,00 ₴" />
                <LiItemPrices label="Скидка" value="45,00 ₴" />
                <LiItemPrices label="Оплачено бонусами" value="00,00 ₴" />
                <LiItemPrices label="Сумма заказа" value="540,00 ₴" />
                <LiItemPrices label="Доставка" value="84,00 ₴" />
                <hr className={styles.line} />
                <li className={styles.userInfoPricesItemTotal}>
                  <p className={styles.userInfoPricesItemTotalText}>Итого</p>
                  <p className={styles.userInfoPricesPrice}>560,00 ₴</p>
                </li>
              </ul>
            </div>
          </ProfileOrderHeader>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
