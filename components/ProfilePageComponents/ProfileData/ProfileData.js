import React from 'react';
import Styles from './ProfileData.module.scss';

const ProfileData = ({ changeEditValue }) => (
  <div className={Styles.ProfileData}>
    <h2 className={Styles.ProfileData__Title}>Мои данные</h2>
    <div className={Styles.ProfileData__UserInfo}>
      <ul className={Styles.ProfileData__UserInfoFirstGroup}>
        <li className={Styles.ProfileData__UserInfoTextOne}>ФИО</li>
        <li className={Styles.ProfileData__UserInfoTextOne}>Номер телефона</li>
        <li className={Styles.ProfileData__UserInfoTextOne}>Дата рождения</li>
        <li className={Styles.ProfileData__UserInfoTextOne}>Почта</li>
        <li className={Styles.ProfileData__UserInfoTextOne}>Адрес доставки</li>
      </ul>
      <ul className={Styles.ProfileData__UserInfoSecondGroup}>
        <li className={Styles.ProfileData__UserInfoTextTwo}>Тунчинко Игорь Николаевич</li>
        <li className={Styles.ProfileData__UserInfoTextTwo}>+380 (097) 790 90 21</li>
        <li className={Styles.ProfileData__UserInfoTextTwo}>14.05.1990</li>
        <li className={Styles.ProfileData__UserInfoTextTwo}>ihor@gmail.com</li>
        <li className={Styles.ProfileData__UserInfoTextTwo}>Отделение №18 Николаевская 17/23Б</li>
      </ul>
    </div>
    <button className={Styles.ProfileData__ButtonEdit} onClick={() => changeEditValue(true)} type="button">Редактировать</button>
    <hr className={Styles.ProfileData__Line} />
    <h2 className={Styles.ProfileData__Title}>Пароль</h2>
    <form className={Styles.ProfileData__Form}>
      <input className={Styles.ProfileData__FormField} type="password" placeholder="Старый пароль" />
      <input className={Styles.ProfileData__FormField} type="password" placeholder="Новый пароль" />
      <input className={Styles.ProfileData__FormField} type="password" placeholder="Повторите новый пароль" />
      <button className={Styles.ProfileData__FormButton} type="submit">Обновить пароль</button>
    </form>
  </div>
);

export default ProfileData;
