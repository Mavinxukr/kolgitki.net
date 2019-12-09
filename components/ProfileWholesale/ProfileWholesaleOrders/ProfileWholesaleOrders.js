import React from 'react';
import { data } from './data';
import Styles from './ProfileWholesaleOrders.module.scss';
import ProfileWholesaleOrderAddInfo from '../ProfileWholesaleOrderAddInfo/ProfileWholesaleOrderAddInfo';

const ProfileWholesaleOrders = () => (
  <div className={Styles.ProfileWholesaleOrders}>
    <h2 className={Styles.ProfileWholesaleOrders__Title}>Заказы</h2>
    <ul className={Styles.ProfileWholesaleOrders__Items}>
      {
        data.map(item => (
          <div key={item.id}>
            <input className={Styles.ProfileWholesaleOrders__Field} type="checkbox" id={`${item.id}`} />
            <li className={Styles.ProfileWholesaleOrders__Item} key={item.id}>
              <div className={Styles.ProfileWholesaleOrders__ItemMainInfo}>
                <a className={Styles.ProfileWholesaleOrders__ItemLinkId} href="/">{item.idOrder}</a>
                <p className={Styles.ProfileWholesaleOrders__ItemDate}>{item.date} <span className={Styles.ProfileWholesaleOrders__ItemTime}>{item.time}</span></p>
                <p className={Styles.ProfileWholesaleOrders__ItemEvent}>{item.event} <span className={Styles.ProfileWholesaleOrders__ItemEventPrice}>{item.eventPrice}</span></p>
                {
                  item.done ? <p className={Styles.ProfileWholesaleOrders__ItemDone}>Выполнен</p> : <p className={Styles.ProfileWholesaleOrders__ItemCanseled}>Отменен</p>
                }
                <label className={Styles.ProfileWholesaleOrders__ItemController} htmlFor={`${item.id}`}>Дополнительно</label>
              </div>
              <div className={Styles.ProfileWholesaleOrders__AddInfo}>
                <ProfileWholesaleOrderAddInfo id={item.id} />
              </div>
            </li>
          </div>
        ))
      }
    </ul>
  </div>
);

export default ProfileWholesaleOrders;
