import React, { useEffect, useState } from 'react';
import styles from './MobileMenu.scss';
import IconBurger from '../../../../../public/svg/ddd.svg';
import Accordion from '../../../../Accordion/Accordion';
import Link from 'next/link';
import IconFacebook from '../../../../../public/svg/Path109.svg';
import IconInstagram from '../../../../../public/svg/instagram.svg';
import IconTwitter from '../../../../../public/svg/Path162.svg';
import {
  itemsAbout,
  itemsCustomers,
  itemsWholesaleCustomers
} from '../../../../../utils/fakeFetch/footerMenu';
import IconExit from '../../../../../public/svg/Group795.svg';
import IconPhone from '../../../../../public/svg/call-answer.svg';

import { cookies } from '../../../../../utils/getCookies';
import { parseText } from '../../../../../utils/helpers';

const MenuItem = ({ arrItems, isCategoriesItem, cookie }) => (
  <ul className={styles.menuItems}>
    {arrItems &&
      arrItems.map((item, index) => (
        <React.Fragment key={index}>
          {isCategoriesItem && index === 0 && (
            <>
              <li>
                <Link href="/brands" passHref prefetch={false}>
                  <a className={styles.menuText}>
                    {parseText(cookie, 'Бренды', 'Бренди')}.headerWrapper
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gift-backets" passHref prefetch={false}>
                  <a className={styles.menuText}>
                    {parseText(
                      cookie,
                      'Подарочные наборы',
                      'Подарункові набори'
                    )}
                  </a>
                </Link>
              </li>
            </>
          )}
          <li key={item.id}>
            <Link
              href={(isCategoriesItem && '/products') || item.href}
              as={
                (isCategoriesItem &&
                  `/products/${createCleanUrl(cookie).join('/')}`) ||
                item.href
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
                            item.name_ua
                          )
                        }
                      ]
                    });
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

export const MobileMenu = ({
  categories,
  arrAddCategories,
  setOpening,
  isOpen
}) => {
  const [classes, setClasses] = useState([styles.mobileMenu]);

  useEffect(() => {
    isOpen
      ? setClasses(prev => [...prev, styles.open])
      : setClasses(prev => prev.filter(item => item !== styles.open));
  }, [isOpen]);
  return (
    <div className={classes.join(' ')}>
      <div className={styles.mobileMenu_wrapper}>
        <button
          className={styles.mobileMenu_burger}
          onClick={() => setOpening(!isOpen)}
        >
          {isOpen ? <IconExit className={styles.iconExit} /> : <IconBurger />}
        </button>
        <nav className={styles.mobileMenu_nav}>
          <ul className={styles.mobileMenu_list}>
            {categories &&
              categories.map(item => (
                <li key={item.id} className={styles.mobileMenu_item}>
                  <Link href={`/products/${item.slug}`}>
                    <a className={styles.MobileMenu_link}>
                      {parseText(cookies, item.name, item.name_ua)}
                    </a>
                  </Link>
                </li>
              ))}
            {arrAddCategories &&
              arrAddCategories.map(item => (
                <li key={item.id} className={styles.mobileMenu_item}>
                  <Link href={`/${item.slug}`}>
                    <a className={styles.MobileMenu_link}>{item.name}</a>
                  </Link>
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
          <div className={styles.mobileMenu_phone}>
            <IconPhone />
            <a href="tel:+38044495523395">(044) 495 523 395</a>
          </div>
          <div className={styles.mobileMenu_social}>
            <a
              className={styles.mobileMenu_icon}
              href="https://facebook.com/kolgot.net/"
            >
              <IconFacebook />
            </a>
            <a
              className={styles.mobileMenu_icon}
              href="https://www.instagram.com/mavinxbids/"
            >
              <IconInstagram />
            </a>
            <a className={styles.mobileMenu_icon} href="/">
              <IconTwitter />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};
