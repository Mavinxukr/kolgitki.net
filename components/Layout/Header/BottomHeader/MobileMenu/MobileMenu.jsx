import React, { useEffect, useState } from 'react';
import styles from './MobileMenu.scss';
import Accordion from '../../../../Accordion/Accordion';
import Link from 'next/link';
import IconFacebook from '../../../../../public/svg/Path109.svg';
import IconInstagram from '../../../../../public/svg/instagram.svg';
import IconTwitter from '../../../../../public/svg/Path162.svg';
import cx from 'classnames';

import {
  itemsAbout,
  itemsCustomers,
  itemsWholesaleCustomers
} from '../../../../../utils/fakeFetch/footerMenu';
import IconPhone from '../../../../../public/svg/call-answer.svg';

import { cookies } from '../../../../../utils/getCookies';
import { parseText } from '../../../../../utils/helpers';
import { BurgerButton } from '../../BurgerButton/BurgerButton';
import Search from '../../../../Search/Search';

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
  const [classesMenu, setClassesMenu] = useState([styles.mobileMenu]);
  const [classesBackdrop, setClassesBackdrop] = useState([styles.backdrop]);

  const closeHandle = ev => {
    setOpening(false);
  };

  useEffect(() => {
    if (isOpen) {
      setClassesMenu(prev => [...prev, styles.open]);
      setClassesBackdrop(prev => [...prev, styles.open]);
    } else {
      setClassesMenu(prev => prev.filter(item => item !== styles.open));
      setClassesBackdrop(prev => prev.filter(item => item !== styles.open));
    }
  }, [isOpen]);
  return (
    <>
      <div className={classesMenu.join(' ')}>
        <div className={styles.mobileMenu_wrapper}>
          <div className={styles.mobileMenu_header}>
            <Search></Search>
            <BurgerButton isOpen={isOpen} setOpening={closeHandle} />
          </div>
          <nav className={styles.mobileMenu_nav}>
            <ul className={styles.mobileMenu_list}>
              {categories &&
                categories.map(item => {
                  return (
                    <li key={item.id} className={styles.mobileMenu_item}>
                      {/* <Link href={`/products/${item.slug}`}> */}
                      <a href={`/products/${item.slug}`}>
                        {parseText(cookies, item.name, item.name_ua)}
                      </a>
                      {/* </Link> */}
                    </li>
                  );
                })}
              {arrAddCategories &&
                arrAddCategories.map(item => (
                  <li key={item.id} className={styles.mobileMenu_item}>
                    <Link prefetch={false} href={`/${item.slug}`}>
                      <a
                        className={cx({
                          [styles.pink]: item.name === 'Sale'
                        })}
                      >
                        {item.name}
                      </a>
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
      <div
        onClick={ev => {
          console.log(ev.target, 'backdrop');
          setOpening(false);
        }}
        className={classesBackdrop.join(' ')}
      ></div>
    </>
  );
};
