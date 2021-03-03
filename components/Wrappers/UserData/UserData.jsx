import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import Loader from '../../Loader/Loader';
import ChangePasswordForm from '../../ChangePasswordForm/ChangePasswordForm';
import styles from './UserData.scss';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import { isAuthSelector, userDataSelector } from '../../../utils/selectors';

const UserData = ({ changeEditValue, children, isEditWorkMates }) => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  if (!isAuth) {
    return <Loader isSmallPage />;
  }
  console.log('userData', userData);
  return (
    <div className={styles.profileData}>
      <h3 className={styles.profileDataTitle}>
        {parseText(cookies, 'Мои данные', 'Мої дані')}
      </h3>
      <div className={styles.userInfo}>
        <ul className={styles.userInfoList}>
          <li className={styles.userInfoTextOne}>
            <p>
              {parseText(cookies, 'ФИО', 'ПІБ')}
            </p>
            <p className={styles.userInfoDetails}>{userData.snp}</p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>
              {parseText(cookies, 'Номер телефона', 'Номер телефону')}
            </p>
            <p className={styles.userInfoDetails}>
              {userData.phone || parseText(cookies, 'укажите телефон', 'Вкажіть телефон')}
            </p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>
              {parseText(cookies, 'Дата рождения', 'Дата народження')}
            </p>
            <p className={styles.userInfoDetails}>
              {userData.date_birth || parseText(cookies, 'укажите дату рождения', 'вкажіть дату народження')}
            </p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>
              {parseText(cookies, 'Почта', 'Пошта')}
            </p>
            <p className={styles.userInfoDetails}>{userData.email || parseText(cookies, 'укажите почту', 'вкажіть пошту')}</p>
          </li>
          <li className={styles.userInfoTextOne}>
            <p>
              {parseText(cookies, 'Адрес доставки', 'Адреса доставки')}
            </p>
            <p className={styles.userInfoDetails}>
              {
                (`
                ${userData?.city},
                ${userData?.department_post},
                ${userData?.address}`)
                || parseText(cookies, 'укажите адресс доставки', 'Вкажіть адресу доставки')}
            </p>
          </li>
        </ul>
        <button
          className={styles.buttonEdit}
          onClick={() => changeEditValue(true)}
          type="button"
        >
          {parseText(cookies, 'Редактировать', 'Редагувати')}
        </button>
      </div>
      <hr className={styles.line} />
      {children || null}
      <div className={styles.changePasswordFormWrapper}>
        <h3 className={cx(styles.profileDataTitle, {
          [styles.profileDataTitleEdit]: isEditWorkMates,
        })}
        >
          Пароль
        </h3>
        <ChangePasswordForm viewTypeButton="auth" isEditWorkMates={isEditWorkMates} />
      </div>
    </div>
  );
};

UserData.propTypes = {
  changeEditValue: PropTypes.func,
  children: PropTypes.node,
  isEditWorkMates: PropTypes.bool,
};

export default UserData;
