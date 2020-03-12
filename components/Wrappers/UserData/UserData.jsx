import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import ChangePasswordForm from '../../ChangePasswordForm/ChangePasswordForm';
import styles from './UserData.scss';
import { isAuthSelector, userDataSelector } from '../../../utils/selectors';

const UserData = ({ changeEditValue, children }) => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  if (!isAuth) {
    return <Loader />;
  }

  return (
    <div className={styles.profileData}>
      <h3>Мои данные</h3>
      <div className={styles.userInfo}>
        <ul>
          <li className={styles.userInfoTextOne}>ФИО</li>
          <li className={styles.userInfoTextOne}>Номер телефона</li>
          <li className={styles.userInfoTextOne}>Дата рождения</li>
          <li className={styles.userInfoTextOne}>Почта</li>
          <li className={styles.userInfoTextOne}>Адрес доставки</li>
        </ul>
        <ul className={styles.textGroup}>
          <li className={styles.userInfoTextTwo}>{userData.snp}</li>
          <li className={styles.userInfoTextTwo}>
            {userData.phone || 'укажите телефон'}
          </li>
          <li className={styles.userInfoTextTwo}>
            {userData.date_birth || 'укажите дату рождения'}
          </li>
          <li className={styles.userInfoTextTwo}>{userData.email}</li>
          <li className={styles.userInfoTextTwo}>
            {userData.address || 'укажите адресс доставки'}
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
      {children || null}
      <h3>Пароль</h3>
      <ChangePasswordForm viewTypeButton="auth" />
    </div>
  );
};

UserData.propTypes = {
  changeEditValue: PropTypes.func,
  children: PropTypes.node,
};

export default UserData;
