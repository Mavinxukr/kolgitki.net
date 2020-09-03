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
  favouritesDataSelector,
} from '../../../utils/selectors';
import { getProductsData } from '../../../redux/actions/products';
import { getFavourites } from '../../../redux/actions/favourite';
import { getCartData, deleteFromCart } from '../../../redux/actions/cart';
import { logoutCurrentUser } from '../../../redux/actions/currentUser';
import {
  calculateTotalSum,
  getArrOptionsCities,
  setFiltersInCookies,
  createCleanUrl,
  parseText,
} from '../../../utils/helpers';
import { getAllCategories } from '../../../services/home';
import SelectCustom from '../../Select/Select';
import HeaderSubNav from '../../HeaderSubNav/HeaderSubNav';
import Search from '../../Search/Search';
import Login from '../../Wrappers/Login/Login';
import { cookies } from '../../../utils/getCookies';
import { withResponse } from '../../hoc/withResponse';
import withPopup from '../../hoc/withPopup';
import styles from './Header.scss';
import IconLocation from '../../../public/svg/location.svg';
import IconSearch from '../../../public/svg/search.svg';
import IconSearchMobile from '../../../public/svg/search2.svg';
import IconLike from '../../../public/svg/like.svg';
import IconUser from '../../../public/svg/user.svg';
import IconCart from '../../../public/svg/cart.svg';
import IconLogout from '../../../public/svg/logout.svg';
import IconBurger from '../../../public/svg/ddd.svg';
import IconExit from '../../../public/svg/Group795.svg';

const arrAddCategories = [
  {
    id: 500,
    name: 'Новинки',
    name_ua: 'Новинки',
    slug: 'novinki',
  },
  {
    id: 501,
    name: 'Sale',
    name_ua: 'Sale',
    slug: 'sale',
  },
  {
    id: 502,
    name: 'Подарочные наборы',
    name_ua: 'Подарункові набори',
    slug: 'gift-backets',
  },
];

const deleteFromCartForNOtAuthUser = (selectItem) => {
  const newItem = selectItem.good || selectItem.present;
  const key = selectItem.present ? 'arrOfIdPresent' : 'arrOfIdProduct';
  const arrOfIdProduct = JSON.parse(localStorage.getItem(key));
  const newArr = arrOfIdProduct.filter(
    item => (item.good_id !== newItem.id && item.present_id !== newItem.id)
      || item.color_id !== selectItem.color.id
      || item.size_id !== selectItem.size.id,
  );
  localStorage.setItem(key, JSON.stringify(newArr));
};

const getSelectedCategories = (categoryValue, categories) => categories.find(item => item.slug === categoryValue);

const definitePage = (item, cookie, router) => {
  switch (item.slug) {
    case 'novinki':
      setFiltersInCookies(cookie, { sort_date: 'desc' });
      router.push('/Products', `/Products/${createCleanUrl(cookie).join('/')}`);
      break;
    case 'gift-backets':
      router.push('/gift-backets');
      break;
    case 'sale':
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: 1,
            name: 'akcii',
            categoryName: parseText(cookie, 'Акции', 'Акції'),
          },
        ],
      });
      router.push('/stock');
      break;
    default:
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: item.id,
            name: item.slug,
            categoryName: parseText(cookie, item.name, item.name_ua),
          },
        ],
      });
      router.push('/Products', `/Products/${createCleanUrl(cookie).join('/')}`);
  }
};

const Header = ({
  setIsSearchActive,
  isSearchActive,
  isMediumDesktopScreen,
  isMobileScreen,
  isOpenMenu,
  setIsOpenMenu,
  isDesktopScreen,
  openPopup,
}) => {
  const [isLocationBlockOpen, setIsLocationBlockOpen] = useState(false);
  const [locationCity, setLocationCity] = useState('Киев');
  const [categories, setCategories] = useState([]);

  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);
  const products = useSelector(productsSelector);
  const cartData = useSelector(cartDataSelector);
  const favoritesData = useSelector(favouritesDataSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  const getLocationTemplate = () => {
    const paramsLocation = cookies.get('location_city') || locationCity;
    return (
      paramsLocation
      && isLocationBlockOpen && (
        <div className={styles.locationBlock}>
          <div className={styles.locationView}>
            <h6>
              {parseText(cookies, 'Это нужный город?', 'Це потрібне місто?')}
            </h6>
            <SelectCustom
              viewType="headerSelect"
              promiseOptions={value => getArrOptionsCities(value)}
              placeholder={paramsLocation}
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
                    cookies.set('location_city', locationCity);
                  }
                  setIsLocationBlockOpen(false);
                }}
                className={styles.locationButton}
              >
                {parseText(cookies, 'Да, верно', 'Так, вірно')}
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
      dispatch(getFavourites({}));
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
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  useEffect(() => {
    if (isOpenMenu) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'initial';
    }
  }, [isOpenMenu]);

  if (cookies.get('token') === undefined) {
    setInterval(() => {
      const buttons = document.querySelectorAll(
        '.ProductCard_buttonAddToFavourite',
      );
      if (buttons[0]) {
        buttons.forEach((userItem) => {
          userItem.addEventListener('click', () => {
            openPopup({
              PopupContentComponent: Login,
            });
          });
        });
      }
    }, 1000);
  }

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
              {[...categories, ...arrAddCategories].map(item => (
                <li key={item.id} className={styles.menuMobileItem}>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      definitePage(item, cookies, router);
                      if (router.pathname.indexOf('/Products') !== -1) {
                        setIsOpenMenu(false);
                      }
                    }}
                    className={styles.menuMobileLink}
                  >
                    {parseText(cookies, item.name, item.name_ua)}
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
                {[...categories, ...arrAddCategories].map((item) => {
                  const subNav = getSelectedCategories(item.slug, categories);

                  return (
                    <li key={item.id} className={styles.navItemWrapper}>
                      <HeaderSubNav
                        classNameWrapper={styles.menuWrapper}
                        subNav={subNav}
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
                          {parseText(cookies, item.name, item.name_ua)}
                        </a>
                      </div>
                    </li>
                  );
                })}
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
              {(isDesktopScreen && (
                <IconSearch className={cx('search-initiator', styles.icon)} />
              )) || (
                <IconSearchMobile
                  className={cx('search-initiator', styles.icon)}
                />
              )}
            </button>
            {userData?.role?.id !== 3 && (
              <div className={styles.favouriteBlock}>
                <button
                  type="button"
                  className={styles.iconLink}
                  onClick={() => {
                    const url =
                      (userData?.role?.id === 3 && '/')
                      || (userData?.role?.id === 2 && '/Profile/favourites');
                    if (isAuth) {
                      router.push(url);
                    } else {
                      openPopup({
                        PopupContentComponent: Login,
                      });
                    }
                  }}
                >
                  <IconLike className={styles.icon} />
                  {isAuth && favoritesData.length > 0 && (
                    <span className={styles.countCartMobile}>
                      {favoritesData.length}
                    </span>
                  )}
                </button>
                {favoritesData.length === 0 && (
                  <div className={styles.favouritesHelp}>
                    <h4>
                      {parseText(
                        cookies,
                        'У вас нет избранных товаров',
                        'У вас немає обраних товарів',
                      )}
                    </h4>
                    <p>
                      {parseText(
                        cookies,
                        'Добавляйте товары в избранное, делитесь ими и обсуждайте с друзьями',
                        'Додавайте товари в обране, діліться ними і обговорюйте з друзями',
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
            <button
              className={styles.iconLink}
              type="button"
              onClick={() => {
                const url =
                  (userData?.role?.id === 3 && '/ProfileWholesale/data')
                  || '/Profile/data';
                if (isAuth) {
                  router.push(url);
                } else {
                  openPopup({
                    PopupContentComponent: Login,
                  });
                }
              }}
            >
              <IconUser className={styles.icon} />
            </button>
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
                    {calculateTotalSum(cartData, products) > 0 && (
                      <span className={styles.countCartMobile}>
                        {(products && products.length) || cartData.length}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
              <div className={styles.cartViewWrapper}>
                <div className={styles.cartView}>
                  {calculateTotalSum(cartData, products) > 0 ? (
                    <>
                      <ul className={styles.productsList}>
                        {getArrOfProducts().map((item) => {
                          const newItem = item.good || item.present;

                          return (
                            <li key={item.id} className={styles.productsItem}>
                              <button
                                type="button"
                                className={styles.deleteProduct}
                                onClick={() => {
                                  if (isAuth) {
                                    dispatch(
                                      deleteFromCart({
                                        params: {},
                                        body: {
                                          cart_id: item.id,
                                        },
                                      }),
                                    );
                                  } else {
                                    deleteFromCartForNOtAuthUser(item);
                                    dispatch(
                                      getProductsData(
                                        {},
                                        {
                                          goods:
                                            localStorage.getItem(
                                              'arrOfIdProduct',
                                            ) || '[]',
                                          presents:
                                            localStorage.getItem(
                                              'arrOfIdPresent',
                                            ) || '[]',
                                        },
                                      ),
                                    );
                                  }
                                }}
                              >
                                <IconExit />
                              </button>
                              <div className={styles.imageCartWrapper}>
                                <Link href="/cart" prefetch={false} passHref>
                                  <img
                                    className={styles.imageCart}
                                    src={newItem.img_link}
                                    alt={newItem.img_link}
                                  />
                                </Link>
                              </div>
                              <div className={styles.cartItemInfo}>
                                <Link href="/cart" prefetch={false} passHref>
                                  <h6>
                                    {parseText(
                                      cookies,
                                      newItem.name,
                                      newItem.name_uk,
                                    )}
                                  </h6>
                                </Link>
                                <div className={styles.cartItemAddInfo}>
                                  <p className={styles.cartItemPrice}>
                                    {/* <p */}
                                    {/*  className={cx(styles.colorBock, { */}
                                    {/*    [styles.withBorder]: */}
                                    {/*      item.color.name === 'White', */}
                                    {/*  })} */}
                                    {/*  style={{ */}
                                    {/*    background: item.color.hex */}
                                    {/*      ? `${item.color.hex}` */}
                                    {/*      : `url(${item.color.img_link})`, */}
                                    {/*  }} */}
                                    {/* /> */}
                                    <p className={styles.cartItemSize}>
                                      {' '}
                                      {parseText(
                                        cookies,
                                        'Размер',
                                        'Розмір',
                                      )}:{' '}
                                      <span
                                        className={styles.cartItemSizeValue}
                                      >
                                        {item.size.size}
                                      </span>
                                    </p>
                                  </p>
                                  <p className={styles.cartItemColorName}>
                                    {parseText(cookies, 'Цвет', 'Колір')}:{' '}
                                    {item.color.name}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div className={styles.cartTotalSum}>
                        <span>{parseText(cookies, 'Итого', 'Разом')}:</span>
                        <span>{calculateTotalSum(cartData, products)} грн</span>
                      </div>
                    </>
                  ) : (
                    <p className={styles.cartNoProducts}>
                      {parseText(
                        cookies,
                        'Ваша корзина пока пуста',
                        'Ваш кошик порожній',
                      )}
                    </p>
                  )}
                  {calculateTotalSum(cartData, products) > 0 ? (
                    <Link href="/cart" prefetch={false}>
                      <Button
                        href
                        title="Оформить заказ"
                        titleUa="Оформити замовлення"
                        viewType="black"
                        classNameWrapper={styles.buttonLink}
                      />
                    </Link>
                  ) : (
                    <Link href="/stock" prefetch={false}>
                      <Button
                        href
                        title="Посмотреть акции"
                        titleUa="Переглянути акції"
                        viewType="black"
                        classNameWrapper={styles.buttonLink}
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {isAuth && (
              <button
                type="button"
                onClick={() => dispatch(logoutCurrentUser({}, cookies))}
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
  isDesktopScreen: PropTypes.bool,
  openPopup: PropTypes.func,
};

export default withPopup(withResponse(Header));
