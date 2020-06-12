import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ProfileOrderHeader from '../../../ProfileOrderHeader/ProfileOrderHeader';
import Loader from '../../../Loader/Loader';
import {
  ordersDataSelector,
  isDataReceivedForOrders,
} from '../../../../utils/selectors';
import { getOrdersData } from '../../../../redux/actions/order';
import styles from './OrdersWholesale.scss';

const findSimilarItem = (id, arr) => arr.find(item => item === id);

const OrdersWholesale = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const orders = useSelector(ordersDataSelector);
  const isDataReceived = useSelector(isDataReceivedForOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData({}));
  }, []);

  if (!isDataReceived) {
    return <Loader isSmallPage />;
  }

  return (
    <div className={styles.profileOrder}>
      <h3 className={styles.title}>Заказы</h3>
      <ul className={styles.accordionWrapper} uk-accordion="multiple: true">
        {orders.map((item) => {
          const classNameForButtonShow = cx(styles.controllerPhoto, {
            [styles.buttonChecked]: findSimilarItem(item.id, selectedItems),
          });

          return (
            <ProfileOrderHeader
              key={item.id}
              isToggled={false}
              item={item}
            >
              <div className={styles.header}>
                <Link
                  href={{
                    pathname: '/check',
                    query: {
                      orderId: item.id,
                    },
                  }}
                  prefetch={false}
                >
                  <a className={styles.buttonPrint}>
                    Распечатать документ по заказу
                  </a>
                </Link>
                <button
                  onClick={() => {
                    const id = findSimilarItem(item.id, selectedItems);
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
                  item.goods.map((good, index) => {
                    const classNameForDetails = cx(styles.details, {
                      [styles.detailsActive]: findSimilarItem(item.id, selectedItems),
                    });

                    const itemGood = good.good || good.present;

                    return (
                      <li className={styles.item} key={index}>
                        <div className={styles.mainInfo}>
                          {findSimilarItem(item.id, selectedItems) && (
                            <img
                              src={itemGood.img_link}
                              alt="name"
                              className={styles.image}
                            />
                          )}
                          <div>
                            <a className={styles.model} href="/">
                              {itemGood.name}
                            </a>
                            <p className={styles.series}>{itemGood.vendor_code}</p>
                          </div>
                          <div className={classNameForDetails}>
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
                        <div className={styles.addInfo}>
                          <p className={styles.countProducts}>{good.count} шт</p>
                          <p className={styles.price}>{good.price} ₴</p>
                          <p className={styles.price}>{good.total} ₴</p>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
              <div className={styles.totalInfoWrapper}>
                <div className={styles.totalInfo}>
                  <p className={styles.totalInfoText}>Итого:</p>
                  <p className={styles.totalInfoPrice}>{item.total_amount} ₴</p>
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
