import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  ordersDataSelector,
  isDataReceivedForOrders,
} from '../../../../utils/selectors';
import { getOrdersData } from '../../../../redux/actions/order';
import ProfileOrderHeader from '../../../ProfileOrderHeader/ProfileOrderHeader';
import Loader from '../../../Loader/Loader';
import styles from './Orders.scss';

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

  const router = useRouter();

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
            isToggled={Number(router.query.idOrder) === item.id}
            item={item}
          >
            <div className={styles.chooseProductsCards}>
              {item.goods.map((good, index) => (
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
                          <span className={styles.sizeValue}>
                            {good.size.size}
                          </span>
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
                  value={
                    item.payment === 'card' ? 'картой' : 'наложним платежом'
                  }
                />
                {item.delivery_post_office && (
                  <LiItemUserInfo
                    label="Служба доставки:"
                    value="Новая Почта"
                  />
                )}
                <LiItemUserInfo
                  label="Способ доставки:"
                  value={item.delivery}
                />
              </ul>
              <div className={styles.userInfoDetails}>
                <p className={styles.userInfoDetailsText}>
                  {`${item.user_name} ${item.user_surname} ${item.user_patronymic}`}
                </p>
                <p className={styles.userInfoDetailsText}>{item.user_phone}</p>
                {item.delivery_address && (
                  <p className={styles.userInfoDetailsText}>
                    {item.delivery_address}
                  </p>
                )}
                <p className={styles.userInfoDetailsText}>{item.user_email}</p>
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
                  value={`${item.total_goods_sum || 0},00 ₴`}
                />
                <LiItemPrices
                  label="Скидка"
                  value={`${item.discount || 0},00 ₴`}
                />
                <LiItemPrices
                  label="Оплачено бонусами"
                  value={`${item.use_bonuses || 0},00 ₴`}
                />
                <LiItemPrices
                  label="Сумма заказа"
                  value={`${item.total_amount || 0},00 ₴`}
                />
                <LiItemPrices
                  label="Доставка"
                  value={`${item.delivery_cost},00 ₴ `}
                />
                <hr className={styles.line} />
                <li className={styles.userInfoPricesItemTotal}>
                  <p className={styles.userInfoPricesItemTotalText}>Итого</p>
                  <p className={styles.userInfoPricesPrice}>
                    {item.total_amount},00 ₴
                  </p>
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
