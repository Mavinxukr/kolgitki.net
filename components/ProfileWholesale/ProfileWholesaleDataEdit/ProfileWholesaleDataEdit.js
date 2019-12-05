import React from 'react';
import Styles from './ProfileWholesaleDataEdit.module.scss';

const ProfileWholesaleDataEdit = ({ changeEditValue }) => (
  <div className={Styles.ProfileWholesaleDataEdit}>
    <h2 className={Styles.ProfileWholesaleDataEdit__Title}>Мои данные</h2>
    <div className={Styles.ProfileWholesaleDataEdit__UserInfo}>
      <ul className={Styles.ProfileWholesaleDataEdit__UserInfoFirstGroup}>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextOne}>ФИО</li>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextOne}>Номер телефона</li>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextOne}>Почта</li>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextOne}>Адрес доставки</li>
      </ul>
      <ul className={Styles.ProfileWholesaleDataEdit__UserInfoSecondGroup}>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextTwo}>Тунчинко Игорь Николаевич</li>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextTwo}>+380 (097) 790 90 21</li>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextTwo}>ihor@gmail.com</li>
        <li className={Styles.ProfileWholesaleDataEdit__UserInfoTextTwo}>Отделение №18 Николаевская 17/23Б</li>
      </ul>
    </div>
    <button className={Styles.ProfileWholesaleDataEdit__ButtonEdit} onClick={() => changeEditValue(true)} type="button">Редактировать</button>
    <hr className={Styles.ProfileWholesaleDataEdit__Line} />
    <div className={Styles.ProfileWholesaleDataEdit__DataGroup}>
      <h2 className={Styles.ProfileWholesaleDataEdit__WorkMatesTitle}>Сотрудники</h2>
      <div className={Styles.ProfileWholesaleDataEdit__WorkMatesInfo}>
        <div className={Styles.ProfileWholesaleDataEdit__WorkMatesInfoText}>
          <p className={Styles.ProfileWholesaleDataEdit__WorkMatesName}>Наталия Ингина</p>
          <p className={Styles.ProfileWholesaleDataEdit__WorkMatesEmail}>ni@netkolgotok.com</p>
        </div>
        <button type="button" className={Styles.ProfileWholesaleDataEdit__WorkMatesButtonDelete}>Удалить</button>
      </div>
    </div>
    <div className={Styles.ProfileWholesaleDataEdit__DataGroup}>
      <h2 className={Styles.ProfileWholesaleDataEdit__WorkMatesTitle}>Добавить сотрудника</h2>
      <form className={Styles.ProfileWholesaleDataEdit__WorkMatesForm}>
        <input className={Styles.ProfileWholesaleDataEdit__WorkMatesFormField} type="text" placeholder="ФИО" />
        <input className={Styles.ProfileWholesaleDataEdit__WorkMatesFormField} type="text" placeholder="E-mail" />
        <button className={Styles.ProfileWholesaleDataEdit__WorkMatesFormButton} type="submit">Добавить сотрудника</button>
      </form>
    </div>
    <hr className={Styles.ProfileWholesaleDataEdit__Line} />
    <h2 className={Styles.ProfileWholesaleDataEdit__PasswordTitle}>Пароль</h2>
    <form className={Styles.ProfileWholesaleDataEdit__Form}>
      <input autoComplete="current-password" className={Styles.ProfileWholesaleDataEdit__FormField} type="password" placeholder="Старый пароль" />
      <input autoComplete="new-password" className={Styles.ProfileWholesaleDataEdit__FormField} type="password" placeholder="Новый пароль" />
      <input autoComplete="new-password" className={Styles.ProfileWholesaleDataEdit__FormField} type="password" placeholder="Повторите новый пароль" />
      <button className={Styles.ProfileWholesaleDataEdit__FormButton} type="submit">Обновить пароль</button>
    </form>
  </div>
);

export default ProfileWholesaleDataEdit;
