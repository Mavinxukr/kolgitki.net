import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Loader from '../../../Loader/Loader';
import ChangePasswordForm from '../../../ChangePasswordForm/ChangePasswordForm';
import styles from './Data.scss';
import { isAuthSelector, userDataSelector } from '../../../../utils/selectors';

const Data = ({ changeEditValue }) => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  if (!isAuth) {
    return <Loader />;
  }

  return (
    <div className={styles.profileData}>
      <h3>Мои данные</h3>
      <div className={styles.userInfo}>
        <ul className={styles.userInfoFirstGroup}>
          <li className={styles.userInfoTextOne}>ФИО</li>
          <li className={styles.userInfoTextOne}>Номер телефона</li>
          <li className={styles.userInfoTextOne}>Дата рождения</li>
          <li className={styles.userInfoTextOne}>Почта</li>
          <li className={styles.userInfoTextOne}>Адрес доставки</li>
        </ul>
        <ul className={styles.userInfoSecondGroup}>
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
      <h6>Пароль</h6>
      <ChangePasswordForm viewTypeButton="auth" />
    </div>
  );
};

Data.propTypes = {
  changeEditValue: PropTypes.func,
};

export default Data;
