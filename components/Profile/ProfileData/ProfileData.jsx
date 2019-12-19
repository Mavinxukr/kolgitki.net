import React from 'react';
import styles from './ProfileData.scss';

const ProfileData = ({ changeEditValue }) => (
  <div className={styles.profileData}>
    <h2 className={styles.title}>Мои данные</h2>
    <div className={styles.userInfo}>
      <ul className={styles.userInfoFirstGroup}>
        <li className={styles.userInfoTextOne}>ФИО</li>
        <li className={styles.userInfoTextOne}>Номер телефона</li>
        <li className={styles.userInfoTextOne}>Дата рождения</li>
        <li className={styles.userInfoTextOne}>Почта</li>
        <li className={styles.userInfoTextOne}>Адрес доставки</li>
      </ul>
      <ul className={styles.userInfoSecondGroup}>
        <li className={styles.userInfoTextTwo}>Тунчинко Игорь Николаевич</li>
        <li className={styles.userInfoTextTwo}>+380 (097) 790 90 21</li>
        <li className={styles.userInfoTextTwo}>14.05.1990</li>
        <li className={styles.userInfoTextTwo}>ihor@gmail.com</li>
        <li className={styles.userInfoTextTwo}>
          Отделение №18 Николаевская 17/23Б
        </li>
      </ul>
    </div>
    <button
      className={styles.buttonEdit}
      onClick={() => changeEditValue(true)}
      type="button"
    >
      Редактировать
    </button>
    <hr className={styles.line} />
    <h2 className={styles.title}>Пароль</h2>
    <form className={styles.form}>
      <input
        autoComplete="current-password"
        className={styles.formField}
        type="password"
        placeholder="Старый пароль"
      />
      <input
        autoComplete="new-password"
        className={styles.formField}
        type="password"
        placeholder="Новый пароль"
      />
      <input
        autoComplete="new-password"
        className={styles.formField}
        type="password"
        placeholder="Повторите новый пароль"
      />
      <button className={styles.formButton} type="submit">
        Обновить пароль
      </button>
    </form>
  </div>
);

export default ProfileData;
