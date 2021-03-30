import React from 'react';
import Link from 'next/link';
import IconFavorites from '../../../../../public/svg/like.svg';
import styles from './Favorites.scss';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Login from '../../../../Wrappers/Login/Login';

import {
  favouritesDataSelector,
  isAuthSelector,
  userDataSelector
} from '../../../../../utils/selectors';
import { parseText } from '../../../../../utils/helpers';
import { cookies } from '../../../../../utils/getCookies';

export const Favorites = ({ openPopup }) => {
  const favoritesData = useSelector(favouritesDataSelector);
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);
  const router = useRouter();

  const clickHandle = () => {
    const url =
      (userData?.role?.id === 3 && '/') ||
      (userData?.role?.id === 2 && '/Profile/favourites');
    if (isAuth) {
      router.push(url);
    } else {
      openPopup({
        PopupContentComponent: Login
      });
    }
  };
  return (
    <div className={styles.favorites}>
      <IconFavorites
        onClick={() => clickHandle()}
        className={styles.icon}
      ></IconFavorites>
      {favoritesData.length > 0 && (
        <span className={styles.favorites_count}>{favoritesData.length}</span>
      )}

      {favoritesData.length === 0 && (
        <div className={styles.favorites_help}>
          <h4>
            {parseText(
              cookies,
              'У вас нет избранных товаров',
              'У вас немає обраних товарів'
            )}
          </h4>
          <p>
            {parseText(
              cookies,
              'Добавляйте товары в избранное, делитесь ими и обсуждайте с друзьями',
              'Додавайте товари в обране, діліться ними і обговорюйте з друзями'
            )}
          </p>
        </div>
      )}
    </div>
  );
};
