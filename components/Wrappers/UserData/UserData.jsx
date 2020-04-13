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
      <h3 className={styles.profileDataTitle}>Мои данные</h3>
      <div className={styles.userInfo}>
        <ul className={styles.userInfoList}>
          <li className={styles.userInfoTextOne}>
            <p>ФИО</p>
            <p className={styles.userInfoDetails}>{userData.snp}</p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>Номер телефона</p>
            <p className={styles.userInfoDetails}>
              {userData.phone || 'укажите телефон'}
            </p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>Дата рождения</p>
            <p className={styles.userInfoDetails}>
              {userData.date_birth || 'укажите дату рождения'}
            </p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>Почта</p>
            <p className={styles.userInfoDetails}>{userData.email}</p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>Адрес доставки</p>
            <p className={styles.userInfoDetails}>
              {userData.address || 'укажите адресс доставки'}
            </p>
          </li>
        </ul>
        <button
          className={styles.buttonEdit}
          onClick={() => changeEditValue(true)}
          type="button"
        >
          Редактировать
        </button>
      </div>
      <hr className={styles.line} />
      {children || null}
      <div className={styles.changePasswordFormWrapper}>
        <h3 className={styles.profileDataTitle}>Пароль</h3>
        <ChangePasswordForm viewTypeButton="auth" />
      </div>
    </div>
  );
};

UserData.propTypes = {
  changeEditValue: PropTypes.func,
  children: PropTypes.node,
};

export default UserData;
