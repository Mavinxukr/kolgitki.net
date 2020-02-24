import React, { useState } from 'react';
import styles from './ProfileOrderHeader.scss';

const ProfileOrderHeader = ({ orders, children, isIdWithArrow }) => (
  <div className={styles.profileOrder}>
    <h3>Заказы</h3>
    <ul className={styles.items} uk-accordion="multiple: true">
      {orders.map(item => (
        <li className={styles.item} key={item.id}>
          <input
            className={styles.field}
            type="checkbox"
            id={`item${item.id}`}
          />
          <div className={styles.itemMainInfo}>
            <a className={styles.itemLinkId} href="/">
              {item.idOrder}
            </a>
            <p className={styles.itemDate}>
              {item.date} <span className={styles.itemTime}>{item.time}</span>
            </p>
            <p className={styles.itemEvent}>
              {item.event}{' '}
              <span className={styles.itemEventPrice}>{item.eventPrice}</span>
            </p>
            {item.done ? (
              <p className={styles.itemDone}>Выполнен</p>
            ) : (
              <p className={styles.itemCanseled}>Отменен</p>
            )}
          </div>
          <label
            className={`${styles.itemController} uk-accordion-title`}
            htmlFor={`item${item.id}`}
          >
            Дополнительно
          </label>
          <div className={`${styles.itemAddInfo} uk-accordion-content`}>
            {children}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ProfileOrderHeader;
