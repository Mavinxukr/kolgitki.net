import React, { useState, useEffect } from 'react';
import styles from './MenuItem.scss';
import { SubMenu } from '../SubMenu/SubMenu';
import { parseText } from '../../../../../utils/helpers';
import { cookies } from '../../../../../utils/getCookies';
import Link from 'next/link';

export const MenuItem = ({ menuItem }) => {
  const [imageLink, setImageLink] = useState(null);
  const [visible, setVisible] = useState(false);
  const [contentSubMenu, setContentSubMenu] = useState([]);
  const [classes, setClasses] = useState([styles.item_link]);
  return (
    <li
      className={styles.item}
      onMouseEnter={ev => {
        setVisible(true);
        setImageLink(menuItem.image_link);
        if (
          ev.target.innerText ===
          parseText(cookies, menuItem.name, menuItem.name_ua)
        ) {
          setClasses(prev => [...prev, styles.active]);
        }
      }}
      onMouseLeave={() => {
        setVisible(false);
        setImageLink(null);
        setClasses(prev => prev.filter(item => item !== styles.active));
      }}
    >
      {/* <Link href={`/products/${menuItem.slug}`}> */}
      <a
        href={`/products/${menuItem.slug}`}
        className={classes.join(' ')}
        onMouseEnter={ev => {
          if (
            ev.target.innerText ===
            parseText(cookies, menuItem.name, menuItem.name_ua)
          ) {
            setContentSubMenu(menuItem.subcategory);
          }
        }}
      >
        {parseText(cookies, menuItem.name, menuItem.name_ua)}
      </a>
      {/* </Link> */}
      {visible && (
        <SubMenu
          imageLink={imageLink}
          parentSlug={menuItem.slug}
          setImageLink={setImageLink}
          setVisible={setVisible}
          content={contentSubMenu}
        ></SubMenu>
      )}
    </li>
  );
};
