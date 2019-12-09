import React from 'react';
import Styles from './ProfileWholesaleData.module.scss';

const ProfileWholesaleData = ({ changeEditValue }) => (
  <div className={Styles.ProfileWholesaleData}>
    <h2 className={Styles.ProfileWholesaleData__Title}>Мои данные</h2>
    <div className={Styles.ProfileWholesaleData__UserInfo}>
      <ul className={Styles.ProfileWholesaleData__UserInfoFirstGroup}>
        <li className={Styles.ProfileWholesaleData__UserInfoTextOne}>ФИО</li>
        <li className={Styles.ProfileWholesaleData__UserInfoTextOne}>Номер телефона</li>
        <li className={Styles.ProfileWholesaleData__UserInfoTextOne}>Почта</li>
        <li className={Styles.ProfileWholesaleData__UserInfoTextOne}>Адрес доставки</li>
      </ul>
      <ul className={Styles.ProfileWholesaleData__UserInfoSecondGroup}>
        <li className={Styles.ProfileWholesaleData__UserInfoTextTwo}>Тунчинко Игорь Николаевич</li>
        <li className={Styles.ProfileWholesaleData__UserInfoTextTwo}>+380 (097) 790 90 21</li>
        <li className={Styles.ProfileWholesaleData__UserInfoTextTwo}>ihor@gmail.com</li>
        <li className={Styles.ProfileWholesaleData__UserInfoTextTwo}>Отделение №18 Николаевская 17/23Б</li>
      </ul>
    </div>
    <button className={Styles.ProfileWholesaleData__ButtonEdit} onClick={() => changeEditValue(true)} type="button">Редактировать</button>
    <hr className={Styles.ProfileWholesaleData__Line} />
    <div className={Styles.ProfileWholesaleData__DataGroup}>
      <h2 className={Styles.ProfileWholesaleData__Title}>Сотрудники</h2>
      <div className={Styles.ProfileWholesaleData__WorkMatesBLock}>
        <p className={Styles.ProfileWholesaleData__WorkMatesName}>Наталия Ингина</p>
        <p className={Styles.ProfileWholesaleData__WorkMatesEmail}>ni@netkolgotok.com</p>
        <button type="button" className={Styles.ProfileWholesaleData__WorkMatesButton}>Добавить сотрудника</button>
      </div>
    </div>
    <hr className={Styles.ProfileWholesaleData__Line} />
    <div className={Styles.ProfileWholesaleData__DataGroup}>
      <h2 className={Styles.ProfileWholesaleData__Title}>Пароль</h2>
      <form className={Styles.ProfileWholesaleData__Form}>
        <input autoComplete="current-password" className={Styles.ProfileWholesaleData__FormField} type="password" placeholder="Старый пароль" />
        <input autoComplete="new-password" className={Styles.ProfileWholesaleData__FormField} type="password" placeholder="Новый пароль" />
        <input autoComplete="new-password" className={Styles.ProfileWholesaleData__FormField} type="password" placeholder="Повторите новый пароль" />
        <button className={Styles.ProfileWholesaleData__FormButton} type="submit">Обновить пароль</button>
      </form>
    </div>
  </div>
);

export default ProfileWholesaleData;
