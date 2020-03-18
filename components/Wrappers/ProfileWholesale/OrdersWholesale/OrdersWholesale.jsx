import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ProfileOrderHeader from '../../../ProfileOrderHeader/ProfileOrderHeader';
import { checkHaveIndex } from '../../../../utils/helpers';
import Loader from '../../../Loader/Loader';
import {
  ordersDataSelector,
  isDataReceivedForOrders,
} from '../../../../utils/selectors';
import { getOrdersData } from '../../../../redux/actions/order';
import styles from './OrdersWholesale.scss';

const OrdersWholesale = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const orders = useSelector(ordersDataSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);

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
        {orders.map((item) => {
          const classNameForButtonShow = cx(styles.controllerPhoto, {
            [styles.buttonChecked]: checkHaveIndex(item.id, selectedItems),
          });

          return (
            <ProfileOrderHeader
              key={item.id}
              isToggled={false}
              item={item}
            >
              <div className={styles.header}>
                <Link href={{
                  pathname: '/check',
                  query: {
                    orderId: item.id,
                  },
                }}
                >
                  <a className={styles.buttonPrint}>
                    Распечатать документ по заказу
                  </a>
                </Link>
                <button
                  onClick={() => {
                    const id = checkHaveIndex(item.id, selectedItems);
                    if (id) {
                      setSelectedItems(
                        selectedItems.filter(index => index !== id),
                      );
                    } else {
                      setSelectedItems([...selectedItems, item.id]);
                    }
                  }}
                  className={classNameForButtonShow}
                  type="button"
                >
                  Показать с фото
                </button>
              </div>
              <ul className={styles.list}>
                {
                  item.goods.map((good, index) => (
                    <li className={styles.item} key={index}>
                      <div className={styles.mainInfo}>
                        {checkHaveIndex(item.id, selectedItems) && (
                          <img
                            src={good.good.img_link}
                            alt="name"
                            className={styles.image}
                          />
                        )}
                        <div>
                          <a className={styles.model} href="/">
                            {good.good.name}
                          </a>
                          <p className={styles.series}>{good.good.vendor_code}</p>
                        </div>
                        <div className={styles.details}>
                          <p className={styles.size}>Размер: {good.size.size}</p>
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
                      <p className={styles.countProducts}>{good.count} шт</p>
                      <p className={styles.price}>{good.price},00 ₴</p>
                      <p className={styles.price}>{good.count * good.price},00 ₴</p>
                    </li>
                  ))
                }
              </ul>
              <div className={styles.totalInfoWrapper}>
                <div className={styles.totalInfo}>
                  <p className={styles.totalInfoText}>Итого:</p>
                  <p className={styles.totalInfoPrice}>{item.total_amount},00 ₴</p>
                </div>
              </div>
            </ProfileOrderHeader>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersWholesale;
