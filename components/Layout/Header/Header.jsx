import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
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
import { calculateTotalSum } from '../../../utils/helpers';
import styles from './Header.scss';
import IconLocation from '../../../public/svg/location.svg';
import IconSearch from '../../../public/svg/search.svg';
import IconLike from '../../../public/svg/like.svg';
import IconUser from '../../../public/svg/user.svg';
import IconCart from '../../../public/svg/cart.svg';
import IconLogout from '../../../public/svg/logout.svg';

const getLocation = async () => {
  const responseIp = await fetch('https://ipinfo.io/widget', {
    headers: {
      Cookie: '_ga=GA1.2.1465328369.1584721213; _gid=GA1.2.2125147020.1584721213',
    },
  });
  // const ipData = await responseIp.json();
  return responseIp;
  // const responseLocation = await fetch(
  //   `http://www.geoplugin.net/json.gp?ip=${ipData.ip}&lang=ru`,
  // );
  // const locationData = await responseLocation.json();
  // return locationData.geoplugin_city;
};

const Header = () => {
  const [locationCity, setLocationCity] = useState(null);

  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);
  const products = useSelector(productsSelector);
  const cartData = useSelector(cartDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
    }
    if (isAuth && localStorage.getItem('arrOfIdProduct')) {
      dispatch(
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct'),
          },
        ),
      );
    }
    // setLocationCity(getLocation());
    console.log(getLocation());
  }, []);

  const getArrOfProducts = () => (isAuth ? cartData : products);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a href="">
          <img src="/images/logo_cut.png" className={styles.logo} alt="logo" />
        </a>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/sale">
              <a className={styles.navLink}>Sale</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Новинки
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Женщинам
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Мужчинам
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Детям
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.icons}>
        <a href="/" className={styles.iconLink}>
          <IconLocation className={styles.icon} />
          {locationCity && (
            <div>
              <div>
                <h6>{locationCity}</h6>
              </div>
            </div>
          )}
        </a>
        <a href="/" className={styles.iconLink}>
          <IconSearch className={styles.icon} />
        </a>
        <a href="/" className={styles.iconLink}>
          <IconLike className={styles.icon} />
        </a>
        <Link
          href={
            (isAuth && userData.role.id === 3 && '/ProfileWholesale/data')
            || (isAuth && userData.role.id === 2 && '/Profile/data')
            || '/login'
          }
        >
          <a className={styles.iconLink}>
            <IconUser className={styles.icon} />
          </a>
        </Link>
        <Link href="/cart">
          <a className={cx(styles.iconLink, styles.iconLinkCart)}>
            <IconCart className={styles.icon} />
            {calculateTotalSum(cartData, products) > 0 && (
              <p className={styles.sumProducts}>
                {calculateTotalSum(cartData, products)} Грн.
                <span className={styles.countCart}>
                  {`(${products.length + cartData.length})`}
                </span>
              </p>
            )}
            <div className={styles.cartViewWrapper}>
              <div className={styles.cartView}>
                <ul className={styles.productsList}>
                  {getArrOfProducts().map((item, index) => {
                    const count =
                      item.count
                      || JSON.parse(
                        localStorage.getItem('arrOfIdProduct')[index].count,
                      );

                    return (
                      <li className={styles.productsItem}>
                        <div className={styles.imageCartWrapper}>
                          <img
                            className={styles.imageCart}
                            src={item.good.img_link}
                            alt={item.good.img_link}
                          />
                        </div>
                        <div className={styles.cartItemInfo}>
                          <h6>{item.good.name}</h6>
                          <div className={styles.cartItemAddInfo}>
                            <p className={styles.cartItemPrice}>
                              {item.good.price * count} ₴
                            </p>
                            <p className={styles.cartItemColorName}>
                              {item.color.name}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div>{calculateTotalSum(cartData, products)} ₴</div>
                <Link href="/about/pick-up-points">
                  <Button
                    href
                    title="Показать магазины"
                    viewType="black"
                    classNameWrapper={styles.buttonLink}
                  />
                </Link>
              </div>
            </div>
          </a>
        </Link>
        {isAuth && (
          <button
            type="button"
            onClick={() => {
              dispatch(logoutCurrentUser({}));
            }}
          >
            <IconLogout className={styles.icon} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
