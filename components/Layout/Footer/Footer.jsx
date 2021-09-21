import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconInstagram from '../../../public/svg/instagram.svg';
import IconFacebook from '../../../public/svg/Path109.svg';
import IconTwitter from '../../../public/svg/Path162.svg';
import { getAllCategories } from '../../../services/home';
import Accordion from '../../Accordion/Accordion';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import {
  itemsAbout,
  itemsCustomers
} from '../../../utils/fakeFetch/footerMenu';
import styles from './Footer.scss';
import { Subscribe } from '../../Subscribe/Subscribe';

const arrOptionsLang = [
  { id: 1, lang: 'ru', title: 'Русский' },
  { id: 2, lang: 'ua', title: 'Українська' }
];

const Footer = () => {
  const [categories, setCategories] = useState(null);
  const [isOpenLangSelect, setIsOpenLangSelect] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!cookies.get('language')) {
      cookies.set('language', arrOptionsLang[0]);
    }
    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <hr className={styles.line} />
        <div className={styles.content}>
          <nav className={styles.navigationBlock}>
            <div className={styles.forBuyers}>
              <h5 className={styles.forBuyers_title}>
                {parseText(cookies, 'Покупателям', 'Покупцям')}
              </h5>
              <ul className={styles.forBuyers_list}>
                {itemsCustomers.map((item, index) => {
                  return (
                    <li
                      className={styles.forBuyers_item}
                      key={`buyers-${index}`}
                    >
                      <a className={styles.forBuyers_link} href={item.href}>
                        {parseText(cookies, item.name, item.name_ua)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.about}>
              <h5 className={styles.about_title}>
                {parseText(cookies, 'О нас', 'Про нас')}
              </h5>
              <ul className={styles.about_list}>
                {itemsAbout.map((item, index) => {
                  return (
                    <li className={styles.about_item} key={`about-${index}`}>
                      <a className={styles.about_link} href={item.href}>
                        {parseText(cookies, item.name, item.name_ua)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.categories}>
              <h5 className={styles.categories_title}>
                {parseText(cookies, 'Категории', 'Категорії')}
              </h5>
              <ul className={styles.categories_list}>
                <li className={styles.categories_item}>
                  <a className={styles.categories_link} href={`/brands`}>
                    {parseText(cookies, 'Бренды', 'Бренди')}
                  </a>
                </li>
                <li className={styles.categories_item}>
                  <a className={styles.categories_link} href={`/gift-backets`}>
                    {parseText(
                      cookies,
                      'Подарочные наборы',
                      'Подарункові набори'
                    )}
                  </a>
                </li>

                {categories &&
                  categories.map((item, index) => {
                    return (
                      <li
                        className={styles.categories_item}
                        key={`categories-${index}`}
                      >
                        <a
                          className={styles.categories_link}
                          href={`/products/${item.crumbs}`}
                        >
                          {parseText(cookies, item.name, item.name_ua)}
                        </a>
                      </li>
                    );
                  })}

                <li className={styles.categories_item}>
                  <a className={styles.categories_link} href={`/products/`}>
                    {parseText(cookies, 'Смотреть все', 'Дивитися все')}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className={styles.subscribeBlock}>
            <Subscribe></Subscribe>
            <div className={styles.social}>
              <ul className={styles.social_list}>
                <li className={styles.social_item}>
                  <a
                    className={styles.social_link}
                    href="https:facebook.com/kolgot.net/"
                  >
                    <IconFacebook className={styles.iconFacebook} />
                  </a>
                </li>
                <li className={styles.social_item}>
                  <a
                    className={styles.social_link}
                    href="https:www.instagram.com/mavinxbids/"
                  >
                    <IconInstagram />
                  </a>
                </li>
                <li className={styles.social_item}>
                  <a className={styles.social_link} href="/">
                    <IconTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className={styles.accordion} uk-accordion="multiple: true">
          <Accordion
            title="Покупателям"
            titleUk="Покупцям"
            isFooterNav
            isNotActiveScroll
          >
            <ul className={styles.menuItems}>
              {itemsCustomers.map((item, index) => {
                return (
                  <li className={styles.menuItem} key={`buyers-${index}`}>
                    {/* <Link href={item.href}> */}
                    <a className={styles.menuText} href={item.href}>
                      {parseText(cookies, item.name, item.name_ua)}
                    </a>
                    {/* </Link> */}
                  </li>
                );
              })}
            </ul>
          </Accordion>
          <Accordion
            title="О нас"
            titleUk="Про нас"
            isFooterNav
            isNotActiveScroll
          >
            <ul className={styles.menuItems}>
              {itemsAbout.map((item, index) => (
                <li className={styles.menuItem} key={`about-${index}`}>
                  {/* <Link href={item.href}> */}
                  <a className={styles.menuText} href={item.href}>
                    {parseText(cookies, item.name, item.name_ua)}
                  </a>
                  {/* </Link> */}
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion
            title="Категории"
            titleUk="Категорії"
            isFooterNav
            isNotActiveScroll
          >
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>
                {/* <Link href={`/brands`}> */}
                <a className={styles.menuText} href={`/brands`}>
                  {parseText(cookies, 'Бренды', 'Бренди')}
                </a>
                {/* </Link> */}
              </li>
              <li className={styles.menuItem}>
                {/* <Link href={`/gift-backets`}> */}
                <a className={styles.menuText} href={`/gift-backets`}>
                  {parseText(
                    cookies,
                    'Подарочные наборы',
                    'Подарункові набори'
                  )}
                </a>
                {/* </Link> */}
              </li>

              {categories &&
                categories.map(item => (
                  <li className={styles.menuItem} key={`categories-${item.id}`}>
                    {/* <Link href={`/products/${item.crumbs}`}> */}
                    <a
                      className={styles.menuText}
                      href={`/products/${item.crumbs}`}
                    >
                      {parseText(cookies, item.name, item.name_ua)}
                    </a>
                    {/* </Link> */}
                  </li>
                ))}
              <li className={styles.menuItem}>
                {/* <Link href="/products"> */}
                <a className={styles.menuText} href="/products">
                  {parseText(cookies, 'Смотреть все', 'Дивитися все')}
                </a>
                {/* </Link> */}
              </li>
            </ul>
          </Accordion>
          <Accordion
            title="Оптовым покупателям"
            titleUk="Оптовим покупцям"
            isFooterNav
            isNotActiveScroll
          >
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>
                <Link prefetch={false} href={'/opt'}>
                  <a className={styles.menuText}>
                    {parseText(
                      cookies,
                      'Общая информация',
                      'Загальна інформація'
                    )}
                  </a>
                </Link>
              </li>
            </ul>
          </Accordion>
        </ul>
        <div className={styles.helper}>
          <div className={styles.forOpt}>
            <h5 className={styles.forOpt_title}>
              {parseText(cookies, 'Оптовым покупателям', 'Оптовим покупцям')}
            </h5>
            <ul className={styles.forOpt_list}>
              <li className={styles.forOpt_item}>
                <Link prefetch={false} href={'/opt'}>
                  <a className={styles.forOpt_link}>
                    {parseText(
                      cookies,
                      'Общая информация',
                      'Загальна інформація'
                    )}
                  </a>
                </Link>
              </li>
              {/* <li className={styles.forOpt_item}>
                <a className={styles.forOpt_link} href={'/'}>
                  {parseText(cookies, 'Скачать .pdf', 'Завантажити .pdf')}
                </a>
              </li> */}
            </ul>
          </div>

          <div className={styles.languageBlock}>
            <div className={styles.language}>
              <button
                className={styles.langButton}
                onClick={() => setIsOpenLangSelect(!isOpenLangSelect)}
                type="button"
              >
                {(cookies.get('language') && cookies.get('language').title) ||
                  'Русский'}
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
            <Link prefetch={false} href="/info/term-of-use" prefetch={false}>
              <a className={styles.formLink}>
                {parseText(
                  cookies,
                  'Пользовательское соглашение',
                  'Угода користувача'
                )}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
