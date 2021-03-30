import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isAuthSelector } from '../../../utils/selectors';
import { getProductsData } from '../../../redux/actions/products';
import { getFavourites } from '../../../redux/actions/favourite';
import { getCartData, deleteFromCart } from '../../../redux/actions/cart';
import { withResponse } from '../../hoc/withResponse';
import withPopup from '../../hoc/withPopup';
import styles from './Header.scss';
import { TopHeader } from './TopHeader/TopHeader';
import { BottomHeader } from './BottomHeader/BottomHeader';
import { cookies } from '../../../utils/getCookies';

const Header = ({
  isMediumDesktopScreen,
  isOpenMenu,
  setIsOpenMenu,
  openPopup
}) => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
      dispatch(getFavourites({}));
    }
    if (
      (!isAuth && localStorage.getItem('arrOfIdProduct')) ||
      (!isAuth && localStorage.getItem('arrOfIdPresent'))
    ) {
      dispatch(
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct') || '[]',
            presents: localStorage.getItem('arrOfIdPresent') || '[]'
          }
        )
      );
    }
  }, [isAuth]);

  useEffect(() => {
    if (isOpenMenu) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'initial';
    }
  }, [isOpenMenu]);
  if (!cookies.get('language')) {
    cookies.set('language', { id: 1, lang: 'ru', title: 'Русский' });
  }

  return (
    <>
      <header id={styles.header}>
        <TopHeader openPopup={openPopup}></TopHeader>
        <BottomHeader
          openPopup={openPopup}
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
          isMediumDesktopScreen={isMediumDesktopScreen}
        ></BottomHeader>
      </header>
    </>
  );
};

Header.propTypes = {
  isMediumDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  setIsOpenMenu: PropTypes.func,
  isOpenMenu: PropTypes.bool,
  openPopup: PropTypes.func
};

export default withPopup(withResponse(Header));
