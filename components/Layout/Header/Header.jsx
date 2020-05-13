import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Button from '../Button/Button';
import {
  isAuthSelector,
  userDataSelector,
  productsSelector,
  cartDataSelector,
} from '../../../utils/selectors';
import { getProductsData } from '../../../redux/actions/products';
import { getCartData } from '../../../redux/actions/cart';
import { logoutCurrentUser } from '../../../redux/actions/currentUser';
import {
  calculateTotalSum,
  getArrOptionsCities,
  setFiltersInCookies,
  createCleanUrl,
} from '../../../utils/helpers';
import { getLocation, getAllCategories } from '../../../services/home';
import SelectCustom from '../../Select/Select';
import HeaderSubNav from '../../HeaderSubNav/HeaderSubNav';
import Search from '../../Search/Search';
import { cookies } from '../../../utils/getCookies';
import { withResponse } from '../../hoc/withResponse';
import styles from './Header.scss';
import IconLocation from '../../../public/svg/location.svg';
import IconSearch from '../../../public/svg/search.svg';
import IconLike from '../../../public/svg/like.svg';
import IconUser from '../../../public/svg/user.svg';
import IconCart from '../../../public/svg/cart.svg';
import IconLogout from '../../../public/svg/logout.svg';
import IconBurger from '../../../public/svg/ddd.svg';
import IconExit from '../../../public/svg/Group795.svg';

const arrAddCategories = [
  {
    id: 500,
    name: 'Sale',
    slug: 'sale',
  },
  {
    id: 501,
    name: 'Новинки',
    slug: 'novinki',
  },
];

const getSelectedCategories = (categoryValue, categories) => categories.find(item => item.slug === categoryValue);

const definitePage = (item, cookie, router) => {
  switch (item.slug) {
    case 'novinki':
      setFiltersInCookies(cookie, { sort_date: 'desc' });
      router.push('/Products');
      break;
    case 'sale':
      router.push('/stock');
      break;
    default:
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: item.id,
            name: item.slug,
          },
        ],
      });
      router.push('/Products', `/Products/${createCleanUrl(cookie).join('_')}`);
  }
};

const Header = ({
  setIsSearchActive,
  isSearchActive,
  isMediumDesktopScreen,
  isMobileScreen,
  isOpenMenu,
  setIsOpenMenu,
}) => {
  const [isLocationBlockOpen, setIsLocationBlockOpen] = useState(false);
  const [locationCity, setLocationCity] = useState(null);
  const [categories, setCategories] = useState([]);

  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);
  const products = useSelector(productsSelector);
  const cartData = useSelector(cartDataSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  const getLocationTemplate = () => {
    const paramsLocation = locationCity || cookies.get('location_city');
    return (
      paramsLocation
      && isLocationBlockOpen && (
        <div className={styles.locationBlock}>
          <div className={styles.locationView}>
            <h6>Это нужный город?</h6>
            <SelectCustom
              viewType="headerSelect"
              promiseOptions={value => getArrOptionsCities(value)}
              placeholder={cookies.get('location_city') || locationCity}
              classNameWrapper={styles.locationSelect}
              onChangeCustom={(value) => {
                setLocationCity(value.label);
              }}
            />
            <div className={styles.locationButtonWrapper}>
              <button
                type="button"
                onClick={() => {
                  if (cookies.get('location_city')) {
                    cookies.remove('location_city');
                  }
                  if (locationCity) {
                    cookies.set('location_city', locationCity, {
                      maxAge: 60 * 60 * 24,
                    });
                  }
                  setIsLocationBlockOpen(false);
                }}
                className={styles.locationButton}
              >
                Да, верно
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
    }
    if (
      (!isAuth && localStorage.getItem('arrOfIdProduct'))
      || (!isAuth && localStorage.getItem('arrOfIdPresent'))
    ) {
      dispatch(
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct') || '[]',
            presents: localStorage.getItem('arrOfIdPresent') || '[]',
          },
        ),
      );
    }
  }, [isAuth]);

  useEffect(() => {
    if (!cookies.get('location_city')) {
      getLocation().then((response) => {
        setLocationCity(response.geoplugin_city);
      });
      setTimeout(() => setIsLocationBlockOpen(true), 2000);
    }
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  const getArrOfProducts = () => (isAuth ? cartData : products);

  return (
    <div className={styles.headerMainWrapper}>
      <div className={styles.searchWrapper}>
        <Search
          setIsSearchActive={setIsSearchActive}
          isSearchActive={isSearchActive}
        />
      </div>
      <div className={styles.headerWrapper}>
        {!isMediumDesktopScreen && (
          <div
            className={cx(styles.mobileMenu, {
              [styles.menuMobileActive]: isOpenMenu,
            })}
          >
            <ul className={styles.menuMobileItems}>
              {[...arrAddCategories, ...categories].map(item => (
                <li key={item.id} className={styles.menuMobileItem}>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      definitePage(item, cookies, router);
                    }}
                    className={styles.menuMobileLink}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <header className={styles.header}>
          <div className={styles.menuMobileWrapper}>
            {!isMediumDesktopScreen && (
              <button type="button" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                {isOpenMenu ? (
                  <IconExit className={styles.iconExit} />
                ) : (
                  <IconBurger />
                )}
              </button>
            )}
            <Link href="/" prefetch={false} passHref>
              <a>
                <img
                  src="/images/logo_cut.png"
                  className={cx(styles.logo, {
                    [styles.logoMobile]: !isMediumDesktopScreen,
                  })}
                  alt="logo"
                />
              </a>
            </Link>
          </div>
          {isMediumDesktopScreen && (
            <nav className={styles.nav}>
              <ul className={styles.navItems}>
                {[...arrAddCategories, ...categories].map(item => (
                  <li key={item.id} className={styles.navItemWrapper}>
                    <HeaderSubNav
                      classNameWrapper={styles.menuWrapper}
                      subNav={getSelectedCategories(item.slug, categories)}
                      router={router}
                    />
                    <div className={styles.navItem}>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          definitePage(item, cookies, router);
                        }}
                        className={styles.navLink}
                      >
                        {item.name}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className={styles.icons}>
            {isMediumDesktopScreen && (
              <div
                onMouseOver={() => setIsLocationBlockOpen(true)}
                onFocus={() => setIsLocationBlockOpen(true)}
                onMouseLeave={() => setIsLocationBlockOpen(false)}
                className={cx(styles.locationWrapper, styles.iconLink)}
              >
                <p>
                  <IconLocation className={styles.icon} />
                </p>
                {getLocationTemplate()}
              </div>
            )}
            <button
              type="button"
              className={styles.iconLink}
              onClick={() => setIsSearchActive(!isSearchActive)}
            >
              <IconSearch className={styles.icon} />
            </button>
            <Link
              href={
                (isAuth && userData.role.id === 3 && '/')
                || (isAuth && userData.role.id === 2 && '/Profile/favourites')
                || '/login'
              }
            >
              <a href="/" className={styles.iconLink}>
                <IconLike className={styles.icon} />
              </a>
            </Link>
            {isMediumDesktopScreen && (
              <Link
                href={
                  (isAuth
                    && userData.role.id === 3
                    && '/ProfileWholesale/data')
                  || (isAuth && userData.role.id === 2 && '/Profile/data')
                  || '/login'
                }
                passHref
              >
                <a className={styles.iconLink}>
                  <IconUser className={styles.icon} />
                </a>
              </Link>
            )}
            <div className={cx(styles.cartCounterWrapper, styles.iconLink)}>
              <div className={styles.cartCounter}>
                <Link href="/cart" prefetch={false} passHref>
                  <a className={styles.cartLink}>
                    <IconCart
                      className={cx(styles.icon, {
                        [styles.iconRed]:
                          isMobileScreen
                          && ((products && products.length) || cartData.length),
                      })}
                    />
                    {isMobileScreen
                      && calculateTotalSum(cartData, products) > 0 && (
                        <span className={styles.countCartMobile}>
                          {(products && products.length) || cartData.length}
                        </span>
                    )}
                  </a>
                </Link>
                {isMediumDesktopScreen
                  && calculateTotalSum(cartData, products) > 0 && (
                    <p className={styles.sumProducts}>
                      {calculateTotalSum(cartData, products)} Грн.
                      <span className={styles.countCart}>
                        ({(products && products.length) || cartData.length})
                      </span>
                    </p>
                )}
              </div>
              <div className={styles.cartViewWrapper}>
                <div className={styles.cartView}>
                  {calculateTotalSum(cartData, products) > 0 ? (
                    <>
                      <ul className={styles.productsList}>
                        {getArrOfProducts().map((item) => {
                          const newItem = item.good || item.present;

                          return (
                            <li className={styles.productsItem}>
                              <div className={styles.imageCartWrapper}>
                                <img
                                  className={styles.imageCart}
                                  src={newItem.img_link}
                                  alt={newItem.img_link}
                                />
                              </div>
                              <div className={styles.cartItemInfo}>
                                <h6>{newItem.name}</h6>
                                <div className={styles.cartItemAddInfo}>
                                  <p className={styles.cartItemPrice}>
                                    {
                                      +(
                                        newItem.new_price * item.count
                                        || newItem.price * item.count
                                      ).toFixed(2)
                                    }{' '}
                                    ₴
                                  </p>
                                  <p className={styles.cartItemColorName}>
                                    {newItem.name}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div>{calculateTotalSum(cartData, products)} ₴</div>
                    </>
                  ) : (
                    <p className={styles.cartNoProducts}>товаров пока нет</p>
                  )}
                  <Link href="/about/pick-up-points" prefetch={false}>
                    <Button
                      href
                      title="Показать магазины"
                      viewType="black"
                      classNameWrapper={styles.buttonLink}
                    />
                  </Link>
                </div>
              </div>
            </div>
            {isAuth && (
              <button
                type="button"
                onClick={() => {
                  dispatch(logoutCurrentUser({}, cookies));
                  setTimeout(() => router.push('/'), 800);
                }}
              >
                <IconLogout className={styles.icon} />
              </button>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

Header.propTypes = {
  setIsSearchActive: PropTypes.func,
  isSearchActive: PropTypes.bool,
  isMediumDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  setIsOpenMenu: PropTypes.func,
  isOpenMenu: PropTypes.bool,
};

export default withResponse(Header);
