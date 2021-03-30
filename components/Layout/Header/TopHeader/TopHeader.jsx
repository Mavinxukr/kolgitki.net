import React from 'react';
import IconPhone from '../../../../public/svg/call-answer.svg';
import cx from 'classnames';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import styles from './TopHeader.scss';
import Link from 'next/link';
import { User } from './User/User';
import { Favorites } from './Favorites/Favorites';
import { CartHeader } from './CartHeader/CartHeader';
import { userDataSelector } from '../../../../utils/selectors';
import { useSelector } from 'react-redux';
import { Language } from './Language/Language';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';

export const TopHeader = ({ openPopup }) => {
  const userData = useSelector(userDataSelector);
  return (
    <div id={styles.topHeader} className={styles.topHeader}>
      <div className={styles.container}>
        <div className={styles.topHeader_wrapper}>
          <div className={styles.topHeader_info}>
            <div className={styles.topHeader_logo}>
              <HeaderLogo />
            </div>
            <div className={styles.topHeader_phone}>
              <IconPhone className={cx(styles.icon, styles.icon_phone)} />
              <a
                href="tel:+38044495523359"
                className={styles.topHeader_phone_link}
              >
                (044) 495 523 395
              </a>
            </div>
            <div className={styles.topHeader_forBuyer}>
              <button className={styles.topHeader_forBuyer_button}>
                {parseText(cookies, 'Покупателям', 'Покупцям')}
              </button>
              <ul className={cx(styles.topHeader_forBuyer_list, styles.list)}>
                <li className={cx(styles.topHeader_forBuyer_item, styles.item)}>
                  <Link href={'/info/advantages'}>
                    <a>{parseText(cookies, 'Приемущества', 'Переваги')}</a>
                  </Link>
                </li>
                <li className={cx(styles.topHeader_forBuyer_item, styles.item)}>
                  <Link href={'/info/delivery'}>
                    <a>
                      {parseText(cookies, 'Доставка/Оплата', 'Доставка/Оплата')}
                    </a>
                  </Link>
                </li>
                <li className={cx(styles.topHeader_forBuyer_item, styles.item)}>
                  <Link href={'/info/recovery'}>
                    <a>
                      {parseText(cookies, 'Возврат/Обмен', 'Повернення/Обмін')}
                    </a>
                  </Link>
                </li>
                <li className={cx(styles.topHeader_forBuyer_item, styles.item)}>
                  <Link href={'/info/questions'}>
                    <a>
                      {parseText(
                        cookies,
                        'Вопросы и ответы',
                        'Питання та відповіді'
                      )}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.topHeader_icons}>
            <User openPopup={openPopup} />
            {userData && userData.role?.id !== 3 && (
              <Favorites openPopup={openPopup} />
            )}
            <CartHeader />
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};
