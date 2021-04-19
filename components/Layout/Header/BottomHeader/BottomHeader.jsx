import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../../utils/selectors';
import IconBurger from '../../../../public/svg/ddd.svg';
import IconExit from '../../../../public/svg/Group795.svg';
import Search from '../../../Search/Search';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { CartHeader } from '../TopHeader/CartHeader/CartHeader';
import { Favorites } from '../TopHeader/Favorites/Favorites';
import { Language } from '../TopHeader/Language/Language';
import { User } from '../TopHeader/User/User';
import styles from './BottomHeader.scss';
import { Menu } from './Menu/Menu';
import { BurgerButton } from '../BurgerButton/BurgerButton';

export const BottomHeader = ({
  openPopup,
  isOpenMenu,
  setIsOpenMenu,
  isMediumDesktopScreen
}) => {
  const userData = useSelector(userDataSelector);

  const openHandle = () => {
    setIsOpenMenu(true);
  };

  return (
    <div id={styles.bottomHeader} className={styles.bottomHeader}>
      <div className={styles.container}>
        <div className={styles.bottomHeader_wrapper}>
          <div className={styles.bottomHeader_mobile}>
            <BurgerButton isOpen={isOpenMenu} setOpening={openHandle} />
          </div>
          <div className={styles.bottomHeader_logo}>
            <HeaderLogo />
          </div>
          <div className={styles.bottomHeader_menu}>
            <Menu
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
              isMediumDesktopScreen={isMediumDesktopScreen}
            />
          </div>
          <div className={styles.bottomHeader_search}>
            <Search />
          </div>
          <div className={styles.bottomHeader_icons}>
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
