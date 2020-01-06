import React from 'react';
import styles from './ProfileWholesaleData.scss';

const ProfileWholesaleData = ({ changeEditValue }) => (
  <div className={styles.ProfileWholesaleData}>
    <h2 className={styles.ProfileWholesaleData__Title}>Мои данные</h2>
    <div className={styles.ProfileWholesaleData__UserInfo}>
      <ul className={styles.ProfileWholesaleData__UserInfoFirstGroup}>
        <li className={styles.ProfileWholesaleData__UserInfoTextOne}>ФИО</li>
        <li className={styles.ProfileWholesaleData__UserInfoTextOne}>Номер телефона</li>
        <li className={styles.ProfileWholesaleData__UserInfoTextOne}>Почта</li>
        <li className={styles.ProfileWholesaleData__UserInfoTextOne}>Адрес доставки</li>
      </ul>
      <ul className={styles.ProfileWholesaleData__UserInfoSecondGroup}>
        <li className={styles.ProfileWholesaleData__UserInfoTextTwo}>Тунчинко Игорь Николаевич</li>
        <li className={styles.ProfileWholesaleData__UserInfoTextTwo}>+380 (097) 790 90 21</li>
        <li className={styles.ProfileWholesaleData__UserInfoTextTwo}>ihor@gmail.com</li>
        <li className={styles.ProfileWholesaleData__UserInfoTextTwo}>Отделение №18 Николаевская 17/23Б</li>
      </ul>
    </div>
    <button className={styles.ProfileWholesaleData__ButtonEdit} onClick={() => changeEditValue(true)} type="button">Редактировать</button>
    <hr className={styles.ProfileWholesaleData__Line} />
    <div className={styles.ProfileWholesaleData__DataGroup}>
      <h2 className={styles.ProfileWholesaleData__Title}>Сотрудники</h2>
      <div className={styles.ProfileWholesaleData__WorkMatesBLock}>
        <p className={styles.ProfileWholesaleData__WorkMatesName}>Наталия Ингина</p>
        <p className={styles.ProfileWholesaleData__WorkMatesEmail}>ni@netkolgotok.com</p>
        <button type="button" className={styles.ProfileWholesaleData__WorkMatesButton}>Добавить сотрудника</button>
      </div>
    </div>
    <hr className={styles.ProfileWholesaleData__Line} />
    <div className={styles.ProfileWholesaleData__DataGroup}>
      <h2 className={styles.ProfileWholesaleData__Title}>Пароль</h2>
      <form className={styles.ProfileWholesaleData__Form}>
        <input autoComplete="current-password" className={styles.ProfileWholesaleData__FormField} type="password" placeholder="Старый пароль" />
        <input autoComplete="new-password" className={styles.ProfileWholesaleData__FormField} type="password" placeholder="Новый пароль" />
        <input autoComplete="new-password" className={styles.ProfileWholesaleData__FormField} type="password" placeholder="Повторите новый пароль" />
        <button className={styles.ProfileWholesaleData__FormButton} type="submit">Обновить пароль</button>
      </form>
    </div>
  </div>
);

export default ProfileWholesaleData;
