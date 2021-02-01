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
import {
  createCleanUrl,
  parseText,
  setFiltersInCookies,
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import {
  itemsAbout,
  itemsCustomers,
  itemsWholesaleCustomers,
} from '../../../utils/fakeFetch/footerMenu';
import styles from './Footer.scss';

const arrOptionsLang = [
  { id: 1, lang: 'ru', title: 'Русский' },
  { id: 2, lang: 'ua', title: 'Українська' },
];

const MenuItem = ({ arrItems, isCategoriesItem, cookie }) => {
  const menuRouter = useRouter();

  return (
    <ul className={styles.menuItems}>
      {arrItems
        && arrItems.map((item, index) => (
          <React.Fragment key={`menuItem${item.id}`}>
            {isCategoriesItem && index === 0 && (
              <>
                <>
                  <a
                    className={styles.menuText}
                    onClick={(e) => {
                      e.preventDefault();
                      if (cookies.get('filters')) {
                        cookies.remove('filters');
                      }
                      window.scrollTo(0, 0);
                      menuRouter.push('/Brands');
                    }}
                  >
                    {parseText(cookie, 'Бренды', 'Бренди')}
                  </a>
                </>
                <li>
                  <a
                    className={styles.menuText}
                    onClick={(e) => {
                      e.preventDefault();
                      if (cookies.get('filters')) {
                        cookies.remove('filters');
                      }
                      menuRouter.push('/gift-backets');
                    }}
                  >
                    {parseText(
                      cookie,
                      'Подарочные наборы',
                      'Подарункові набори',
                    )}
                  </a>
                </li>
              </>
            )}
            <li>
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
                  onClick={(e) => {
                    if (isCategoriesItem) {
                      e.preventDefault();
                      cookies.remove('filters');
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
                      window.scrollTo(0, 0);
                      menuRouter.push(
                        '/Products',
                        `/Products/${createCleanUrl(cookie).join('/')}`,
                      );
                    }
                  }}
                >
                  {parseText(cookie, item.name, item.name_ua)}
                </a>
              </Link>
            </li>
          </React.Fragment>
        ))}
    </ul>
  );
};

const Footer = ({ classNameWrapper, isDesktopScreen }) => {
  const [categories, setCategories] = useState(null);
  const [isSuccessMailing, setIsSuccessMailing] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [isOpenLangSelect, setIsOpenLangSelect] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!cookies.get('language')) {
      cookies.set('language', arrOptionsLang[0]);
    }
    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then((response) => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
  }, []);
  return (
    <footer className={cx(styles.footer, classNameWrapper)}>
      <hr className={styles.line} />
      <div className={styles.container}>
        {(isDesktopScreen && (
          <>
            <div className={styles.itemOne}>
              <nav>
                <h6 className={styles.menuTitle}>
                  {parseText(cookies, 'Покупателям', 'Покупцям')}
                </h6>
                <MenuItem cookie={cookies} arrItems={itemsCustomers} />
              </nav>
              <nav className={styles.childNav}>
                <h6
                  className={`${styles.menuTitle} ${styles.menuTitleLastTitle}`}
                >
                  {parseText(
                    cookies,
                    'Оптовым покупателям',
                    'Оптовим покупцям',
                  )}
                </h6>
                <MenuItem cookie={cookies} arrItems={itemsWholesaleCustomers} />
              </nav>
            </div>
            <nav className={styles.itemTwo}>
              <h6 className={styles.menuTitle}>
                {parseText(cookies, 'О нас', 'Про нас')}
              </h6>
              <MenuItem cookie={cookies} arrItems={itemsAbout} />
            </nav>
            <nav className={styles.itemThree}>
              <h6 className={styles.menuTitle}>
                {parseText(cookies, 'Категории', 'Категорії')}
              </h6>
              <MenuItem
                cookie={cookies}
                isCategoriesItem
                arrItems={categories}
              />
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setFiltersInCookies(cookies, { sort_date: 'desc' });
                  router.push(
                    '/Products',
                    `/Products/${createCleanUrl(cookies).join('/')}`,
                  );
                  window.scrollTo(0, 0);
                }}
                className={styles.menuLink}
              >
                {parseText(cookies, 'Смотреть все', 'Дивитися все')}
              </a>
            </nav>
          </>
        )) || (
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
                title="Категории"
                titleUk="Категорії"
                isFooterNav
                isNotActiveScroll
              >
                <MenuItem
                  isCategoriesItem
                  cookie={cookies}
                  arrItems={categories}
                />
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
          )}
        <form className={styles.form}>
          <div className={styles.formChildrenWrapper}>
            <h5 className={styles.titleStocks}>
              {parseText(
                cookies,
                'Хотите получать чаще акционные предложения?',
                'Хочете отримувати частіше акційні пропозиції?',
              )}
            </h5>
            <div className={styles.controlsWrapper}>
              <Input
                addInputProps={{
                  value,
                  onChange: e => setValue(e.target.value),
                }}
                placeholder="Ваш E-mail"
                placeholderUa="Ваш E-mail"
                type="email"
                classNameWrapper={cx(styles.inputWrapper, {
                  [styles.inputWrapperError]:
                    !!emailValidation(value) && value.length > 0,
                })}
                viewType="footerInput"
              />
              {(isSuccessMailing && (
                <p className={styles.errorParagraph}>
                  {parseText(
                    cookies,
                    'Вы подписаны успешно',
                    'Ви підписані успішно',
                  )}
                </p>
              ))
                || (error.length > 0 && (
                  <p className={styles.errorInputText}>{error}</p>
                ))
                || (!!emailValidation(value) && value.length > 0 && (
                  <p className={styles.errorInputText}>
                    {emailValidation(value)}
                  </p>
                ))}
              <div className={styles.buttonWrapper}>
                <Button
                  buttonType="button"
                  title="Подписаться"
                  titleUa="Підписатися"
                  viewType={!emailValidation(value) ? 'red' : 'footerButton'}
                  classNameWrapper={styles.footerButton}
                  disabled={!!emailValidation(value)}
                  onClick={() => {
                    sendMailing({}, { email: value }).then((response) => {
                      if (response.status) {
                        setIsSuccessMailing(true);
                        setValue('');
                      } else {
                        setError(
                          parseText(
                            cookies,
                            'не удалось оформить подписку, видимо пользователь с таким email уже подписался',
                            'Не вдалося оформити підписку, мабуть користувач з таким email вже підписався',
                          ),
                        );
                      }
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.formIcons}>
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
          <div className={styles.footerLinks}>
            <div className={styles.langSelect}>
              <button
                className={styles.langButton}
                onClick={() => setIsOpenLangSelect(!isOpenLangSelect)}
                type="button"
              >
                {(cookies.get('language') && cookies.get('language').title)
                  || 'Русский'}
              </button>
              {isOpenLangSelect && (
                <ul className={styles.langList}>
                  {arrOptionsLang.map(item => (
                    <li key={item.id} className={styles.langItem}>
                      <button
                        className={styles.langItemButton}
                        type="button"
                        onClick={() => {
                          cookies.set('language', item);
                          router.reload();
                          window.scrollTo(0, 0);
                        }}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href="/info/term-of-use" prefetch={false}>
              <a className={styles.formLink}>
                {parseText(
                  cookies,
                  'Пользовательское соглашение',
                  'Угода користувача',
                )}
              </a>
            </Link>
          </div>
        </form>
      </div>
    </footer >
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
};

Footer.propTypes = {
  classNameWrapper: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Footer);
