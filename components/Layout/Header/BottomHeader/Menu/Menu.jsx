import React, { useState, useEffect } from 'react';
import styles from './Menu.scss';
import { parseText } from '../../../../../utils/helpers';
import { cookies } from '../../../../../utils/getCookies';
import { MenuItem } from '../MenuItem/MenuItem';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { getAllCategories } from '../../../../../services/home';
import Link from 'next/link';

const arrAddCategories = [
  {
    id: 500,
    name: parseText(cookies, 'Новинки', 'Новинки'),
    slug: 'products'
  },
  {
    id: 501,
    name: 'Sale',
    slug: 'stock'
  },
  {
    id: 502,
    name: parseText(cookies, 'Подарочные наборы', 'Подарункові набори'),
    slug: 'gift-backets'
  },
  {
    id: 503,
    name: parseText(cookies, 'Новости', 'Новини'),
    slug: 'blog'
  }
];

export const Menu = ({ isOpenMenu, setIsOpenMenu }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
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
    <nav className={styles.menu}>
      <MobileMenu
        arrAddCategories={arrAddCategories}
        categories={categories}
        setOpening={setIsOpenMenu}
        isOpen={isOpenMenu}
      ></MobileMenu>
      <ul className={styles.menu_list}>
        {categories &&
          categories.map(item => <MenuItem key={item.id} menuItem={item} />)}
        {arrAddCategories.map(item => {
          let linkClasses = [styles.menu_link];
          if (item.name === 'Sale') {
            linkClasses.push(styles.red);
          }
          return (
            <li key={item.id} className={styles.menu_item}>
              <Link href={`/${item.slug}`}>
                <a className={linkClasses.join(' ')}>{item.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
