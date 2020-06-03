import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cx from 'classnames';
import IconInstagram from '../../../public/svg/instagram.svg';
import IconFacebook from '../../../public/svg/Path109.svg';
import IconTwitter from '../../../public/svg/Path162.svg';
import Input from '../../Input/Input';
import Button from '../Button/Button';
import { getAllCategories } from '../../../services/home';
import { sendMailing } from '../../../services/footer';
import { emailValidation } from '../../../utils/validation';
import { withResponse } from '../../hoc/withResponse';
import Accordion from '../../Accordion/Accordion';
import { createCleanUrl, setFiltersInCookies } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import {
  itemsAbout,
  itemsCustomers,
  itemsWholesaleCustomers,
} from '../../../utils/fakeFetch/footerMenu';
import styles from './Footer.scss';

const MenuItem = ({
  arrItems, isCategoriesItem, cookie, router,
}) => (
  <ul className={styles.menuItems}>
    {arrItems
      && arrItems.map((item, index) => (
        <>
          {isCategoriesItem && index === 0 && (
            <>
              <li key={item.id}>
                <Link href="/Brands" passHref prefetch={false}>
                  <a className={styles.menuText}>Бренды</a>
                </Link>
              </li>
              <li key={item.id}>
                <Link href="/gift-backets" passHref prefetch={false}>
                  <a className={styles.menuText}>Подарочные наборы</a>
                </Link>
              </li>
            </>
          )}
          <li key={item.id}>
            <Link
              href={isCategoriesItem && '/Products' || item.href}
              as={isCategoriesItem && `/Products_${createCleanUrl(cookie).join('_')}` || item.href}
              passHref
              prefetch={false}
            >
              <a
                href="/"
                className={styles.menuText}
                onClick={(e) => {
                  e.preventDefault();
                  if (isCategoriesItem) {
                    setFiltersInCookies(cookie, {
                      categories: [
                        {
                          id: item.id,
                          name: item.slug,
                          categoryName: item.name,
                        },
                      ],
                    });
                  }
                }}
              >
                {item.name}
              </a>
            </Link>
          </li>
        </>
      ))}
  </ul>
);

const Footer = ({ classNameWrapper, isDesktopScreen }) => {
  const [categories, setCategories] = useState(null);
  const [isSuccessMailing, setIsSuccessMailing] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const router = useRouter();

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  return (
    <footer className={cx(styles.footer, classNameWrapper)}>
      <hr className={styles.line} />
      <div className={styles.container}>
        {(isDesktopScreen && (
          <>
            <div className={styles.itemOne}>
              <nav>
                <h6 className={styles.menuTitle}>Покупателям</h6>
                <MenuItem
                  cookie={cookies}
                  arrItems={itemsCustomers}
                  router={router}
                />
              </nav>
              <nav className={styles.childNav}>
                <h6
                  className={`${styles.menuTitle} ${styles.menuTitleLastTitle}`}
                >
                  Оптовым покупателям
                </h6>
                <MenuItem
                  cookie={cookies}
                  arrItems={itemsWholesaleCustomers}
                  router={router}
                />
              </nav>
            </div>
            <nav className={styles.itemTwo}>
              <h6 className={styles.menuTitle}>О нас</h6>
              <MenuItem cookie={cookies} arrItems={itemsAbout} router={router} />
            </nav>
            <nav className={styles.itemThree}>
              <h6 className={styles.menuTitle}>Категории</h6>
              <MenuItem
                cookie={cookies}
                isCategoriesItem
                arrItems={categories}
                router={router}
              />
              <Link href="/Products" prefetch={false}>
                <a className={styles.menuLink}>Смотреть все</a>
              </Link>
            </nav>
          </>
        )) || (
          <ul className={styles.accordion} uk-accordion="multiple: true">
            <Accordion title="Покупателям" isFooterNav>
              <MenuItem
                cookie={cookies}
                arrItems={itemsCustomers}
                router={router}
              />
            </Accordion>
            <Accordion title="О нас" isFooterNav>
              <MenuItem
                cookie={cookies}
                arrItems={itemsAbout}
                router={router}
              />
            </Accordion>
            <Accordion title="Категории" isFooterNav>
              <MenuItem
                isCategoriesItem
                cookie={cookies}
                arrItems={categories}
                router={router}
              />
            </Accordion>
            <Accordion title="Оптовым покупателям" isFooterNav>
              <MenuItem
                cookie={cookies}
                arrItems={itemsWholesaleCustomers}
                router={router}
              />
            </Accordion>
          </ul>
        )}
        <form className={styles.form}>
          <div className={styles.formChildrenWrapper}>
            <h5 className={styles.titleStocks}>
              Хотите получать чаще акционные предложения?
            </h5>
            <div className={styles.controlsWrapper}>
              <Input
                addInputProps={{
                  value,
                  onChange: e => setValue(e.target.value),
                }}
                placeholder="Ваш E-mail"
                type="email"
                classNameWrapper={styles.inputWrapper}
                viewType="footerInput"
              />
              {(isSuccessMailing && <p>Вы подписаны успешно</p>)
                || (error.length > 0 && <p>{error}</p>)
                || (!!emailValidation(value) && value.length > 0 && (
                  <p>{emailValidation(value)}</p>
                ))}
              <div className={styles.buttonWrapper}>
                <Button
                  buttonType="button"
                  title="Подписаться"
                  viewType="footerButton"
                  classNameWrapper={styles.footerButton}
                  disabled={!!emailValidation(value)}
                  onClick={() => {
                    sendMailing({}, { email: value }).then((response) => {
                      if (response.status) {
                        setIsSuccessMailing(true);
                        setValue('');
                      } else {
                        setError(
                          'не удалось оформить подписку, видимо пользователь с таким email уже подписался',
                        );
                      }
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.formIcons}>
            <a className={styles.formIcon} href="/">
              <IconFacebook className={styles.iconFacebook} />
            </a>
            <a className={styles.formIcon} href="/">
              <IconInstagram />
            </a>
            <a className={styles.formIcon} href="/">
              <IconTwitter />
            </a>
          </div>
          <Link href="/info/term-of-use" prefetch={false}>
            <a className={styles.formLink}>Пользовательское соглашение</a>
          </Link>
        </form>
      </div>
    </footer>
  );
};

MenuItem.propTypes = {
  arrItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      href: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  isCategoriesItem: PropTypes.bool,
  cookie: PropTypes.object,
  router: PropTypes.object,
};

Footer.propTypes = {
  classNameWrapper: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Footer);
