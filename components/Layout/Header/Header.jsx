import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cx from 'classnames';
import uniqid from 'uniqid';
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
  setFiltersInCookies,
  createCleanUrl,
  parseText,
} from '../../../utils/helpers';
import { getAllCategories } from '../../../services/home';
import HeaderSubNav from '../../HeaderSubNav/HeaderSubNav';
import Search from '../../Search/Search';
import Login from '../../Wrappers/Login/Login';
import { cookies } from '../../../utils/getCookies';
import { withResponse } from '../../hoc/withResponse';
import withPopup from '../../hoc/withPopup';
import styles from './Header.scss';
import IconSearch from '../../../public/svg/search.svg';
import IconSearchMobile from '../../../public/svg/search2.svg';
import IconLike from '../../../public/svg/like.svg';
import IconUser from '../../../public/svg/user.svg';
import IconCart from '../../../public/svg/cart.svg';
import IconLogout from '../../../public/svg/logout.svg';
import IconBurger from '../../../public/svg/ddd.svg';
import IconExit from '../../../public/svg/Group795.svg';
import IconPhone from '../../../public/svg/call-answer.svg';
import { arrOfNavItems } from '../../../utils/fakeFetch/dataForNavItemsProfile';
import Accordion from '../../Accordion/Accordion';
import {
  itemsAbout,
  itemsCustomers,
  itemsWholesaleCustomers,
} from '../../../utils/fakeFetch/footerMenu';
import IconFacebook from '../../../public/svg/Path109.svg';
import IconInstagram from '../../../public/svg/instagram.svg';
import IconTwitter from '../../../public/svg/Path162.svg';

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
  {
    id: 503,
    name: 'Новости',
    name_ua: 'Новини',
    slug: 'Blog',
  },
];

if (!cookies.get('language')) {
  cookies.set('language', { id: 1, lang: 'ru', title: 'Русский' });
}

const MenuItem = ({ arrItems, isCategoriesItem, cookie }) => (
  <ul className={styles.menuItems}>
    {arrItems
      && arrItems.map((item, index) => (
        <>
          {isCategoriesItem && index === 0 && (
            <>
              <li key={uniqid()}>
                <Link href="/Brands" passHref prefetch={false}>
                  <a className={styles.menuText}>
                    {parseText(cookie, 'Бренды', 'Бренди')}.headerWrapper
                  </a>
                </Link>
              </li>
              <li key={uniqid()}>
                <Link href="/gift-backets" passHref prefetch={false}>
                  <a className={styles.menuText}>
                    {parseText(
                      cookie,
                      'Подарочные наборы',
                      'Подарункові набори',
                    )}
                  </a>
                </Link>
              </li>
            </>
          )}
          <li key={item.id}>
            <Link
              href={(isCategoriesItem && '/Products') || item.href}
              as={
                (isCategoriesItem
                  && `/Products/${createCleanUrl(cookie).join('/')}`)
                || item.href
              }
              passHref
              prefetch={false}
            >
              <a
                className={styles.menuText}
                onClick={() => {
                  if (isCategoriesItem) {
                    setFiltersInCookies(cookie, {
                      categories: [
                        {
                          id: item.id,
                          name: item.slug,
                          categoryName: parseText(
                            cookie,
                            item.name,
                            item.name_ua,
                          ),
                        },
                      ],
                    });
                  }
                }}
              >
                {parseText(cookie, item.name, item.name_ua)}
              </a>
            </Link>
          </li>
        </>
      ))}
  </ul>
);

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
    case 'Blog':
      router.push('/Blog');
      break;
    case 'novinki':
      if (cookies.get('filters')) {
        console.log('test');
        cookies.remove('filters');
        console.log('test2');
      }
      setFiltersInCookies(cookie, { sort_date: 'desc' });
      router.push('/Products', `/Products/${createCleanUrl(cookie).join('/')}`);
      break;
    case 'gift-backets':
      if (cookies.get('filters')) {
        cookies.remove('filters');
      }
      router.push('/gift-backets');
      break;
    case 'sale':
      if (cookies.get('filters')) {
        console.log('test');
        cookies.remove('filters');
        console.log('test2');
      }
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: 1,
            name: 'akcii',
            categoryName: parseText(cookie, 'Акции', 'Акції'),
          },
        ],
      });
      if (cookies.get('filters')) {
        cookies.remove('filters');
      }
      router.push('/stock');
      break;
    default:
      setFiltersInCookies(cookie, {
        categories: [
          ...(cookies.get('filters').categories.splice(0, 0) || []),
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
  isMediumDesktopScreen,
  isMobileScreen,
  isOpenMenu,
  setIsOpenMenu,
  openPopup,
}) => {
  const [categories, setCategories] = useState([]);
  const [hover, isHover] = useState(true);

  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);
  const products = useSelector(productsSelector);
  const cartData = useSelector(cartDataSelector);
  const favoritesData = useSelector(favouritesDataSelector);

  const dispatch = useDispatch();

  const router = useRouter();

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
      <div className={styles.headerWrapper}>
        {isOpenMenu && <div className={styles.bgMenu} />}
        {!isMediumDesktopScreen && (
          <div
            className={cx(styles.mobileMenu, {
              [styles.menuMobileActive]: isOpenMenu,
            })}
          >
            <button type="button" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              {isOpenMenu ? (
                <IconExit className={styles.iconExit} />
              ) : (
                <IconBurger />
              )}
            </button>
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
            <ul className={styles.accordion} uk-accordion="multiple: true">
              <Accordion
                title="Покупателям"
                titleUk="Покупцям"
                isFooterNav
                isNotActiveScroll
              >
                <MenuItem cookie={cookies} arrItems={itemsCustomers} />
              </Accordion>
              <Accordion
                title="О нас"
                titleUk="Про нас"
                isFooterNav
                isNotActiveScroll
              >
                <MenuItem cookie={cookies} arrItems={itemsAbout} />
              </Accordion>
              <Accordion
                title="Оптовым покупателям"
                titleUk="Оптовим покупцям"
                isFooterNav
                isNotActiveScroll
              >
                <MenuItem cookie={cookies} arrItems={itemsWholesaleCustomers} />
              </Accordion>
            </ul>
            <a href="tel:044 495 523 395">
              <IconPhone style={{ marginRight: '10px' }} />
              044 495 523 395
            </a>
            <div className={styles.flex}>
              <a
                className={styles.formIcon}
                href="https://facebook.com/kolgot.net/"
              >
                <IconFacebook className={styles.iconFacebook} />
              </a>
              <a
                className={styles.formIcon}
                href="https://www.instagram.com/mavinxbids/"
              >
                <IconInstagram />
              </a>
              <a className={styles.formIcon} href="/">
                <IconTwitter />
              </a>
            </div>
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
                      {hover && (
                        <ul
                          className={styles.bgOpacity}
                          onMouseOver={() => isHover(!hover)}
                        />
                      )}
                      <HeaderSubNav
                        classNameWrapper={styles.menuWrapper}
                        subNav={subNav}
                        router={router}
                      />
                      <ul className={styles.navItem}>
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            definitePage(item, cookies, router);
                          }}
                          onMouseOver={() => {
                            isHover(true);
                            if (cookies.get('filters')) {
                              cookies.remove('filters');
                            }
                            setFiltersInCookies(cookies, {
                              categories: [
                                {
                                  id: item.id,
                                  name: item.slug,
                                  categoryName: parseText(
                                    cookies,
                                    item.name,
                                    item.name_ua,
                                  ),
                                },
                              ],
                            });
                          }}
                          className={styles.navLink}
                        >
                          {parseText(cookies, item.name, item.name_ua)}
                        </a>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <div className={styles.icons}>
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
            <div className={styles.relative}>
              <button
                className={cx(styles.iconLink, {
                  [styles.activProfile]: isAuth,
                })}
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
              {isAuth ? (
                <div className={styles.navProfile}>
                  <nav className={styles.nav}>
                    {arrOfNavItems.map((item) => {
                      const changeClassName = cx(styles.switcher, {
                        [styles.active]:
                          router.route.split('/')[2] === item.routeValue,
                      });

                      const navRouter =
                        item.routeValue === 'Blog'
                          ? '/Blog'
                          : `/Profile/${item.routeValue}`;

                      return (
                        <Link href={navRouter} key={item.id} prefetch={false}>
                          <a className={changeClassName}>
                            <span className={styles.text}>
                              {parseText(cookies, item.title, item.titleUa)}
                            </span>
                          </a>
                        </Link>
                      );
                    })}
                    <button
                      className={styles.buttonExit}
                      type="button"
                      onClick={() => dispatch(logoutCurrentUser({}, cookies))}
                    >
                      {parseText(cookies, 'Выйти', 'Вийти')}
                    </button>
                  </nav>
                </div>
              ) : (
                <div />
              )}
            </div>
            <div
              className={cx(
                styles.cartCounterWrapper,
                styles.iconLink,
                styles.noMargin,
              )}
            >
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
                                    <span>{item.color.name}</span>
                                  </p>
                                  <p className={styles.cartItemSize}>
                                    <span className={styles.cartItemSizeValue}>
                                      {item.total} грн
                                    </span>
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
            <button
              type="button"
              className={cx(styles.iconLink, styles.lang, {
                [styles.active]: cookies.get('language').lang === 'ru',
              })}
              onClick={() => {
                cookies.set('language', {
                  id: 1,
                  lang: 'ru',
                  title: 'Русский',
                });
                router.reload();
              }}
            >
              RU
            </button>
            <button
              type="button"
              className={cx(styles.iconLink, styles.lang, {
                [styles.active]: cookies.get('language').lang === 'ua',
              })}
              onClick={() => {
                cookies.set('language', {
                  id: 2,
                  lang: 'ua',
                  title: 'Українська',
                });
                router.reload();
              }}
            >
              UA
            </button>
          </div>
          <div className={styles.searchWrapper}>
            <Search />
          </div>
        </header>
      </div>
    </div>
  );
};

Header.propTypes = {
  isMediumDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  setIsOpenMenu: PropTypes.func,
  isOpenMenu: PropTypes.bool,
  openPopup: PropTypes.func,
};

export default withPopup(withResponse(Header));
