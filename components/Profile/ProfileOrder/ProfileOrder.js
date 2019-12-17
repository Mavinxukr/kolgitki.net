import React from 'react';
import { data } from './data';
import ProfileOrderAddInfo from '../ProfileOrderAddInfo/ProfileOrderAddInfo';
import Styles from './ProfileOrder.module.scss';

const ProfileOrder = () => (
  <div className={Styles.ProfileOrder}>
    <h2 className={Styles.ProfileOrder__Title}>Заказы</h2>
    <ul className={Styles.ProfileOrder__Items}>
      {
        data.map(item => (
          <div key={item.id}>
            <input className={Styles.ProfileOrder__Field} type="checkbox" id={`${item.id}`} />
            <li className={Styles.ProfileOrder__Item} key={item.id}>
              <div className={Styles.ProfileOrder__ItemMainInfo}>
                <a className={Styles.ProfileOrder__ItemLinkId} href="/">{item.idOrder}</a>
                <p className={Styles.ProfileOrder__ItemDate}>{item.date} <span className={Styles.ProfileOrder__ItemTime}>{item.time}</span></p>
                <p className={Styles.ProfileOrder__ItemEvent}>{item.event} <span className={Styles.ProfileOrder__ItemEventPrice}>{item.eventPrice}</span></p>
                {
                  item.done ? <p className={Styles.ProfileOrder__ItemDone}>Выполнен</p> : <p className={Styles.ProfileOrder__ItemCanseled}>Отменен</p>
                }
                <label className={Styles.ProfileOrder__ItemController} htmlFor={`${item.id}`}>Дополнительно</label>
              </div>
              <div className={Styles.ProfileOrder__ItemAddInfo}>
                <ProfileOrderAddInfo />
              </div>
            </li>
          </div>
        ))
      }
    </ul>
  </div>
);

export default ProfileOrder;
