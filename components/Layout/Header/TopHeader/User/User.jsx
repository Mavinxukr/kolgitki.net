import React from 'react';
import Link from 'next/link';

import IconUser from '../../../../../public/svg/user.svg';
import styles from './User.scss';
import { parseText } from '../../../../../utils/helpers';
import { logoutCurrentUser } from '../../../../../redux/actions/currentUser';
import { cookies } from '../../../../../utils/getCookies';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAuthSelector,
  userDataSelector
} from '../../../../../utils/selectors';
import { useRouter } from 'next/router';
import Login from '../../../../Wrappers/Login/Login';

const userMenuList = [
  {
    id: 1,
    name: parseText(cookies, 'Заказы', 'Замовлення'),
    path: '/Profile/orders'
  },
  {
    id: 2,
    name: parseText(cookies, 'Избранные', 'Обрані'),
    path: '/Profile/favourites'
  },
  {
    id: 3,
    name: parseText(cookies, 'Бонусы', 'Бонуси'),
    path: '/Profile/bonuses'
  },
  {
    id: 4,
    name: parseText(cookies, 'Просмотренные', 'Переглянуті'),
    path: '/Profile/seen'
  },
  {
    id: 5,
    name: parseText(cookies, 'Рассылки', 'Розсилка'),
    path: '/Profile/mailing'
  },
  {
    id: 6,
    name: parseText(cookies, 'Мои данные', 'Мої дані'),
    path: '/Profile/data'
  }
];
const wholesalerMenuList = [
  {
    id: 1,
    name: parseText(cookies, 'Заказы', 'Замовлення'),
    path: '/ProfileWholesale/orders'
  },
  {
    id: 2,
    name: parseText(cookies, 'Документы', 'Документи'),
    path: '/ProfileWholesale/docs'
  },
  {
    id: 3,
    name: parseText(cookies, 'Загрузить документы', 'Завантажити Документи'),
    path: '/ProfileWholesale/load-docs'
  },
  {
    id: 4,
    name: parseText(cookies, 'Мои данные', 'Мої данні'),
    path: '/ProfileWholesale/data'
  }
];

export const User = ({ openPopup }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);
  const router = useRouter();

  const clickHandle = () => {
    if (isAuth) {
      userData?.role?.id === 3
        ? router.push('/ProfileWholesale/data')
        : router.push('/Profile/data');
    } else {
      openPopup({
        PopupContentComponent: Login
      });
    }
  };

  return (
    <div className={styles.user}>
      <IconUser
        onClick={() => clickHandle()}
        className={styles.icon}
      ></IconUser>
      {isAuth && (
        <ul className={styles.user_list}>
          {(userData.role.id === 3 ? wholesalerMenuList : userMenuList).map(
            item => (
              <li key={item.id} className={styles.user_item}>
                <Link href={item.path}>
                  <a>{item.name}</a>
                </Link>
              </li>
            )
          )}
          <li className={styles.user_item}>
            <button
              onClick={() => dispatch(logoutCurrentUser({}, cookies))}
              type="button"
            >
              Вийти
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
